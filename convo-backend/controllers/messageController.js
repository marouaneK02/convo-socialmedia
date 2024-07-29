import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

async function getConversations(req,res){
    const userId = req.user._id;

    try {
        const conversations = await Conversation.find({
            participants: userId,
        }).populate({
            path: "participants",
            select: "username profilePic",
        });

        res.status(200).json(conversations);

    } catch (err) {
        res.status(500).json({ error:err.message });
        console.log("Error in getConversations: ", err.message);
    }
};

async function getMessages(req,res){
    const { otherUserId } = req.params;
    const userId = req.user._id;

    try {
        const conversation = await Conversation.findOne({
            participants:{ $all: [userId, otherUserId] },
        });

        if(!conversation){
            return res.status(404).json({ error: "Conversation not found." });
        };

        const messages = await Message.find({
            conversationId: conversation._id,
        }).sort({createdAt: 1});

        res.status(200).json(messages);

    } catch (err) {
        res.status(500).json({ error:err.message });
        console.log("Error in getMessages: ", err.message);
    }
};

async function sendMessage(req,res){
    try {
        const { recipientId, message } = req.body;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recipientId] },
        });

        if(!conversation){
            conversation = new Conversation({
                participants: [senderId, recipientId],
                lastMessage: {
                    sender: senderId,
                    text: message,
                },
            });

            await conversation.save();
        };

        const newMessage = new Message({
            conversationId: conversation._id,
            sender: senderId,
            text: message,
        });

        await Promise.all([
            newMessage.save(),
            conversation.updateOne({
                lastMessage:{
                    text: message,
                    sender: senderId,
                },
            }),
        ]);

        res.status(201).json(newMessage);

    } catch (err) {
        res.status(500).json({ error:err.message });
        console.log("Error in sendMessage: ", err.message);
    }
};

export { sendMessage, getMessages, getConversations };