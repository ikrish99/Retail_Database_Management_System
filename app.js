var http = require("http")
var e = require("express")
var app = e();
var dbConnection = require("mongodb").MongoClient;
var bodyParse = require("body-parser");

app.use(bodyParse.json());
app.use(e.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

//MongoDB connection
dbConnection.connect("mongodb://admin:YNBBUPEEQYYUCGSK@sl-us-south-1-portal.1.dblayer.com:15432,sl-us-south-1-portal.0.dblayer.com:15432/admin?ssl=true", function(error, db)
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

app.listen(process.env.PORT,function(){
		//console.log("Server is waiting on http://localhost:4400/");
});

