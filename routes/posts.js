const router = require("express").Router();
const { json } = require("express");
const Post = require("../models/Post");
const User = require("../models/User");

//create post
router.post("/", async(req, res)=>{
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200),json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

//update post
router.put("/:id", async(req, res)=>{
    const post = await Post.findById(req.params.id);
    try {
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("Post updated!");
        }else{
            res.status(500).json("You can only update your post")
        }
    } catch (err) {
        res.status(500).json(err)
    }

})

//delete post
router.delete("/:id", async(req, res)=>{
    const post = await Post.findById(req.params.id);
    try {
        if(post.userId === req.body.userId){
            await post.deleteOne({$set:req.body});
            res.status(200).json("Post deleted!");
        }else{
            res.status(500).json("You can only delete your post")
        }
    } catch (err) {
        res.status(500).json(err)
    }

})

//find post
router.get("/:id", async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
})

//get all post
router.get("/timeline/all", async(req, res)=>{
    try {
        const userPost = await Post.find();
        res.json(userPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports=router;