import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    axios.post('http://localhost:1128/repos', {
        search: term
      })
      .then((response) => this.setState({ repos: response.data }))
      .catch((error) => console.error(error) )
  }

  componentDidMount() {
    axios.get('http://localhost:1128/repos')
    .then((response) => { this.setState({ repos: response.data })})
    .catch((err) => console.error(err))
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));