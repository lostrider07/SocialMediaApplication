import mongoose from "mongoose";
import User from "./user.js";

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxlength: 100,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.pre("remove", async function (next) {
  try {
    const user = await User.findById(this.user);
    user.messages.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});
const Message = mongoose.model("Message", messageSchema);
export default Message;
