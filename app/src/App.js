import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import s from './assets/mainlogo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Navbar />
      </div>
    );
  }
}

class Navbar extends Component {
  render() {
    return (
	  <div className="Navbar">
	    <div className="Navbar-Top">
	      <img id="logo" src={s} alt="img" />
	    </div>
	    <div className="Navbar-Bottom">
	      <Navlink labels={['test1', 'test2']} />
	    </div>
	  </div>
	);
  }
}

const Navlink = (props) => {
  return (
    <div className="Navlink">
      {
        props.labels.map((l,i) => <a id={i} href="#">{l}</a>)
      }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App;
