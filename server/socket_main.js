const mongoose = require("mongoose");

require("dotenv").config();
mongoose.connect(process.env.MONGOOSE_AUTH, { useNewUrlParser: true });
const Server = require("./models/Server");
const SERVER_SECRET = process.env.SERVER_SECRET;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const socket_main = (io, socket) => {
  let macA;

  socket.on("clientAuth", (key) => {
    if (key === SERVER_SECRET) {
      socket.join("clients");
    } else if (key === CLIENT_SECRET) {
      socket.join("ui");
      Server.find({}, (err, docs) => {
        docs.forEach((aServer) => {
          aServer.isActive = false;
          io.to("ui").emit("data", aServer);
        });
      });
    } else {
      socket.disconnect(true);
    }
  });

  socket.on("disconnect", () => {
    Server.find({ macA: macA }, (err, docs) => {
      if (docs.length > 0) {
        docs[0].isActive = false;
        io.to("ui").emit("data", docs[0]);
      }
    });
  });

  socket.on("initData", async (data) => {
    macA = data.macA;
    const mongooseResponse = await update(data);
    console.log(mongooseResponse);
  });

  socket.on("updateData", async (data) => {
    io.to("ui").emit("data", data);
    await update(data);
  });
};

const update = (data) => {
  return new Promise((resolve, reject) => {
    Server.findOne({ macA: data.macA }, (err, doc) => {
      if (err) {
        reject("error");
        throw err;
      } else {
        let newServer = new Server(data);
        newServer.save();
        resolve("updated");
      }
    });
  });
};

module.exports = socket_main;
