const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TodoSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createDate:{type:Date, required:true, default:Date.now},
  isComplete:{type:Boolean, required:true, default:false},
  completeDate:{type:Date},
  //Change the id from required to be default
  // id:{type:Number},
});

module.exports = mongoose.model("Todo", TodoSchema);
