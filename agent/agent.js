const os = require("os");
const io = require("socket.io-client");
const socket = io("http://localhost:8181");
const { getMacAddress, getServerData } = require("./util");
require("dotenv").config();

const SERVER_SECRET = process.env.SERVER_SECRET;
socket.on("connect", () => {
  let mac_address = getMacAddress();

  socket.emit("clientAuth", SERVER_SECRET);

  getServerData().then((perfData) => {
    perfData.mac_address = mac_address;
    socket.emit("initData", perfData);
  });

  let updateDataInterval = setInterval(() => {
    getServerData().then((perfData) => {
      perfData.mac_address = mac_address;
      socket.emit("updateData", perfData);
    });
  }, 1000);

  socket.on("disconnect", () => {
    clearInterval(updateDataInterval);
  });
});
