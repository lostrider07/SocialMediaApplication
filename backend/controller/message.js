import Message from "../models/message.js";
import User from "../models/user.js";
export const createMessage = async (req, res, next) => {
  try {
    const message = new Message({
      text: req.body.text,
      user: req.params.id,
    });
    await message.save();
    const { id } = message;
    const foundUser = await User.findById(req.params.id);
    foundUser.messages.push(id);
    await foundUser.save();
    const foundMessage = await Message.findById(id).populate("user", {
      username: true,
      profileImage: true,
    });
    res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.messageId);
    if (message) {
      const foundMessage = await Message.findById(
        req.params.messageId
      ).populate("user", {
        username: true,
        profileImage: true,
      });
      res.status(200).json(foundMessage);
    } else {
      return next({
        status: 404,
        message: "Message not found",
      });
    }
  } catch (err) {
    return next(err);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const foundMessage = await Message.findById(req.params.messageId);
    const userId = await foundMessage.user;
    if (userId == req.params.id) {
      await foundMessage.remove();
      res.status(200).json(foundMessage);
    } else {
      return next({
        message: "Unauthorized user",
      });
    }
  } catch (err) {
    return next(err);
  }
};

export const getAllMessages = async (req, res, next) => {
  try {
    const allMessages = await Message.find().populate("user", {
      username: true,
      profileImage: true,
    });
    if (allMessages) {
      res.status(200).json(allMessages);
    } else {
      res.status(500).json({
        message: "Messages not found",
      });
    }
  } catch (err) {
    return next(err);
  }
};
