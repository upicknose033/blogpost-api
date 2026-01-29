const Blog = require('../models/Blog');
const { errorHandler } = require('../auth');


module.exports.createBlogPost = (req, res) => {
    let newBlog = new Blog({
        title: req.body.title,
        content: req.body.content,
        authorInfo: req.body.authorInfo,
        date: new Date() 
    });

    Blog.findOne({ title: req.body.title })
    .then(existingBlogPost => {
        if(existingBlogPost) {
            return res.status(409).send({ message: 'Blog already exists' });        
        } else {
            return newBlog.save()
            .then(result => res.status(201).send({
                success: true,
                message: 'Blog Post added successfully',
                result: result
            })).catch(error => errorHandler(error, req, res));
        }
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.getSelectedBlogPost = (req, res) => {
	const { blogId } = req.body;

	Blog.findById(blogId)
	.then(blog => {
		if(blog){
			return res.status(200).send(blog);
		} else {
			return res.status(404).send({ message: "Blog not found" })
		}

	})
	.catch(error => errorHandler(error, req, res));
};

module.exports.getAllBlogPosts = (req, res) => {
	return Blog.find({})
	.then(blogs => {
		if(blogs.length > 0){
			return res.status(200).send({ blog });
		} else {
			return res.status(404).send({ message: "No blogs found." });
		}
	})
	.catch(error => errorHandler(error, req, res));
};


module.exports.updateBlogPost = (req, res) => {
    const userId = req.user.id; 

    Blog.findById(req.params.blogId)
    .then(blog => {
        if (!blog) return res.status(404).send({message: "Blog not found"});
        
        if (blog.author.toString() !== userId) {
            return res.status(403).send({message: "Unauthorized to edit this post"});
        }

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        
        return blog.save().then(updated => res.status(200).send({
            success: true,
            message: "Blog updated successfully",
            updatedBlog: updated
        }));
    })
    .catch(err => errorHandler(err, req, res));
};


module.exports.deleteBlogPost = (req, res) => {
    const userId = req.user.id;
    const blogId = req.params.blogId; 

    Blog.findById(blogId)
    .then(blog => {
        if (!blog) return res.status(404).send({ message: 'Blog does not exist' });

        if (blog.author.toString() !== userId) {
            return res.status(403).send({ message: "Unauthorized to delete this post" });
        }

        return Blog.findByIdAndDelete(blogId)
            .then(() => res.status(200).send({ 
                success: true, 
                message: "Blog deleted successfully" 
            }));
    })
    .catch(error => errorHandler(error, req, res));
};