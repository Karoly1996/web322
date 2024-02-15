/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Karoly Nemeth Student ID: 021949144 Date: Sat feb 3
*
********************************************************************************/

const legoData = require("./modules/legoSets");
const express = require('express');
const path = require('path');

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'));

legoData.initialize()
  .then(() => {
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '/views/home.html'));
    });

    app.get('/about', (req, res) => {
      res.sendFile(path.join(__dirname, '/views/about.html'));
    });

    app.get('/lego/sets', (req, res) => {
      const theme = req.query.theme;

      if (theme) {
        legoData.getSetsByTheme(theme).then((data) => {
          res.json(data);
        }).catch((err) => {
          res.status(404).send(`404 - ${err}`)
        });
      } else {
        legoData.getAllSets().then((data) => {
          res.json(data);
        }).catch((err) => {
          res.status(404).send(`404 - ${err}`)
        });
      }
    });

    app.get('/lego/sets/:id', (req, res) => {
      const setNum = req.params.id;
  
      legoData.getSetByNum(setNum).then((data) => {
        res.json(data);
      }).catch((err) => {
        res.status(404).send(`404 - ${err}`)
      });
    });

  app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
  });

  app.listen(HTTP_PORT, () => {
    console.log(`Server is listening at http://localhost:${HTTP_PORT}`);
  });
  })
  .catch(error => {
  console.error('Error initializing Lego data:', error);
  });