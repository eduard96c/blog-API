var express = require("express");
var router = express.Router();
var fs = require("fs");

const DATA_PATH = "data/comments.json";

/**
 *
 */

router.get("/", function (req, res, next) {
  console.log("reading file %o", DATA_PATH);
  const teams = getComments();
  res.json(teams);
});

/**
 *
 */
router.post("/create", function (req, res, next) {
  const name = req.body.name;
  const date = req.body.date;
  const email = req.body.email;
  const content = req.body.content;

  const comments = getComments();
  const id = Math.random().toString(36).substring(7) + new Date().getTime();

  comments.push({
    id,
    name,
    date,
    email,
    content
  });

  setComments(comments);

  res.json({ success: true, id });
  res.status(201);
});

/**
 *
 */
router.delete("/delete", function (req, res, next) {
  const id = req.body.id;

  const comments = getComments().filter(comment => comment.id != id);

  setComments(comments);

  res.json({ success: true });
});

/**
 *
 */
router.put("/update", function (req, res, next) {
  const id = req.body.id;
  const name = req.body.name;
  const date = req.body.date;
  const email = req.body.email;
  const content = req.body.content;

  const comments = getComments();

  const comment = comments.find(comment => comment.id == id);
  if (comment) {
    comment.name = name;
    comment.date = date;
    comment.email = email;
    comment.content = content;
  }

  setComments(comments);

  res.json({ success: true });
});

function getComments() {
  const content = fs.readFileSync(DATA_PATH);
  return JSON.parse(content);
}

function setComments(articles) {
  const content = JSON.stringify(articles, null, 2);
  fs.writeFileSync(DATA_PATH, content);
}

module.exports = router;
