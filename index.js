const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//untuk path
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const articleRoute = require("./routes/articles");

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
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/articles", articleRoute);

app.listen(8800, () => {
  console.log("Listening to port...");
});
