const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = require('dotenv').config();
const fs = require('fs');

const con = mysql.createConnection({
	  host: 'localhost',
	  user: 'root',
	  password: process.env.DB_PW,
	  database: 'perfectfitdb'
});

const matchLib = 
{
	colorMap: {}
};

con.connect(function(err) 
{
	if (err)
	{
	  throw err;
	}
});

//Returns a Promise that contains the result of a mySql query.
//I only use it once in getOutfits to await a query... must be a better solution
function mySQLquery(str, params)
{
	//Potential for buffer overflow? lol
	return new Promise((resolve, reject) => {
		con.query(str, params, function (err, result, fields) {
			if (err) 
			{
				console.log(err);
				return reject(err);
			}
			
			console.log(result);
			return resolve(result);
		});
	});
}

function getMatchingArticles(article1, article2)
{
	return new Promise((resolve, reject) => {
		var sql = 	'SELECT * FROM myclothesCopy WHERE type = ? AND color IN ' + matchLib.colorMap[article1.color] + ' AND color IN ' + matchLib.colorMap[article2.color] 
					+ ' AND formality >= ? AND formality <= ?';
		var type = (article1.type == 'PANTS') ? 'SHIRT' : 'PANTS';
		var minFormality = Math.max(article1.formality, article2.formality) - 1;
		var maxFormality = Math.min(article1.formality, article2.formality) + 1;
		
		con.query(sql, [type, minFormality, maxFormality], function (err, result, fields) {
			if (err) 
			{
				console.log(err);
				return reject(err);
			}
			
			return resolve(result);
		});
	});
}

//Returns an array of arrays, each array containing a combination of clothing objects that create a matching outfit.
//All possible matching outfits will included in the 2D array.
async function getOutfits(selectedArticle)
{
	//Create copy of myclothes (can't use a temp table because getRandomArticle uses a query that accesses a table twice)
	var sql = 'CREATE TABLE IF NOT EXISTS myclothesCopy AS SELECT * FROM myclothes';
	await mySQLquery(sql, [type, colors]).then((result) => {return result;}).catch((error) => {return {}; });
	
	//Remove selectedArticle from myclothesCopy
	sql = 'DELETE FROM myclothesCopy WHERE article = ? AND color = ? AND material = ?';
	con.query(	sql, 
				[
					selectedArticle.article,
					selectedArticle.color,
					selectedArticle.material
				],
				function (err, result, fields) 
				{
					if (err) throw err;
					//console.log('Selected article ' + selectedArticle.article + ' deleted from myclothesCopy');
				}
	);
	
	/*	An outfit is made up of a jacket, shirt, and pants. The order that these are picked depend on the selectedArticle.
	*		Jacket 	-> Shirt 	-> Pants
	*		Shirt 	-> Jacket 	-> Pants
	*		Pants	-> Jacket 	-> Shirt
	*	In the second and third column above, only one row has a different value. The order can be determined at each step
	*	by checking the selectedArticle.
	*	Also, jackets are optional if the selectedArticle is not a jacket. This means when the selectedArticle is a shirt, 
	*	then the resulting DLB trie will consist of an array with jackets that must be paired with pants, and a concatenated
	* 	array of just pants:
	*
	*		[SHIRT] -> 	[JACKET][JACKET][JACKET][PANTS][PANTS]
	*					   v	   v	   v
	*					[PANTS]	[PANTS] [PANTS]
	*					[PANTS]	[PANTS]
	*							[PANTS]
	*/
	
	//Retrieve all possible matching second articles from myclothesCopy
	
	var type = (selectedArticle.type == 'JACKET') ? 'SHIRT' : 'JACKET';
	var colors = matchLib.colorMap[selectedArticle.color];
	var minFormality = selectedArticle.formality - 1;
	var maxFormality = selectedArticle.formality + 1;
	sql = 'SELECT * FROM myclothesCopy WHERE type = ? AND color IN ' + colors + ' AND formality >= ? AND formality <= ?';
	var secondLayer = await mySQLquery(sql, [type, minFormality, maxFormality]).then((result) => {return result;}).catch((error) => {return {}; });
	console.log(secondLayer);
	
	if(selectedArticle.type != 'JACKET')
	{
		//If selected article is not a jacket, need to add matching pants/shirt to secondLayer to create
		//outfits that are only shirt + pants pairs.
		var type = (selectedArticle.type == 'SHIRT') ? 'PANTS' : 'SHIRT';
		sql = 'SELECT * FROM myclothesCopy WHERE type = ? AND color IN ' + colors + ' AND formality >= ? AND formality <= ?';
		secondLayer = secondLayer.concat( await mySQLquery(sql, [type, minFormality, maxFormality]).then((result) => {return result;}).catch((error) => {return {}; }) );
	}
	
	var outfits = [];
	for(var n in secondLayer)
	{
		if(selectedArticle.type != 'JACKET' && secondLayer[n].type != 'JACKET')
		{
			//Shirt and pants pair without jacket
			outfits.push([secondLayer[n]]);
		}
		else
		{
			//Get array of articles that match with both selectedArticle and secondLayer[n]
			var matchingArticles = await getMatchingArticles(selectedArticle, secondLayer[n]).then((result) => {return result;}).catch((error) => {return {}; });;
			
			for(var m in matchingArticles)
			{
				outfits.push([secondLayer[n], matchingArticles[m]]);
			}
		}
	}
	
	//If the number of found matching outfits is less than the requested amount, the loop above will
	//terminate before outfits.length == amount.
	
	//Delete myclothesCopy 
	sql = 'DROP TABLE myclothesCopy';
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		console.log('- Temporary table dropped');
	});
	
	return outfits;
}
	
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function ()
{
	console.log('Perfect Fit server listening on port 3000');
	
	fs.readFile('./colorMatches.json', function(err, data) 
	{
		if(err)
		{
			console.log('Error opening file. Continuing without color map.');
		}
		else
		{
			console.log('colorMatches.json successfully opened.');
			matchLib.colorMap = JSON.parse(data); 
		}
	});
	
	var sql = 	'CREATE TABLE IF NOT EXISTS myclothes ' +
				'(article VARCHAR(255), color VARCHAR(255), material VARCHAR(255), type VARCHAR(255), formality int, CONSTRAINT UC_article UNIQUE (article, color, material))';
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		console.log('Table exists');
	});
})

