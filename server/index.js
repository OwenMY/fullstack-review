const {getReposByUsername} = require('../helpers/github.js');
const {save, getTop25} = require('../database/index.js');
const express = require('express');
let app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  getReposByUsername(req.body.search)
  .then((response) => save(response.data, (err, repos) => {
    if (err) {
      res.sendStatus(500)
    } else {
      let result = [];
      let sortedRepos = repos.sort((a, b) => (a.forks_count < b.forks_count) ? 1 : -1 );
      let i = 0;
      while (i < 25) {
        (sortedRepos[i]) ? result.push(sortedRepos[i]) : undefined;
        i++
      }
      res.send(result)
    }
  }))
  .catch((error) => console.error('This is line 20 of github.js:', error))
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  getTop25((err, repos) => {
    if (err) {
      console.error('Failed to get all repos from mongoose, line 56:', err);
    } else {
      let result = [];
      let sortedRepos = repos.sort((a, b) => (a.forks_count < b.forks_count) ? 1 : -1 );
      let i = 0;
      while (i < 25) {
        (sortedRepos[i]) ? result.push(sortedRepos[i]) : undefined;
        i++
      }
      res.send(result)
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

