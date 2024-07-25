import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { ID, Query } from "node-appwrite";

const app = express();
const PORT = 3005;

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const users = new Map<string, string>();

io.on("connection", (socket) => {
  console.log("Bir kullanıcı bağlandı");

  socket.on("addUser", ({ userId }) => {
    users.set(userId, socket.id);
  });

  //send notification
  socket.on("sendNotification", async (data) => {
    console.log("sendNotification", data);
    const { receiverId, orderId, status, createdAt } = data;

    const receiverSocketId = users.get(receiverId);

    if (receiverSocketId) {
      socket.to(receiverSocketId).emit("receiveNotification", {
        receiverId,
        orderId,
        status,
        createdAt,
      });
    }
  });

  socket.on("removeNotification", async (data) => {
    const { senderId, receiverId, type, postId, commentId, active } = data;
    const receiverSocketId = users.get(receiverId);
    let queryArray = [
      Query.equal("senderId", senderId),
      Query.equal("receiverId", receiverId),
      Query.equal("type", type),
    ];

    if (postId) {
      queryArray.push(Query.equal("postId", postId));
    }
    if (commentId) {
      queryArray.push(Query.equal("commentId", commentId));
    }

    if (receiverSocketId) {
      console.log(type);
      socket.to(receiverSocketId).emit("removeReceiveNotification", {
        senderId,
        receiverId,
        type,
        unSeen: false,
        postId,
        commentId,
        active,
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
