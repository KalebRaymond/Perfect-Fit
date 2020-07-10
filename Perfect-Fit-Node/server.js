const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = require('dotenv').config();

const con = mysql.createConnection({
	  host: 'localhost',
	  user: 'root',
	  password: process.env.DB_PW,
	  database: 'perfectfitdb'
});

con.connect(function(err) 
{
	if (err)
	{
	  throw err;
	}
});

//Returns a Promise that contains the result of a mySql query.
//Right now it doesn't support parameters...
//Also, I only use it once in one case to await a query... must be a better solution
function mySQLquery(str)
{
	//Potential for buffer overflow? lol
	return new Promise((resolve, reject) => {
		con.query(str, function (err, result, fields) {
			if (err) 
			{
				console.log(err);
				return reject(err);
			}
			
			return resolve(result);
		});
	});
}

function getMatchingArticles(article1, article2)
{
	return new Promise((resolve, reject) => {
		var sql = 'SELECT * FROM myclothesCopy WHERE type = "PANTS"';
		con.query(sql, function (err, result, fields) {
			if (err) 
			{
				console.log(err);
				return reject(err);
			}
			
			return resolve(result);
		});
	});
}

//Returns an array of arrays of clothing objects that match with selectedArticle
async function getOutfits(amount, selectedArticle)
{
	if(amount <= 0)
	{
		return [];
	}
	
	var outfits = [];
	
	//Create copy of myclothes (can't use a temp table because getRandomArticle uses a query that accesses a table twice)
	var sql = 'CREATE TABLE IF NOT EXISTS myclothesCopy AS SELECT * FROM myclothes';
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		console.log('- Temporary table exists');
	});
	
	sql = 'SELECT * FROM myclothesCopy WHERE type = "SHIRT"';
	//var type = (selectedArticle.type = 'JACKET') ? 'SHIRT' : 'JACKET';
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		console.log('$', result);
	});
	
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
	
	//Retrieve shirts from myclothesCopy
	sql = 'SELECT * FROM myclothesCopy WHERE type = "SHIRT"';
	var shirts = await mySQLquery(sql).then((result) => {return result;}).catch((error) => {return {}; });
	
	for(var s in shirts)
	{
		if(true /*jacket matches with shirt*/)
		{
			var matchingArticles = await getMatchingArticles(selectedArticle, shirts[s]).then((result) => {return result;}).catch((error) => {return {}; });;
			
			for(var p in matchingArticles)
			{
				outfits.push([shirts[s], matchingArticles[p]]);
				if(outfits.length == amount)
				{
					//Delete myclothesCopy 
					sql = 'DROP TABLE myclothesCopy';
					con.query(sql, function (err, result, fields) {
						if (err) throw err;
						console.log('Temporary table dropped');
					});
					
					console.log('~ ' + outfits);
					
					return outfits;
				}
			}
		}
	}
	
	//Delete myclothesCopy 
	sql = 'DROP TABLE myclothesCopy';
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		console.log('Temporary table dropped');
	});
}
	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function ()
{
	console.log('Example app listening on port 3000!');
	
	var sql = 'CREATE TABLE IF NOT EXISTS myclothes (id int AUTO_INCREMENT, article VARCHAR(255), color VARCHAR(255), material VARCHAR(255), type VARCHAR(255), PRIMARY KEY (id))';
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
	
	sql = 'INSERT INTO myclothes (article, color, material, type) VALUES (?, ?, ?, ?)';
	con.query(	sql, 	
				[ 	
					article,
					color,
					material,
					type
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
	var outfitsArray = await getOutfits(3, req.body);
	//console.log('~ ' + outfitsArray);
	
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