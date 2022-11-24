const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require("multer");
const path = require("path");


const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

dotenv.config();
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "..", "/images")));


mongoose.connect(process.env.MONGO_URL)
.then(console.log('Conncted to MongoDB'))
.catch(err => console.log(err));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//ROTA DE AUTENTICAÇÃO
app.use("/auth", authRoute);

// ROTA DE USUARIO
app.use("/users", userRoute);

//ROTA DE POSTAGENS
app.use("/posts", postRoute);

// ROTA DE CATEGORIA
app.use("/categories", categoryRoute);

app.listen('5000', () => {
  console.log('Backend is Running');
})

