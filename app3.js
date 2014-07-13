// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
//Create a collection test
console.log("Creating a collection test");
var collection = db.collection('test');

//Create documents to insert
var doc1 = {'hello':'doc1'};
var doc2 = {'hello':'doc2'};
var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];

//Insert the docs
console.log("Inserting the docs");
collection.insert(doc1,function(err,result){});
collection.insert(doc2, {w:1}, function(err, result) {});


//Updating
var doc3 = {key:1,value:1};
collection.insert(doc3,{w:1},function(err,result) {
  if(err) {
    console.log('Could not insert');
  }
  collection.update({key:1},{$set:{value:2}},{w:1},function(err,result) {});
});

var mycallback = function(err,results) {
     console.log("mycallback");
     if(err) throw err;
}
//Deleting documents
console.log("The delete operation");
var doc4=[{key1:1},{key2:2},{key3:3}];
//Insert the document and then remove
collection.insert(doc4,{w:1},function(err,result) {
   collection.remove({key1:1},mycallback); 
   collection.remove({key4:4},{w:1},mycallback); 
  });



//Retrieve documents
var stream = collection.find({mykey:{$ne:2}}).stream();
console.log("Printing values...");
stream.on("data", function(item) {
console.log(item);
});

stream.on("end", function() {});

//Remove all items.Cleanup
//collection.remove(mycallback);
});
