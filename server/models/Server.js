const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Server = new Schema({
  macA: String,
  cpuLoad: Number,
  freeMem: Number,
  totalMem: Number,
  memUsage: Number,
  osType: String,
  uptime: Number,
  cpuModel: String,
  cpuSpeed: Number,
  numCpus: Number,
  usedMem: Number,
  time: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Server", Server);
