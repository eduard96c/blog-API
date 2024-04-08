# Blog-API

Node JS CRUD API For [blog](https://eduard96c.github.io/blog/)

## Install

```
git clone https://github.com/eduard96c/blog.git
npm install
```

## Usage

npm start

## Storing datas as JSON

Article data is stored inside data/articles-json.json

```
//GET All articles
fetch("http://localhost:3000/articles-json", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
});

//GET articles with a limit and a offset
//this will return 2 articles starting with the first one
fetch("http://localhost:3000/articles-json?limit=2&offset=0", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
});


// POST create articles
fetch("http://localhost:3000/create-json/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    category: "category-name-here",
    title: "This is an article title",
    date: "14489494",  // as time stamp
    image: "/path/to/image",  // image to be dispalyed on main page
    content: "content text will go here"
  })
});

// DELETE an article by id
fetch("http://localhost:3000/articles-json/delete", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ id: "fedcba1610309909431" })
});

// PUT update articles
fetch("http://localhost:3000/articles-json/update", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    id: "fedcba1610310163146",
    category: "category-name-here",
    title: "This is an article title",
    date: "14489494",  // as time stamp
    image: "/path/to/image",  // image to be dispalyed on main page
    content: "content text will go here"
  })
});
```
