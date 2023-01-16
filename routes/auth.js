const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registrasi
router.post("/register", async (req, res) => {
  try {
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) {
      return res.status(422).json("Email already registered");
    }
    //hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });

    //save user and return respond
    const user = await newUser.save();

    const { password, ...data } = await user.toJSON();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    //untuk cek email ada atau gak
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json("User not found");
    }

    //untuk cek password bener atau gak
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json("Wrong password");
    }

    const token = jwt.sign({ id: user._id }, "secret");

    res.cookie("jwt", token, {
      sameSite: "none",
      secure: true,
      maxAge: 3600 * 24 * 1000, // 1 day
    });

    //kalau login berhasil
    res.status(200).json({
      message: "success",
      jwt: token,
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// getAuthenticatedUser
router.get("/user/:jwt", async (req, res) => {
  try {
    const jwtUser = req.params.jwt;

    const claims = jwt.verify(jwtUser, "secret");

    if (!claims) {
      return res.status(401).json("Unauthenticated");
    }

    const user = await User.findOne({ _id: claims.id });

    const { password, ...data } = await user.toJSON();

    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({
      message: "unauthenticated",
    });
  }
});

// Logout
router.post("/logout", async (req, res) => {
  res.cookie("jwt", "", { sameSite: "none", secure: true, maxAge: 0 });

  res.json({
    message: "success",
  });
});

module.exports = router;
