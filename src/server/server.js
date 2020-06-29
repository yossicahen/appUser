const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const ObjectId = require('mongodb').ObjectId;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors())

app.get('/', function (req, res) {
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let params = JSON.parse(req.query.params);
    console.log(page,limit,params);
    
    MongoClient.connect(url, function (err, db) {
        if (err) 
             throw err;
        const dbo = db.db("admin");
        
        dbo.collection("users").find({[params.searchBy]:new RegExp(params.name, 'i')}).skip(page).limit(limit).sort( {[params.searchBy] : params.order }).toArray(function (err, result) {
            if (err) 
              throw err;
            res.send(result)
            db.close();
        });
    });
});

app.post('/insert', function (req, res) {    
    let jsonobj = req.body.userData;
    MongoClient.connect(url, function (err, db) {
        if (err) 
          throw err;
        const dbo = db.db("admin");
        dbo.collection("users").insertOne(jsonobj, function (err, resp) {
            res.send(resp.ops[0]._id)
            if (err)  
              throw err;
            db.close();
            });
    });
});

app.post('/login', function (req, res) {    
    let userName = req.body.userName;
    let userPassword = req.body.password;
    MongoClient.connect(url, function (err, db) {
        if (err) 
          throw err
        const dbo = db.db("admin");
        dbo.collection("users").findOne({"userName":userName}, function (err, result) {
            if (result && result.password === userPassword){
                    const token = jwt.sign(
                        { userId: result._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' });
                    res.send({
                        userId: result._id,
                        token: token,
                        role: result.role
                     });          
            } else
                res.send(401, 'unauthorization');   
            db.close();
            });
    });
});
app.listen(8081);
//   dbo
//         .collection("users")
//         .insert( [{
//             name: 'zron',
//             userName: "bron@gmail.com",
//             lastName: 'levi',
//             password: '13pw9',
//             role:'manager'
//         }, {
//             name: 'gron',
//             userName: "aron@gmail.com",
//             lastName: 'levi',
//             password: '13pw9',
//             role:'manager'
//         },  {
//             name: 'eron',
//             userName: "uron@gmail.com",
//             lastName: 'levi',
//             password: '13pw9',
//             role:'manager'
//         },  {
//             name: 'aron',
//             userName: "yron@gmail.com",
//             lastName: 'levi',
//             password: '13pw9',
//             role:'manager'
//         },  {
//             name: 'lron',
//             userName: "zron@gmail.com",
//             lastName: 'levi',
//             password: '13pw9',
//             role:'manager'
//         }], function (err, res) {
//             if (err) 
        //        throw err;
//             db.close();
//         });