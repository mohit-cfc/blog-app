const express = require('express');
const app = express();
const path = require('path');
const Blog = require('./models/blog');
const methodOverride = require('method-override');

const mongoose = require('mongoose');
mongoose
    .connect('mongodb://localhost:27017/blog-app')
    .then(()=>{
        console.log("Mongo Connection Open");
    })
    .catch(err=>{
        console.log("Error");
        console.log(err);
    });

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.get('/blogs',async (req,res)=>{
    const blogs = await Blog.find({});
    res.render('home', {blogs});
})

app.post('/blogs', async(req,res)=>{
    const blog = new Blog(req.body);
    await blog.save();
    res.redirect('/blogs')
})

app.get('/blogs/new', (req,res)=>{
    res.render('new');
})

app.get('/blogs/:id', async(req,res)=>{
    const {id} = req.params;
    const blog = await Blog.findById(id);
    res.render('show',{blog});
})

app.get('/blogs/:id/edit', async(req,res)=>{
    const {id} = req.params;
    const blog = await Blog.findById(id);
    res.render('edit', {blog});
})

app.patch('/blogs/:id', async(req,res)=>{
    const {id} = req.params;
    const blog = await Blog.findByIdAndUpdate(id,req.body);
    res.redirect(`/blogs/${blog._id}`);
})

app.delete('/blogs/:id',async(req,res)=>{
    const {id} = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    console.log(blog);
    res.redirect('/blogs');
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000");
})
