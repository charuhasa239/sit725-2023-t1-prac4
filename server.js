var express = require("express")
var app = express()
const { MongoClient } = require("mongodb")
const url = "mongodb+srv://charuhasa:charuhasa@cluster0.boyqsqe.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
let dbCollection;
app.use(express.static(__dirname + '/projets'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/api/Rabbits', (req, res) => {
    getAllrabbits((err, result) => {
        if (err) {
            res.json({ statusCode: 400, message: "error" });
        } else {
            res.json({ statusCode: 200, data: cardList, message: "Success" });
        }


    });
});
function dbConnection(collectionName) {
    client.connect((err) => {
        dbCollection = client.db().collection(collectionName);
        if (!err) {
            console.log("DB Connected");
            console.log(dbCollection);
        } else {
            console.error(err);
        }
    });
}
app.post('/api/Rabbits', (req, res) => {
    let rabbit = req.body;
    insert(rabbit, (err, result) => {
        if (err) {
            res.json({ satusCode: 400, message: err });
        } else {
            res.json({
                satusCode: 200,
                data: result,
                message: "success",

            });
        }
    });

});
function insert(rabbit, callback) {
    dbCollection.insertOne(cat, callback);
}
function getAllRabbits(callback) {
    dbCollection.find().toArray(callback);
}
var port = process.env.port || 3000;

app.listen(port, () => {

    console.log("App listening to: " + port);
    dbConnection("rabbits");
});