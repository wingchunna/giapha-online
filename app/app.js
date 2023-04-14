//import library
const express = require("express");
const app = express();
const session = require("cookie-session");
const cookieParser = require("cookie-parser");

// import routes

const userRoutes = require("../routes/userRoute");
const postRoutes = require("../routes/postRoutes");
const peopleRoutes = require("../routes/peopleRoutes");
const generationRoutes = require("../routes/generationRoutes");
const imageRoutes = require("../routes/imageRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const webconfigRoutes = require("../routes/webconfigRoutes");
const videoRoutes = require("../routes/videoRoutes");

require("dotenv").config();
require("../Config/dbConnect");
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);
// config session
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    // store: new RedisStore(),
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 60000 },
  })
);

//Routes
app.use("/api/v1/users", userRoutes);
//Product Routes
app.use("/api/v1/posts", postRoutes);
//Category Routes
app.use("/api/v1/people", peopleRoutes);
//Brand Routes
app.use("/api/v1/generations", generationRoutes);
//Color Routes
app.use("/api/v1/images", imageRoutes);
//Review Routes
app.use("/api/v1/categories", categoryRoutes);
//Order Routes
app.use("/api/v1/webconfigs", webconfigRoutes);
//Coupon Routes
app.use("/api/v1/videos", videoRoutes);

app.use(notFound);
//error middlewares
module.exports = app;
