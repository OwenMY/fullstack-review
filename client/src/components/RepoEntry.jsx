import React from 'react';

const RepoEntry = function({repo}) {
  return (
    <ul>
      <li><a href={`https://github.com/${repo.owner}/${repo.name}`} >{repo.name}</a></li>
      <li>Creator: {repo.owner}</li>
      <li>Forks: {repo.forks_count}</li>
    </ul>
  )
}

export default RepoEntry;