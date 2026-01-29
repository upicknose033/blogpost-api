const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const { verify, verifyAdmin } = require('../auth');

router.get("/getComments/:blogId", commentController.getComments);

router.post("/addComment/:blogId", verify, commentController.addComment);

router.delete("/deleteComment/:commentId", verify, verifyAdmin, commentController.deleteComment);

module.exports = router;