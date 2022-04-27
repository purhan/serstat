const express = require("express");
const cluster = require("cluster");
const net = require("net");
const redis = require("redis");
const socketio = require("socket.io");
const socket_main = require("./socket_main");

const port = 8181;
const cpuCount = require("os").cpus().length;
const io_redis = require("socket.io-redis");
const farmhash = require("farmhash");

require("dotenv").config();

if (cluster.isMaster) {
  let workers = [];

  let spawn = function (i) {
    workers[i] = cluster.fork();

    workers[i].on("exit", function (code, signal) {
      spawn(i);
    });
  };

  for (var i = 0; i < cpuCount; i++) {
    spawn(i);
  }

  const worker_index = function (ip, len) {
    return farmhash.fingerprint32(ip) % len;
  };

  const server = net.createServer({ pauseOnConnect: true }, (connection) => {
    let worker = workers[worker_index(connection.remoteAddress, cpuCount)];
    worker.send("sticky-session:connection", connection);
  });
  server.listen(port);
  console.log(`Master listening on port ${port}`);
} else {
  let app = express();

  const server = app.listen(0, "localhost");
  const io = socketio(server, {
    cors: {
      origin: "*",
    },
  });

  const redisClient = redis.createClient(
    process.env.REDIS_PORT,
    process.env.REDIS_URI,
    {
      auth_pass: process.env.REDIS_AUTH,
    }
  );
  io.adapter(io_redis({ redisClient }));

  io.on("connection", function (socket) {
    socket_main(io, socket);
    console.log(`connected to worker: ${cluster.worker.id}`);
  });

  process.on("message", function (message, connection) {
    if (message !== "sticky-session:connection") {
      return;
    }

    server.emit("connection", connection);

    connection.resume();
  });
  console.log(`Server ${process.pid} listening on port ${port}`);
}
