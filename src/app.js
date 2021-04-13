const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 8000;

const staticPath = path.join(__dirname, "../public")
const temp_path = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

app.set("view engine", 'hbs')
app.set('views', temp_path);

hbs.registerPartials(partialPath);

app.use(express.static(staticPath))

app.get('', (req, res) => {
  res.render("index");
});

app.get('/about', (req, res) => {
  res.render("about");
});

app.get('/weather', (req, res) => {
  res.render("weather");
});

app.get('*', (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log("Listening");
})
