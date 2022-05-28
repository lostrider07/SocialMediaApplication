import express from "express";
import {
  createMessage,
  getMessage,
  deleteMessage,
  getAllMessages,
} from "../controller/message.js";
import { isLoggedIn, correctUser } from "../middleware/auth.js";
const router = express.Router({ mergeParams: true });

router.get("/", isLoggedIn, getAllMessages);
router.get("/:messageId", isLoggedIn, getMessage);
router.delete("/:messageId", isLoggedIn, correctUser, deleteMessage);
router.post("/", isLoggedIn, correctUser, createMessage);

export default router;
