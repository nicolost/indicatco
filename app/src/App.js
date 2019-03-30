import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './assets/mainlogo.svg';
import worldnews from './assets/buttonredditworldnews.svg'
import img from './assets/defaultnewscard.jpg'
import linkicon from './assets/linkbuttonicon.svg'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Navbar />
        <div id="worldnewsdiv"><a href="https://reddit.com/r/worldnews"><img id="worldnews" src={worldnews} /></a>
        <Newscard />
        </div>
      </div>
    );
  }
}

class Navbar extends Component {
  render() {
    return (
	  <div className="Navbar">
	    <div className="Navbar-Top">
	      <img id="logo" src={logo} alt="img" />
	    </div>
	    <div className="Navbar-Bottom">
	      <Navlink labels={['Twitter Analysis', 'Reddit Analysis', 'About']} />
	    </div>
	  </div>
	);
  }
}

const Navlink = (props) => {
  return (
    <div className="Navlink">
      {
        props.labels.map((l,i) => <div><a id={i} href="#">{l}</a></div>)
      }
    </div>
  )
}

function trunc(str, n){
  if(str.length > n){
    str = str.substring(0,n) + "...";
  }
  return str;
}

const Newscard = (props) => {
  let title = "French healthcare system 'should not fund homeopathy' - French medical and drug experts say homeopathic medicines should no longer be paid for by the country’s health system because there is no evidence they work."
  let url = "theguardian.com/lifeandstyle/2019/mar/29/homeopathy-french-healthcare-system";
  title = trunc(title, 70);
  url = trunc(url, 20); url = url.substring(url.includes("ww") ? url.indexOf(".")+1 : 0,);
  return (
    <div id="box">
      <img id="newsimg" src={img} />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '85%' }}>
          <div id="title"><p class="title">{title}</p></div>
          <div id="url"><p class="url">{url}</p></div>
        </div>
          <div style={{ width: '5%' }}><img id="linkicon" src={linkicon} /></div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App;
