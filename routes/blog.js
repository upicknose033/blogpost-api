const express = require('express');
const blogController = require('../controllers/blog');

const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

router.post("/createBlogPost", verify, blogController.createBlogPost);

router.get("/getAllBlogPosts", blogController.getAllBlogPosts);

router.get("/getBlogPost/:id", blogController.getSelectedBlogPost);

router.put("/updateBlogPost/:id", verify, blogController.updateBlogPost);

router.delete("/deleteBlogPost/:id", verify, verifyAdmin, blogController.deleteBlogPost);



module.exports = router;