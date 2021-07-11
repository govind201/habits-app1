import { io } from "socket.io-client";
import {post} from "./utils/fetch/post";

const host = window.location.hostname + ":" + window.location.port;
export const socket = io(host)  

socket.on("connection", ()=>{
    console.log(socket);
    post('api/initsocket', {socketId: socket.id})
})  