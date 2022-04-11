
var socket = require('socket.io');
var express = require('express');
const { translate } = require('free-translate');

const { MongoClient } = require('mongodb');
const bodyParser = require("body-parser");
const _ = require("underscore");
const req = require('express/lib/request');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let clients = [];


const uri = "mongodb+srv://cigi:cigi@cluster0.kkhnl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    console.log("yes,did it");

    client.close();
});




//App setup
var server = app.listen(5000, function () {
    (async () => {
        const translatedText = await translate('Faded', { from: 'en', to: 'bg' });
      
        console.log(translatedText); // Hello World
      })();
    console.log('listening to requests on port 5000');
});


app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function (socket) {
    console.log('we made it bro , we Have Socket.io connection');
    socket.on("matching", function (data) {
        const info = { socketId: socket.id, name: data.name, id: data.id };
        console.log(info);
        clients.push(info);

        console.log(clients.length);
        //io.sockets.emit('matching',data);
        //io.to('/#'+ clients[0].socketId).emit('matching' , data);
        //io.to('/#' + socketId).emit('myevent', {foo: 'bar'});
        //io.sockets.sockets[clients[0].socketId].emit("matching", { message: clients[0].data });
        if (clients.length === 2) {
            let roomId = Number(Date.now());
            const gameInfo = {
                player1: clients[0],
                player2: clients[1],
                roomId: roomId,
            };
            io.sockets.sockets[clients[0].socketId].emit("matching", gameInfo);
            io.sockets.sockets[clients[1].socketId].emit("matching", gameInfo);
            clients.splice(0, 2);
        } else {
            io.sockets.sockets[clients[0].socketId].emit("matching", 'Wait');
        }
    });
    socket.on("chat", function (data) {
        console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on("joinRoom", async function (data) {
        socket.join(data.roomId);
        socket.on("gameMessage", async function (message) {
            switch (message.action_type) {
                case "MESSAGE":
                    io.in(message.roomId).emit("gameMessage", message);
                    break;
            }
        });
    });


    socket.on("typing", function (data) {
        console.log(data);
        socket.broadcast.emit('typing', data);
    });
});

app.get('/tut/', function (req, res) {
    res.send('TUTTUN MU ?');
});

/*app.post('/tuttum/', function (req, res) {
    const data = _.pick(req.body, "email", "name", "surname");


    MongoClient.connect(uri, (err, client) => {
        if (err) throw err;

        const db = client.db('CigiFirst');

        let query = { email: data.email };
        db.collection('users').findOne(query).then(result => {
            console.log(result);
            if (result != null) {
                res.send('Email zaten kayıtlı.');
                client.close();
                return;
            }
            else {
                const myData = {
                    email: data.email,
                    name: data.name,
                    surname: data.surname
                };
                addUser(myData);
                res.send('OK');
            }
        });
    });

    console.log(req.body);
});

function addUser(dat) {
    MongoClient.connect(uri, (err, client) => {
        if (err) throw err;
        const db = client.db('CigiFirst');
        db.collection('users').insertOne(dat, (err, result) => {
            if (err) throw err;
            console.log('addUser: ' + dat);
        });
    });
}

app.post("/login/", function (req, res) {
    consolelog(req);
    let data = _.pick(req.body, "email", "password");

    MongoClient.connect(uri, (err, client) => {
        if (err) throw err;
        const db = client.db('Cluster0');
        let query = { email: data.email, password: data.password };

        db.collection('users').findOne(query).then(result => {
            console.log(result);
            if (result != null) {
                res.send(result);
                return;
            }
            else{
                res.send('Kullanıcı bulunamadı.');
            }
        });
    });
});*/