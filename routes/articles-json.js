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
  const category = req.query.category;

  let is_last = false;
  let result_articles = [];

  const articles = getArticles();
  //selectam articole dupa o categorie
  if (category) {
    var filtred_articles = articles.filter(article => article.category == category);
    result_articles = filtred_articles.slice(offset, parseInt(offset) + parseInt(limit));
    if (parseInt(offset) === 0) {
      result_articles.push(filtred_articles[filtred_articles.length - 1]);
    }

    //verificam daca am ajuns la capat
    if (parseInt(offset) + parseInt(limit) >= filtred_articles.length - 1) {
      is_last = true;
    }
  } else {
    //selectam toate articolele
    result_articles = articles.slice(offset, parseInt(offset) + parseInt(limit));
    //daca offset == 0 aducem si ultimul articol
    if (parseInt(offset) === 0) {
      result_articles.push(articles[articles.length - 1]);
      console.log(articles[articles.length - 1]);
    }

    //verificam daca am ajuns la capat
    if (parseInt(offset) + parseInt(limit) >= articles.length - 1) {
      is_last = true;
    }
    console.log(offset);
    console.log(articles.length);
  }

  res.json({ articles: result_articles, is_last: is_last });
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
  const category = req.body.category;
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
