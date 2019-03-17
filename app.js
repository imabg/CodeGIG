const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = require('./util/database');
const Gigs = require('./model/Codegig');

const app = express();

const Op = Sequelize.Op;

app.set('view engine', 'ejs');
app.set('views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// HOME
app.get('/', (req, res, next) => {
  res.render('SearchPage', { pageTitle: 'CodeGIG' });
});

// ADD New GIG
app.get('/add', (req, res, next) => {
  res.render('AddGIG', { pageTitle: 'ADD GIG!' });
});

// SEARCH
app.post('/search', (req, res, next) => {
  let search = req.body.search;
  Gigs.findAll({ where: { technologies: { [Op.like]: '%' + search + '%' } } })
    .then(result => {
      res.render('AllGIG', { pageTitle: 'Search...', gigs: result });
    })
    .catch(err => console.log(err));
});

// SAVING GIG's to DB
app.post('/save', (req, res, next) => {
  const gigname = req.body.gigname;
  const technologies = req.body.technologies;
  const budget = req.body.budget;
  const body = req.body.body;
  const email = req.body.email;

  Gigs.create({
    gigname: gigname,
    technologies: technologies,
    budget: budget,
    description: body,
    contactEmail: email
  })
    .then(result => {
      console.log('Record Created Successfully');
    })
    .catch(err => console.log(err));
  res.redirect('/');
});

// ALL GIG's

app.get('/all', (req, res, next) => {
  Gigs.findAll()
    .then(result => {
      res.render('AllGIG', {
        pageTitle: "ALL GIG's",
        gigs: result
      });
    })
    .catch(err => console.log(err));
});

// DB Configuration
sequelize
  .sync()
  .then(() => {
    app.listen(8080);
  })
  .catch(err => console.log(err));
