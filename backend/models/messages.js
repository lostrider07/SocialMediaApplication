import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    text:{
        type : String,
        required : true,
        maxlength : 100
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
},{
    timestamps : true
})

messageSchema.pre("remove", async function(next) {
    try{
        
    }
})
const Message = mongoose.model('Message', messageSchema);
export default Message;