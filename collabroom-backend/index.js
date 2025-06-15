const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// ✅ Add Prisma
const { PrismaClient } = require('../collabroom-backend/generated/prisma')  
const prisma = new PrismaClient();

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // frontend
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("🟢 New client connected");

  socket.on("sendMessage", async ({ channel, message }) => {
    socket.broadcast.emit("receiveMessage", { channel, message });

    const isYou = message.startsWith('[You]');
    const content = message.replace('[You] ', '').replace('[Anonymous] ', '');

    try {
      if (isYou) {
        await prisma.userMessage.create({
          data: {
            content,
            channel
          }
        });
      } else {
        await prisma.anonymousMessage.create({
          data: {
            content,
            channel
          }
        });
      }
    } catch (err) {
      console.error("❌ Error saving message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected");
  });
});

server.listen(4000, () => console.log("🚀 Server listening on port 4000"));
