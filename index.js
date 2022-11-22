const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

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

app.use(cors());

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
