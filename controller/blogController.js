//index, create(details), store(post), search(findbyID), delete
const Blog = require('../models/blogs');

const index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        });
}

const store = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
}

const create = (req, res) => {
    res.render('create', { title: 'Create Blogs' });
}

const search = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { title: 'Blog Details', blog: result })
        })
        .catch(err => {
            console.log(err);
        });
}

const deleted = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch(err => {
            console.log(err);
        });
}

//Export
module.exports = {
    index,
    store,
    create,
    search,
    deleted
}