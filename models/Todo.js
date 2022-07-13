const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let todoSchema = new Schema ({
    user: {type: String},
    items: {type: Array}
});

module.exports = mongoose.model("todos", todoSchema);