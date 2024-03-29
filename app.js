const express = require('express');
//Use morgan a logger middleware
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes');




const app = express();

//Connect to mongoDB
const dbURI = process.env.MONGODB_URL || 'mongodb+srv://robaranks:KNcKiNQJVpVCdQ4S@cluster0.74ibd.mongodb.net/Nodejs-Express?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(process.env.PORT || 5000);
        console.log('Connected to MongoDB')
    })
    .catch((err) => console.log(err));


//Using a view engine
app.set('view engine', 'ejs');
//Automatically searchs the .ejs files on views folder to change that
app.set('views', 'myviews');


//Use custom middleware
/* app.use((req, res, next) => {
    console.log('hostname: ', req.hostname);
    console.log('url: ', req.url);
    console.log('protocal: ', req.protocol);
    next();
}); */
//Add middleware for static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
    //Using the logger middleware
app.use(morgan('combined'))

/* app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'New Blog 2',
        snippet: 'This is a new blog 2 added',
        body: 'More information on the new blog 2'
    });
    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

//Get single blog post
app.get('/single-blog', (req, res) => {
    Blog.findById("62c70f94f6bca0fe206e7efe")
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
}); */

app.get('/', (req, res) => {
    /* res.sendFile('./views/index.html', { root: __dirname }); */
    //Render views in ejs
    /* const blogs = [{
            title: 'Computer Networks',
            snippet: 'A computer network is a set of computers sharing resources located on or provided by network nodes.'
        },
        {
            title: 'Computer',
            snippet: 'A computer network is a set of computers sharing resources located on or provided by network nodes.'
        },
        {
            title: 'Networks',
            snippet: 'A computer network is a set of computers sharing resources located on or provided by network nodes.'
        },
    ]; */
    //res.render('index', { title: 'Home', blogs: blogs });
    res.redirect('/blogs');
});

//All blogs
app.use('/blogs', blogRoutes);

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});
//Redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});
//Error 404 Not found
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404' })
});