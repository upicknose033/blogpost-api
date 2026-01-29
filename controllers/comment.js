const Comment = require('../models/Comment');
const { errorHandler } = require('../auth');

module.exports.addComment = (req, res) => {
    const newComment = new Comment({
        blogId: req.params.blogId,
        userId: req.user.id,
        username: req.user.username,
        commentText: req.body.commentText
    });

    newComment.save()
    .then(result => res.status(201).send(result))
    .catch(err => errorHandler(err, req, res));
};

module.exports.getComments = (req, res) => {
    Comment.find({ blogId: req.params.blogId })
    .then(comments => res.status(200).send(comments))
    .catch(err => errorHandler(err, req, res));
};

module.exports.deleteComment = (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin; 

    Comment.findById(commentId)
    .then(comment => {
        if (!comment) {
            return res.status(404).send({ message: "Comment not found" });
        }

        if (comment.userId.toString() !== userId && !isAdmin) {
            return res.status(403).send({ 
                message: "Unauthorized. You can only delete your own comments." 
            });
        }

        return Comment.findByIdAndDelete(commentId)
        .then(() => {
            res.status(200).send({ 
                success: true, 
                message: "Comment deleted successfully" 
            });
        });
    })
    .catch(error => errorHandler(error, req, res));
};