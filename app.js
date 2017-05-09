var http = require("http")
var e = require("express")
var app = e();
var dbConnection = require("mongodb").MongoClient;
var bodyParse = require("body-parser");

app.use(bodyParse.json());
app.use(e.static(__dirname+""));
//MongoDB connection
dbConnection.connect("mongodb://localhost:27017/retailDB", function(error, db)
{
	if(!error) 
	{
		console.log("We are connected");
		
		app.get("/list",function start(req, res){
			db.collection("itemList").find({}).toArray(function(err, data){
			if(!err)
			{
				res.json(data);
			}
			else
			{
				console.log(err);
			}
			})
		});
		
		app.put("/list/:name/:value",function(req, res){
			var v = req.params.value;
			var n = req.params.name;
			
			db.collection("itemList").updateOne({"name":n},{$set: {"quantity":v}},function(err, data){
				if(err)
				{
					console.log(err);
				}
		});
		});
		
		app.post("/list/:name/:value",function(req,res){
			var n = req.params.name;
			var v = req.params.value;
			var doc = {"name":n,"quantity":v};
			
			db.collection("itemList").insert(doc,function(err,data){
				if(err)
				{
					console.log(err);
				}
			})
			
		});
		
		app.post("/list/:name",function(req,res){
			var n = req.params.name;
			
			db.collection("itemList").deleteOne({"name":n},function(err,data){
				if(err)
				{
					console.log(err);
				}
			});
		});
	}
	else
	{
		console.log(error);
	}
})

app.listen(4400,function(){
		console.log("Server is waiting on http://localhost:4400/");
});

