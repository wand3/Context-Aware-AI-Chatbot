import dotenv from "dotenv";
import express from "express";                             
import http from "http";
import { Server } from "socket.io";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const app = express();                                     
const server = http.createServer(app);                     
const io = new Server(server);                             
const port = process.env.PORT || 3000;

// OpenAI API configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,                      
});                                                        
const openai = new OpenAIApi(configuration);                                                                        
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("New user connected");

  // Initialize the conversation history
  const conversationHistory = [];

  socket.on("sendMessage", async (message, callback) => {
    try {
      // Add the user message to the conversation history
      conversationHistory.push({ role: "user", content: message });

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: conversationHistory,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: [" user:", " assistant:"],
      });

      const response = completion.data.choices[0].message.content;

      // Add the assistant's response to the conversation history
      conversationHistory.push({ role: "assistant", content: response });

      socket.emit("message", response);
      callback();
    } catch (error) {
      console.error(error);
      callback("Error: Unable to connect to the chatbot");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
