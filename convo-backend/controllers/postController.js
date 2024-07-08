import User from "../models/userModel.js";
import Post from "../models/postModel.js";

const getPost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            res.status(404).json({ error: "Post not found." });
        };

        req.status(200).json({ post });

    } catch (err) {
        res.status(500).json({ error:err.message });
        console.log("Error in getPost: ", err.message);
    }
};

const getFeedPosts = async(req,res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if(!user){
            res.status(404).json({ error: "User not found." });
        };

        const following = user.following;

        const feedPosts = await Post.find({
            postedBy: { $in:following },
        }).sort({
            createdAt: -1
        });

        req.status(200).json({ feedPosts });

    } catch (err) {
        res.status(500).json({ error:err.message });
        console.log("Error in getFeedPost: ", err.message);
    }
};

const createPost = async(req,res) => {
    try {
        const { postedBy, text, img } = req.body;
        if(!postedBy || !text){
            res.status(400).json({ error: "postedBy and text fields required." });
        };

        const user = await User.findById(postedBy);
        if(!user){
            res.status(404).json({ error: "User not found." });
        };

        if(user._id.toString() !== req.user._id.toString()){
            res.status(401).json({ error: "Unauthorised to post." });
        };

        const maxLength = 500;
        if(text.length > maxLength){
            res.status(400).json({ error: `Text must be less than ${maxLength} characters.` });
        };

        const newPost = new Post({
            postedBy,
            text,
            img,
        });

        await newPost.save();
        req.status(201).json({ message: "Post created successfully." , newPost });

    } catch (err) {
        res.status(500).json({ error:err.message });
        console.log("Error in createPost: ", err.message);
    }
};

const likeUnlikePost = async(req,res) => {
    try {
        const{ id:postId } = req.params;
        const userId = req.user._id;
        const post = await Post.findById(postId);

        if(!post){
            res.status(404).json({ error: "Post not found." });
        };

        const userLikedPost = post.likes.includes(userId);
        if(userLikedPost){
            await Post.updateOne({_id:postId}, {$pull: {likes:userId}});
            req.status(200).json({ message: "Post unliked successfully." });
        } else{
            post.likes.push(userId);
            await post.save();
            req.status(200).json({ message: "Post liked successfully." });
        };

    } catch (err) {
        res.status(500).json({ error:err.message });
        console.log("Error in likeUnlikePost: ", err.message);
    }
};

const replyPost = async(req,res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;
        const userProfilePic = req.user.profilePic;
        const username = req.username;

        if(!text){
            res.status(400).json({ error: "Text field is required." });
        };

        const post = await Post.findById(postId);

        if(!post){
            res.status(404).json({ error: "Post not found." });
        };

        const reply = { userId, text, userProfilePic, username };
        post.reply.push(reply);
        await post.save();
        req.status(200).json({ message: "Reply added successfully.", post });

    } catch (err) {
        res.status(500).json({ error:err.message });
        console.log("Error in replyPost: ", err.message);
    }
};

const deletePost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            res.status(404).json({ error: "Post not found." });
        };

        if(post.postedBy.toString() !== req.user._id.toString()){
            res.status(401).json({ error: "Unauthorised to delete post." });
        };

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted successfully." });

    } catch (err) {
        res.status(500).json({ error:err.message });
        console.log("Error in deletePost: ", err.message);
    }
};

export { createPost, getPost, getFeedPosts, likeUnlikePost, replyPost, deletePost };