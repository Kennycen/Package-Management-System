import express from 'express';
import { sendMessage } from '../controllers/chatController.js';
import { authenticateUser } from '../middleware/auth.js';

const chatRouter = express.Router();
chatRouter.use(authenticateUser);

chatRouter.post('/send', sendMessage);

export default chatRouter; 