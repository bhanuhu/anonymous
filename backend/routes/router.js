const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");
const randomInt = require("crypto").randomInt;
var checkCodeForSignUp = 0;
var checkCodeForLogIn = 0;
const SignUp = require("../models/signupSchema");
const Post = require("../models/postSchema");

const generateOTP = () => {
  return randomInt(100000, 999999);
};

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

router.post("/signin", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json("please fill the data");
  }
  try {
    console.log("start signup process");
    const preEmail = await SignUp.findOne({ email: email });
    if (preEmail) {
      res.status(403).json("this user is already present");
    } else {
      let code = generateOTP();
      const mailOptions = {
        from: "bhanuaggarwal47@gmail.com",
        to: email,
        subject: "Verification code",
        html: `<div><p>Here is the Verification code for your ANONYMOUS account:</p> <h3>${code}</h3></div>`,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error.message);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      checkCodeForSignUp = code;
      res.status(201).json({
        status: 201,
        message: "otp sent for signup",
      });
    }
  } catch (err) {
    res.status(404).json(err);
    console.log("catched an error during signup");
  }
});

router.post("/otpVerificationForSignup", async (req, res) => {
  const { name, email, otp } = req.body;

  if (!otp) {
    res.status(400).json("please fill the data");
  }
  try {
    console.log("start otp checking process");
    console.log(otp)
    console.log(checkCodeForSignUp)
    if (otp.otp == checkCodeForSignUp) {
      const newSignUp = new SignUp({
        name: name,
        email: email,
      });
      const storeSignup = await newSignUp.save();
      res.status(201).json({
        status: 201,
        message: "otp matching for signup",
      });
    } else {
      res.status(403).json({ status: 403, error: "OTP is not matching" });
    }
  } catch (err) {
    res.status(404).json(err);
    console.log("catched an error during otp verification");
  }
});

router.post("/login", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json("please fill the data");
  }
  try {
    console.log("start login process");
    const userValid = await SignUp.findOne({ email: email });
    if(userValid){

    
    let code = generateOTP();
    const mailOptions = {
      from: "bhanuaggarwal47@gmail.com",
      to: email,
      subject: "Verification code",
      html: `<div><p>Here is the Verification code for your ANONYMOUS account:</p> <h3>${code}</h3></div>`,
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error.message);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    checkCodeForLogIn = code;
    res.status(201).json({
      status: 201,
      message: "otp sent for login",
    });}
  } catch (err) {
    res.status(404).json(err);
    console.log("catched an error during signup");
  }
});

router.post("/otpVerificationForLogin", async (req, res) => {
  const { email, otp } = req.body;

  if (!otp || !email) {
    res.status(400).json("please fill the data");
  }
  try {
    console.log("start otp checking process");
    

    if (otp.otp == checkCodeForLogIn) {
      const userValid = await SignUp.findOne({ email: email });

      if (userValid) {
        const token = await userValid.generateAuthtoken();
        console.log("A");

        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 28800000), //token expires in 6 hour
          httpOnly: true,
        });

        res
          .status(201)
          .json({ status: 201, token, msg: "Successfully authenticated" });
      } else {
        res.status(404).json({
          status: 404,
          error: "an error occur during otp verification",
        });
      }
    } else {
      res.status(403).json({ status: 403, error: "OTP is not matching" });
    }
  } catch (err) {
    res.status(404).json(err);
    console.log("catched an error during otp verification");
  }
});

router.post("/createPost", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json("please fill the data");
  }
  try {
    console.log("start post adding process");
    const newPost = new Post({
      title: title,
      description: description,
      comment: [],
      reply: [],
    });

    const storePost = await newPost.save();

    res.status(201).json({
      status: 201,
      message: "new post created",
    });
  } catch (err) {
    res.status(404).json(err);
    console.log("catched an error while saving your post");
  }
});

router.post("/addComment", async (req, res) => {
  const { id, name, comment } = req.body;

  if (!id || !name || !comment) {
    return res.status(400).json("Please fill all the required fields");
  }

  try {
    const existingPost = await Post.findOne({ _id: id });
    if (!existingPost) {
      return res.status(404).json({
        status: 404,
        message: "Post not found",
      });
    }

    const newComment = {
      name: name,
      comment: comment,
    };

    await Post.findOneAndUpdate(
      { _id: id },
      { $push: { comment: newComment } },
      { new: true }
    );

    return res.status(200).json({
      status: 200,
      message: "Comment added successfully",
    });
  } catch (error) {
    console.error("Error while adding comment:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
});

router.post("/addReply", async (req, res) => {
  const { postid, commentid, name, comment } = req.body;

  if (!postid || !name || !comment || !commentid) {
    return res.status(400).json("Please fill all the required fields");
  }

  try {
    const existingPost = await Post.findOne({ _id: postid });
    if (!existingPost) {
      return res.status(404).json({
        status: 404,
        message: "Post not found",
      });
    }

    const newReply = {
      name: name,
      comment: comment,
      replyTo: commentid,
    };

    await Post.findOneAndUpdate(
      { _id: postid },
      { $push: { reply: newReply } },
      { new: true }
    );

    return res.status(200).json({
      status: 200,
      message: "reply added successfully",
    });
  } catch (error) {
    console.error("Error while adding comment:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
});

router.get("/getCommentedPost", async (req, res) => {
  const name = req.query.name;

  if (!name) {
    return res.status(400).json("Please fill all the required fields");
  }

  try {
    const result = await Post.find({
      "comment.name": name,
    });
    // console.log(result);

    return res.status(200).json({
      status: 200,
      result: result,
    });
  } catch (error) {
    console.error(
      "Error while getting posts where you have commented: ",
      error
    );
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
});

router.get("/getRepliedPost", async (req, res) => {
  const name = req.query.name;

  if (!name) {
    return res.status(400).json("Please fill all the required fields");
  }

  try {
    const result = await Post.find({
      "reply.name": name,
    });
    // console.log(result);

    return res.status(200).json({
      status: 200,
      result: result,
    });
  } catch (error) {
    console.error(
      "Error while getting posts where you have commented: ",
      error
    );
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
});

router.get("/getposts", async (req, res) => {
  try {
    const result = await Post.find({});
    res.status(201).json({ status: 201, result });
  } catch (error) {
    res.status(400).json({ status: 400, error });
  }
});
router.get("/getSinglePosts", async (req, res) => {
  const id = req.query.id;
  try {
    const result = await Post.findOne({ _id:id });
    res.status(201).json({ status: 201, result });
  } catch (error) {
    res.status(400).json({ status: 400, error });
  }
});
router.post("/getReply", async (req, res) => {
  const { postID, commentID } = req.body;
  try {
    const result1 = await Post.findOne({ _id: postID });
    console.log("r1:",result1.reply);
    
    const repliesArray = result1.reply.filter((item) => item.replyTo === commentID);
    console.log("r2:",repliesArray);
    res.status(201).json({ status: 201, result: repliesArray });
  } catch (error) {
    console.error("Error while querying replies:", error);
    res.status(400).json({ status: 400, error });
  }
});
module.exports = router;
