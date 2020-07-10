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

//Returns a clothing object.
function getRandomArticle()
{
	//Get random row from myclothesCopy
	/// NEED TO HANDLE ERROR IF myclothesCopy DOES NOT EXIST
	sql = 	'SELECT * FROM myclothesCopy AS r1'
			+ ' JOIN(SELECT CEIL(RAND() *(SELECT MAX(id) FROM myclothesCopy)) AS id) AS r2'
			+ ' WHERE r1.id >= r2.id ORDER BY r1.id ASC LIMIT 1';
			
	return new Promise((resolve, reject) => {
		var clothingRow = {};
		con.query(sql, function (err, result, fields) {
			if (err) 
			{
				console.log(err);
				return reject(err);
			}
			
			console.log("	- random article get");
			
			var ssqqll = "SELECT * FROM myclothesCopy";
			con.query(ssqqll, function (err, result, fields) {
				if (err) throw err;
				console.log('> ', result);
			});
			
			
			clothingRow = {id: result[0].id, article: result[0].article, color: result[0].color, material: result[0].material};
			return resolve(clothingRow);
		});
	});
}

//Returns an array of clothing objects, guaranteed to not contain selectedArticle.
async function getRandomArticles(amount, selectedArticle)
{
	var clothingArr = [];
	
	//Create copy of myclothes (can't use a temp table because getRandomArticle uses a query that accesses a table twice)
	var sql = 'CREATE TABLE IF NOT EXISTS myclothesCopy AS SELECT * FROM myclothes';
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		console.log('- Temporary table exists');
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
	
	for(var i = 0; i < amount; ++i)
	{
		var clothingRow = await getRandomArticle().then((clothingRow) => { return clothingRow; }).catch((err) => { return {}; });
		
		//Since the id's in myclothes are auto-generated, they don't get copied over correctly to myclothesCopy.
		//May as well just use the article/color/material.
		var sql = 'DELETE FROM myclothesCopy WHERE article = ? AND color = ? AND material = ?';
		con.query(sql, [clothingRow.article, clothingRow.color, clothingRow.material], function (err, result, fields) {
			if (err) throw err;
			console.log('	- ', clothingRow.article, ' deleted from myclothesCopy');
		});
	
		clothingArr.push( {article: clothingRow.article, color: clothingRow.color, material: clothingRow.material} );
	}
	
	//Delete myclothesCopy
	sql = 'DROP TABLE myclothesCopy';
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		console.log('- Temporary table dropped');
	});
			
	return new Promise((resolve, reject) => {
		return resolve(clothingArr);
	});
}

//Returns an array of arrays of clothing objects that match with selectedArticle
async function getOutfits(selectedArticle)
{
	//Prepare for this to return a promise...
	return [
		await getRandomArticles(3, selectedArticle).then((clothingArr) => { return clothingArr; }).catch((err) => { return {}; }),
		await getRandomArticles(3, selectedArticle).then((clothingArr) => { return clothingArr; }).catch((err) => { return {}; }),
		await getRandomArticles(3, selectedArticle).then((clothingArr) => { return clothingArr; }).catch((err) => { return {}; })
	];
}
	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function ()
{
	console.log('Example app listening on port 3000!');
	
	var sql = 'CREATE TABLE IF NOT EXISTS myclothes (id int AUTO_INCREMENT, article VARCHAR(255), color VARCHAR(255), material VARCHAR(255), PRIMARY KEY (id))';
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
	
	sql = 'INSERT INTO myclothes (article, color, material) VALUES (?, ?, ?)';
	con.query(	sql, 	
				[ 	
					article,
					color,
					material
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