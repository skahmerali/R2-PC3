var mongoose = require("mongoose");

let dbURI = "mongodb+srv://ahmerali:ahmerali@cluster0.slkv6.mongodb.net/ahmerali";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});


var userSchema = new mongoose.Schema({
    "name": String,
    "email": String,
    "password": String,
    "phone": String,
    "gender": String,
    "createdOn": { "type": Date, "default": Date.now },
    "activeSince": Date
});

var userModel = mongoose.model("users", userSchema);


module.exports = {
    userModel: userModel,
}