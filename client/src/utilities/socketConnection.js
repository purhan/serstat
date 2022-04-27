import io from "socket.io-client";
let socket = io.connect("http://localhost:8181");
require("dotenv").config();

console.log('process.env.CLIENT_SECRET');
console.log(process.env);
console.log(process.env.REACT_APP_CLIENT_SECRET);

socket.emit("clientAuth", process.env.REACT_APP_CLIENT_SECRET);

export default socket;