app.use(function(req, res, next) 
{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.post('/api/addClothes', function (req, res) 
{
	console.log(req.body);
	
	var article = req.body.article.toUpperCase();
	var color = req.body.color.toUpperCase();
	var material = req.body.material.toUpperCase();
	var type = req.body.type.toUpperCase();
	var formality = req.body.formality;
	
	sql = 	'INSERT IGNORE INTO myclothes (article, color, material, type, formality) VALUES (?, ?, ?, ?, ?)';
	con.query(	sql, 	
				[ 	
					article,
					color,
					material,
					type,
					formality
				],						
				function (err, result, fields) 
				{
					if (err) throw err;
					console.log(req.body.article + ' added');
				});
	
	//res.send({'data': 'test'});
	return;
});

app.post('/api/removeClothes', function(req, res)
{
	console.log(req.body);
	
	var article = req.body.article.toUpperCase();
	var color = req.body.color.toUpperCase();
	var material = req.body.material.toUpperCase();
	
	var sql = "DELETE FROM myclothes WHERE article = ? AND color = ? AND material = ?";
	con.query(	sql, 	
				[ 	
					article,
					color,
					material
				],						
				function (err, result, fields) 
				{
					if (err) throw err;
					console.log(req.body.article + ' deleted');
				});
	
	return;
});

app.post('/api/getOutfits', async function(req, res)
{
	var outfitsArray = await getOutfits(req.body);

	res.send(outfitsArray);
	return;
});

app.get('/api/getClothes', function(req, res)
{
	var sql = "SELECT * FROM myclothes";
	
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		res.send(result);
	});
	
	return;
});