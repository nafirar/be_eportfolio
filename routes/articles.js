const router = require("express").Router();
const Article = require("../models/Article");

//create
router.post("/", async (req, res)=>{
    const newArticle = new Article(req.body);
    try {
        const savedArticle = await newArticle.save();
        res.status(200).json(savedArticle);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update
router.put("/:id", async (req, res)=>{
    const article = await Article.findById(req.params.id);
    try {
        if (article.userId === req.body.userId) {
            await article.updateOne({$set:req.body});
            res.status(200).json("Article updated!");
        } else {
            res.status(500).json("You can only update your article!")
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//delete
//find
//get all


module.exports = router;