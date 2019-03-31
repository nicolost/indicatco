import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Line} from 'react-chartjs-2';

import logo from './assets/mainlogo.svg';
import worldnews from './assets/buttonredditworldnews.svg'
import defaultimg from './assets/defaultnewscard.jpg'
import linkicon from './assets/linkbuttonicon.svg'
import rise from './assets/greenrise.svg'
import fall from './assets/redfall.svg'

import news from './news.json';
import './App.css';

console.log(news);
let data = news.titles.map((d, i) => ({ title: d.title, url: d.url, img: news.imgs[i] }))

class App extends Component {
  componentDidMount(){

  }
  render() {
    const data2 = [
      {title: "title", url: "bbc.co.uk/somenews", img: "https://i.guim.co.uk/img/media/94ff5cb8cd7b9f3e2b4563c10d6885b49411a841/0_0_5087_3053/master/5087.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdG8tZGVmYXVsdC5wbmc&s=17e3fcec75a618fda11c86f8f3b5f2b7"},
      {title: "title", url: "bbc.co.uk/somemorenews", img: "https://i.guim.co.uk/img/media/94ff5cb8cd7b9f3e2b4563c10d6885b49411a841/0_0_5087_3053/master/5087.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdG8tZGVmYXVsdC5wbmc&s=17e3fcec75a618fda11c86f8f3b5f2b7"},
      {title: "title", url: "bbc.co.uk/evenmorenews", img: "https://i.guim.co.uk/img/media/94ff5cb8cd7b9f3e2b4563c10d6885b49411a841/0_0_5087_3053/master/5087.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdG8tZGVmYXVsdC5wbmc&s=17e3fcec75a618fda11c86f8f3b5f2b7"},
      {title: "title", url: "bbc.co.uk/brexitnews", img: ""},
      {title: "title", url: "bbc.co.uk/trumpnews", img: ""}
    ]
    let chartData = {labels: [1,2,3,4,5,6,7],
        datasets: [
          {
          borderColor: '#25297C',
          backgroundColor: '#FFFFFF',
          borderWidth: 5,
          data: [0, 10, 5, 2, 20, 30, 45],
          }
        ]
      },
      options = {
      scales: {
       xAxes: [{
           barPercentage: 0.5,
           barThickness: 6,
           maxBarThickness: 8,
           minBarLength: 2,
           gridLines: {
               offsetGridLines: true
           }
       }]
     }
      };
    return (
      <div className="App">
      	<Navbar />
        <a href="https://reddit.com/r/worldnews"><img id="worldnews" src={worldnews} /></a>
        <div id="worldnewsdiv">
          {
            data.map((l,i) => <Newscard title={l.title} url={l.url} img={l.img} />)
          }
          </div>
        <Direction />
          <div id="line"><Line data={chartData} width={150} height={75}/></div>

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
  let title = props.title;
  let url = props.url;
  let img = defaultimg;
  if(props.img != ""){
    img = props.img
  }
  title = trunc(title, 55);
  let urlclip = url.replace("https://", "");
  urlclip = urlclip.replace("http://", "");
  urlclip = trunc(urlclip, 25); urlclip = urlclip.substring(urlclip.includes("ww") ? urlclip.indexOf(".")+1 : 0,);
  return (
    <div id="box">
      <a href={url}><img id="newsimg" src={img} /></a>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '85%' }}>
          <a href={url}><div id="title"><p className="title">{title}</p></div></a>
          <a href={url}><div id="subtitle"><p className="subtitle">{urlclip}</p></div></a>
        </div>
          <div><a id="linkicon" href={url}></a></div>
      </div>
    </div>
  )
}

const Direction = (props) => {
  return (
  <div id="direction"><p class="dirtext">Based on today's news and historical data, the Dow index might <img src={rise} alt="rise" height="50px" id="dirbutton"/></p></div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App;
