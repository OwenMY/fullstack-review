import React from 'react';
import RepoEntry from './RepoEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    These are the top {props.repos.length} most forked repos.
    <div>{
      props.repos.map((repo, key) => <RepoEntry repo={repo} key={key}/>)
    }</div>
  </div>
)

export default RepoList;