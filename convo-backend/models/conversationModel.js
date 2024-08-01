import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    }],
    lastMessage:{
        sender: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        text: String,
    },
},{
    timestamps: true,
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;