import { messageModel } from "../db/models/messages.models.js";
import BasicManager from "./BasicManager.js";

class MessagesManager  extends BasicManager  {
   constructor(){
    super(messageModel)
   }
};

export const messageManager = new MessagesManager()