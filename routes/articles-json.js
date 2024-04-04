var express = require("express");
var router = express.Router();
var fs = require("fs");

const DATA_PATH = "data/articles.json";

/**
 *
 */

router.get("/", function (req, res, next) {
  console.log("reading file %o", DATA_PATH);
  const limit = req.query.limit;
  const offset = req.query.offset;

  const articles = getArticles();

  res.json(articles.slice(offset, parseInt(offset) + parseInt(limit)));
  console.log(offset);
  console.log(offset + limit);
});

/**
 *
 */

router.post("/create", function (req, res, next) {
  // const author = req.body.author;
  const date = Date.now();
  const title = req.body.title;
  const image = req.body.image;
  const content = req.body.content;
  const category = req.body.category;

  const articles = getArticles();
  const id = Math.random().toString(36).substring(7) + new Date().getTime();

  articles.push({
    id,
    // author,
    category,
    date,
    title,
    image,
    content
  });

  setArticles(articles);

  res.json({ success: true, id });
  res.status(201);
});

/**
 *
 */
router.delete("/delete", function (req, res, next) {
  const id = req.body.id;
  console.log(id);

  const articles = getArticles().filter(article => article.id != id);
  console.log(articles);
  setArticles(articles);

  res.json({ success: true });
});

/**
 *
 */
router.put("/update", function (req, res, next) {
  const id = req.body.id;
  const category = req.body.id;
  // const author = req.body.author;
  const date = Date.now();
  const title = req.body.title;
  const image = req.body.image;
  const content = req.body.content;

  const articles = getArticles();

  const article = articles.find(article => article.id == id);
  if (article) {
    // article.author = author;
    article.date = date;
    article.category = category;
    article.title = title;
    article.image = image;
    article.content = content;
  }

  setArticles(articles);

  res.json({ success: true });
});

function getArticles() {
  const content = fs.readFileSync(DATA_PATH);
  return JSON.parse(content);
}

function setArticles(articles) {
  const content = JSON.stringify(articles, null, 2);
  fs.writeFileSync(DATA_PATH, content);
}

module.exports = router;
