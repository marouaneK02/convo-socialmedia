import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import { v2 as cloudinary } from "cloudinary";

const getUserProfile = async(req,res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({username}).select("-password").select("-updatedAt");

        if(!user){
            res.status(404).json({ error: "User not found." });
        }

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ error:err.message });
        console.log("Error in getUserProfile: ", err.message);
    }
};

const signupUser = async(req,res) => {
    try {
        const {firstName, lastName, email, username, password} = req.body;
        const user = await User.findOne({$or:[{email},{username}]});

        if (user){
            return res.status(400).json({ error: "User already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
        });

        await newUser.save();

        if (newUser){
            generateTokenAndSetCookie(newUser._id, res);

            return res.status(201).json({
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                username: newUser.username,
                bio: newUser.bio,
                profilePic: newUser.profilePic,
            });
        } else{
            res.status(400).json({ error: "Invalid user data." });
        };

    } catch (err) {
        res.status(500).json({ error:err.message });
        console.log("Error in signupUser: ", err.message);
    }
};

const loginUser = async(req,res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({
            username
        });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password." });
        };

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profilePic: user.profilePic,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in loginUser: ", error.message);
    }
};

const logoutUser = (req,res) => {
    try {
        res.cookie("jwt","", {maxAge:1});
        res.status(200).json({ message: "User logged out successfully."});

    } catch (err) {
        res.status(500).json({ error:err.message });
        console.log("Error in logoutUser: ", err.message);
    }
};

const followUnfollowUser = async(req,res) => {
    try {
        const { id } = req.params;
        const userToUpdate = await User.findById(id);
        const currentUser = await User.findById(res.user._id);

        if(id === req.user._id.toString()){
            res.status(400).json({ error: "You cannot follow/unfollow yourself." });
        };

        if(!userToUpdate || !currentUser){
            res.status(404).json({ error: "User not found." });
        };

        const isFollowing = currentUser.following.includes(id);

        if(isFollowing){
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id }});
            await User.findByIdAndUpdate(req.user._id, { $pull: { following:id }});
            res.status(200).json({ message: "User unfollowed."});

        } else{
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id }});
            await User.findByIdAndUpdate(req.user._id, { $push: { following:id }});
            res.status(200).json({ message: "User followed."});
        };

    } catch (err) {
        res.status(500).json({ error:err.message });
        console.log("Error in followUnfollowUser: ", err.message);
    }
};

const updateUser = async(req,res) => {
    const { firstName, lastName, email, username, password, bio } = req.body;
    let { profilePic } = req.body;
    const userId = req.user._id;
    
    try {
        let user = await User.findById(userId);

        if(!user){
            res.status(404).json({ error: "User not found." });
        };

        if(req.params.id !== userId.toString()){
            res.status(400).json({ error: "You cannot update another user's profile." });
        };

        if(password){
            const salt = bcrypt.getSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            user.password = hashedPassword;
        };

        if(profilePic){
            if(user.profilePic){
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
            };

            const uploadedResponse = await cloudinary.uploader.upload(profilePic);
            profilePic = uploadedResponse.secure_url;
        };

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;

        user = await user.save();
        user.password = null,
        
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ error:err.message });
        console.log("Error in updateUser: ", err.message);
    }
};

export { signupUser, loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile };