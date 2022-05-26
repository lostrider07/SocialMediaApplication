import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Message from "./messages";

const userSchema = new mongoose.Schema ({
    email: {
        type : String,
        required : true,
        unique : true
    },
    username: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true
    }  
});

userSchema.pre("save", async function(next){
    try{
        if (!this.isModified("password")) {
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    }
    catch (err) {
        return next(err);
    }
});


userSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model("User", userSchema)
export default User;