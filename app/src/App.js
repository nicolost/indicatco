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
  constructor(props){
    super(props)
    this.state={
      data: {},
      times: [],
      close: []
    }
  }

  async componentDidMount(){
    let reqData;
    const resp = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=DJI&outputsize=compact&apikey=CIJ11HX73V8AQ447&datatype=json")
    const res = await resp.json()

    reqData = res

    this.setState({data: reqData});
    console.table(this.state);

    let dates = [];
    let close = []
    console.log(reqData["Time Series (Daily)"])
    Object.keys(reqData["Time Series (Daily)"]).forEach(t => {
      dates.unshift(t)
      close.unshift(reqData["Time Series (Daily)"][t]["5. adjusted close"])
    })
    this.setState({
      times: dates,
      close: close
    })
  }
  render() {
    // console.table(this.state)

    // const data2 = [
    //   {title: "title", url: "bbc.co.uk/somenews", img: "https://i.guim.co.uk/img/media/94ff5cb8cd7b9f3e2b4563c10d6885b49411a841/0_0_5087_3053/master/5087.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdG8tZGVmYXVsdC5wbmc&s=17e3fcec75a618fda11c86f8f3b5f2b7"},
    //   {title: "title", url: "bbc.co.uk/somemorenews", img: "https://i.guim.co.uk/img/media/94ff5cb8cd7b9f3e2b4563c10d6885b49411a841/0_0_5087_3053/master/5087.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdG8tZGVmYXVsdC5wbmc&s=17e3fcec75a618fda11c86f8f3b5f2b7"},
    //   {title: "title", url: "bbc.co.uk/evenmorenews", img: "https://i.guim.co.uk/img/media/94ff5cb8cd7b9f3e2b4563c10d6885b49411a841/0_0_5087_3053/master/5087.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdG8tZGVmYXVsdC5wbmc&s=17e3fcec75a618fda11c86f8f3b5f2b7"},
    //   {title: "title", url: "bbc.co.uk/brexitnews", img: ""},
    //   {title: "title", url: "bbc.co.uk/trumpnews", img: ""}
    // ]
    
    let chartData = {labels: this.state.times,
        datasets: [
          {
          borderColor: "#0BA101",
          backgroundColor: "white",
          borderWidth: 5,
          data: this.state.close,
          }
        ]
      };
      let chartOptions = {
        legend: {
            display: false
         },
          scales: {
            xAxes: [{
              gridLines: {
                drawOnChartArea: false, //disable lines on the chart area inside the axis lines
                drawBorder: false, //disable border at the edge between the axis and the chart area
                drawTicks: false, //disable lines beside the ticks in the axis area beside the chart.
                zeroLineWidth: 0, //zero width of the grid line for the first index (index 0).
                display: false
              },
            }],
            yAxes: [{
              gridLines: {
                drawOnChartArea: false, //disable lines on the chart area inside the axis lines
                drawBorder: false, //disable border at the edge between the axis and the chart area
                drawTicks: false, //disable lines beside the ticks in the axis area beside the chart.
                zeroLineWidth: 0, //zero width of the grid line for the first index (index 0).
                display: false
              },
            }]
          }};
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
          <div id="line"><Line data={chartData} options={chartOptions} width={150} height={75}/></div>

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
  <div id="direction"><p className="dirtext">Based on recent news and historical data, our model predicts the Dow index will <img src={rise} alt="rise" height="50px" id="dirbutton"/></p></div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App;
