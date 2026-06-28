const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");


app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));
// Create an array - like a database
let posts =[
{
    id : uuidv4(),
    username : "deepayan",
    Image : "https://images.unsplash.com/photo-1769760992281-fdc7d7fd883c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
    content: "You are not in the mountains. The mountains are in you. — John Muir",
},

{
    id : uuidv4(),
    username : "alice",
    Image : "https://images.unsplash.com/photo-1767738912443-46be91790af7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
    content: "Travel makes one modest. You see what a tiny place you occupy in the world. – Gustave Flaubert",
},

{
    id : uuidv4(),
    username : "bob",
    Image : "https://plus.unsplash.com/premium_photo-1769376722557-983803523e09?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D",
    content: "We are not human beings having a spiritual experience. We are spiritual beings having a human experience. — Pierre Teilhard de Chardin",
},
]

//Index-Route
app.get("/posts", (req, res) => {
    res.render("index.ejs",{posts});
})


//create--Route  
app.get("/posts/new",(req, res) => {
    res.render("new.ejs");
})


//create Route--save to the array
app.post("/posts",(req, res) => {
    let{username , content, Image } = req.body;
    let id = uuidv4();
    posts.push({id, username, content, Image});
    res.redirect("/posts");
})

//Show --Route
app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("view.ejs", { post });
    })

//edit - route
app.get("/posts/:id/edit",(req, res) => {
    let{id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
})

//Patch -- requesr--update your content
app.patch("/posts/:id",(req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id===p.id);
    post.content = newContent;
    res.redirect("/posts");s
})

//Delete -- route 
app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
})




app.listen(port, () => {
    console.log(`port listining on ${port}`);
})

