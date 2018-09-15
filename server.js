var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

var connection = require("./connection.js");
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.engine("handlebars" , exphbs({defaultLayout: "main"}));
app.set("view engine" , "handlebars");

app.get("/" , function(req , res){
    connection.query("SELECT * FROM venues" , function(error, results){
        if(error){
            return res.status(500).end();
        }
        console.log(results);
        res.render("home" , {venueList:results});
    });
});

app.post("/api/venues" , function(req , res){
    connection.query("INSERT INTO venues SET ?" , [req.body] , function(error , results){
        if(error){
            return res.status(500).end();
        }
        res.json({id: results.insertId});
        console.log({id: results.insertId});
    });
});

app.put("/api/venues/:id" , function(req , res){
    connection.query("UPDATE venues SET visited = ? WHERE id = ?" , [true , req.params.id] , function(error , results){
        if(error){
            return res.status(500).end();
        }
        else if (results.changedRows === 0){
            return res.status(404).end();
        }
        res.status(200).end();
    });
});


app.listen(PORT , function(){
    console.log("Listening for requests on http://localhost:" + PORT);
});

