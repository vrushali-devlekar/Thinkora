import { Router } from "express";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../controllers/chat.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const chatRouter = Router();

// talk with ai
chatRouter.post("/message", authUser, sendMessage);

// retrieve chats
chatRouter.get("/", authUser, getChats);

// get overall chats
chatRouter.get("/:chatId/messages", authUser, getMessages);

chatRouter.delete("/delete/:chatId", authUser, deleteChat);
export default chatRouter;
