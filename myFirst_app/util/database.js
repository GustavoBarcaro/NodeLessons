// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const uri =
//   "mongodb+srv://Gustavo-barcaro:gs45942252@mycluster.ebvty.gcp.mongodb.net/MyNodeLessons?retryWrites=true&w=majority";

// let _db;

// const mongoConnect = (callback) => {
//   MongoClient.connect(uri, { useUnifiedTopology: true })
//   .then((response) => {
//     console.log('Connected!');
//     _db = response.db();  
//     callback();
//   })
//   .catch((error) => {
//     console.log(error);
//     throw err;
//   });
// }

// const getDb = () => {
//   if(_db) {
//     return _db;
//   }
//   throw "No database found!";
// }


// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;