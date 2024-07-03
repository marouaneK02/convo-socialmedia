import express from "express";
import { createPost, deletePost, getFeedPosts, getPost, likeUnlikePost, replyPost } from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts);
router.get("/:id", getPost);
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/reply/:id", protectRoute, replyPost);
router.delete("/:id", protectRoute, deletePost);

export default router;