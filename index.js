const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");

//untuk path
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const articleRoute = require("./routes/articles");
const activityRoute = require("./routes/activities");
const badgeRoute = require("./routes/badges");
const albumRoute = require("./routes/album");
const projectRoute = require("./routes/projects");

//koneksi database
dotenv.config();
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log("Connected to mongoDB")
);

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://127.0.0.1:5173", "http://127.0.0.1:3000"],
  })
);

//middleware
app.use(express.json());

//api
app.use(express.static("storage"));
app.use("/storage/images", express.static("storage/images"));
app.use("/storage/videos", express.static("storage/videos"));
app.use("/storage/documents", express.static("storage/documents"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/articles", articleRoute);
app.use("/api/activities", activityRoute);
app.use("/api/badges", badgeRoute);
app.use("/api/album", albumRoute);
app.use("/api/projects", projectRoute);

//Multer Error File Handling
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    return res.status(418).json({
      err_code: err.code,
      err_message: err.message,
    });
  } else {
    // Handling errors for any other cases from whole application
    return res.status(500).json({
      err_code: 409,
      err_message: "Something went wrong!",
    });
  }
});

app.listen(8800, () => {
  console.log("Listening to port 8800");
});
