function getRepositories() {
  const req = new XMLHttpRequest;
  req.addEventListener('load', showRepos)
  req.open("GET", 'https://api.github.com/users/mattebru/repos');
  req.send();
}

function showRepos(event, data) {
  let repos = JSON.parse(this.responseText)
  console.log(repos);
  let repoList = "<ul>"
  repoList += repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')
  repoList += "</ul>"
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", 'https://api.github.com/repos/mattebru/' + name + '/commits')
  req.send()
}

function showCommits() {
  const commits = JSON.parse(this.responseText)
  console.log(commits);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}

// function showCommits(event, data) {
//   let commits = JSON.parse(this.responseText)
//   console.log(commits);
//   let comList = "<ul>"
//   comList += commits.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')
//   comList += "</ul>"
//   document.getElementById("repositories").innerHTML = comList
// }
