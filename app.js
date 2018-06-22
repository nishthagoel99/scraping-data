var path=require('path');
var express=require('express')
var app=express();
var mysql=require('mysql');
var bodyparser=require('body-parser');
var http = require('http');
var ejs=require('ejs');
var fs=require('fs');

app.set('views',path.join(__dirname,'/views'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

var con=mysql.createConnection({
    host:'localhost',
    password:'',
    user:'root',
    database:'csv'
});
console.log('hello');

con.connect(function(err){
    if(err){
        console.log('error connecting database');
    }else
    console.log('Connected!');
});

app.get('/',function(req,res){
        console.log('connected1');      
        con.query('SELECT * FROM fakenamegenerator',function(error,rows,field){
        if(error){
        console.log("eror");
        }else{
        var data=JSON.stringify(rows);
           res.render(__dirname+'/views/index.html',{data:rows});
        }
});
});

app.listen(3000);

