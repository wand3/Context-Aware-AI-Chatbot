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
const openai = new OpenAIApi(configuration);                                                                          app.use(express.static("public"));
