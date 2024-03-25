var express = require("express");
var router = express.Router();
var fs = require("fs");

const DATA_PATH = "data/authors.json";

/**
 *
 */

router.get("/", function (req, res, next) {
  console.log("reading file %o", DATA_PATH);
  const teams = getAuthors();
  res.json(teams);
});

/**
 *
 */
router.post("/create", function (req, res, next) {
  const name = req.body.name;
  const about_text_card = req.body.about_text_card;
  const about_text_article = req.body.about_text_article;
  const articles = [];
  const skills = req.body.skills;

  const authors = getAuthors();
  const id = Math.random().toString(36).substring(7) + new Date().getTime();

  authors.push({
    id,
    name,
    about_text_card,
    about_text_article,
    articles,
    skills
  });

  setAuthors(authors);

  res.json({ success: true, id });
  res.status(201);
});

/**
 *
 */
router.delete("/delete", function (req, res, next) {
  const id = req.body.id;

  const articles = getAuthors().filter(article => article.id != id);

  setAuthors(articles);

  res.json({ success: true });
});

/**
 *
 */
router.put("/update", function (req, res, next) {
  const id = req.body.id;
  const name = req.body.name;
  const about_text_card = req.body.about_text_card;
  const about_text_article = req.body.about_text_article;
  const articles = req.body.articles;
  const skills = req.body.skills;

  const authors = getAuthors();

  const author = authors.find(author => author.id == id);
  if (author) {
    author.name = name;
    author.date = date;
    author.about_text_card = about_text_card;
    author.about_text_article = about_text_article;
    author.articles = articles;
    author.skills = skills;
  }

  setAuthors(authors);

  res.json({ success: true });
});

function getAuthors() {
  const content = fs.readFileSync(DATA_PATH);
  return JSON.parse(content);
}

function setAuthors(articles) {
  const content = JSON.stringify(articles, null, 2);
  fs.writeFileSync(DATA_PATH, content);
}

module.exports = router;
