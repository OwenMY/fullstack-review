const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let repoSchema = mongoose.Schema({
  name: String,
  owner: String,
  url: String,
  forks_count: Number
});

//Top most forked repos

let Repo = mongoose.model('Repo', repoSchema);


let save = (data, callback) => {
  let formattedData = data.map((repo) => {
    let data = {
      name: repo.name,
      owner: repo.owner.login,
      url: repo.html_url,
      forks_count: repo.forks_count
    }
    return data;
  });

  let username = data[0].owner.login;
  return Repo.find({ owner: username }, (err, repos) => {
    if (err) {
      console.error('Failed to find docs at line 37:', err);
    } else {
      if (repos.length === 0) {
        formattedData.forEach((repo) => {
          let someRepo = new Repo(repo)
          console.log(someRepo.name)
          someRepo.save();
        })
      }

      return Repo.find({}, callback);
    }
  })

  //This is to delete repos...
  // Repo.deleteMany({ name: 'poop'}).then(function(data){ console.log(data) }).catch(function(error) { console.log(error)})

  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
};

const getTop25 = function(callback) {
 return Repo.find({},callback);
}

module.exports.getTop25 = getTop25;
module.exports.save = save;