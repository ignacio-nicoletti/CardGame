import { io } from "socket.io-client";
import socketService from "../socketService";

const URL = "http://localhost:3001";
//se conecta al server
export const connectSocket = async () => {
  await socketService.conect(URL).catch((err) => {
    console.log("Error: ", err);
  });
};

//se desconecta del servidor
export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

// ingresa a una sala

export const joinGameRoom = (socket, roomId, userName) => {
  return new Promise((res, rej) => {
    socket.emit("join_game", roomId, userName);
    socket.on("room_joined", () => res(true));
    socket.on("room_join_error", ({ error }) => rej(error));
  });
};

export const OnSalaLLena = (socket) => {
  return new Promise((res, rej) => {
    socket.on("salaLLena", (data) => {
      res(data);
    });
  });
};
export const EmitAsignar = (socket,roomId) => {
  socket.emit("asignar");
};

export const OnAsignar = (socket) => {
  return new Promise((res, rej) => {
    socket.on("asignar", (data) => {
      res(data)
    });
  });
};
