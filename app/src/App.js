import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Line} from 'react-chartjs-2';

import logo from './assets/mainlogo.svg';
import worldnews from './assets/buttonredditworldnews.svg'
import defaultimg from './assets/defaultnewscard.jpg'
import linkicon from './assets/linkbuttonicon.svg'
import rise from './assets/greenrise.svg'
import fall from './assets/redfall.svg'
import tube from './assets/testTube.svg'
import ad from './assets/bannerad.svg'
import chart from './assets/chartforabout.svg'


import Axios from 'axios';

import news from './news.json';
import './App.css';

const tweet_data = [
  { tweet: "♨ 'They'll kill me if they find me' #News #Hello #Politics #Opinion #Business #Sports #World #Today https://t.co/Tvth7ErOj8",
sentiment: "Negative"},{
tweet: "♨ 🔥 Take me back to 2006 #News #Hello #Politics #Opinion #Business #Sports #World #Today https://t.co/rhkqiS3jr2",
sentiment: "Negative"},{
tweet: "♨ Police are tracking you and your license plates #News #Hello #Politics #Opinion #Business #Sports #World #Today https://t.co/yHYot4VRAQ",
sentiment: "Negative"},{
tweet: "RT @celebritykimdot: ♨ Student cleared of murdering her disabled mum and leaving body to rot now runs fetish website #News #Hello #Politics…",
sentiment: "Negative"},{
tweet: "♨ Student cleared of murdering her disabled mum and leaving body to rot now runs fetish website #News #Hello… https://t.co/KTbEaq9Wdq",
sentiment: "Negative"},{
tweet: "♨ Truck driver: Government decides when I work, eat and sleep #News #Hello #Politics #Opinion #Business #Sports… https://t.co/fdqTMkT7rH",
sentiment: "Negative"},{
tweet: "♨ 🔥 The apple and fork game #News #Hello #Politics #Opinion #Business #Sports #World #Today https://t.co/hxq6zh9wtJ",
sentiment: "Negative"},{
tweet: "♨ Saudis 'had access' to Amazon CEO Jeff Bezos' phone: investigator | USA News #News #Hello #Politics #Opinion… https://t.co/1C5DFTZhNq",
sentiment: "Negative"},{
tweet: "♨ Rare look at Myanmar military celebrations - #News #Hello #Politics #Opinion #Business #Sports #World #Today https://t.co/stqKJuuzJ0",
sentiment: "Positive"},{
tweet: "♨ 🔥 Not all heros wear capes #News #Hello #Politics #Opinion #Business #Sports #World #Today https://t.co/i42N8zIqsr",
sentiment: "Negative"}
]

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
              }
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
        <LiveTweets />
        <About />
        <div style={{ marginLeft:'-200px', paddingTop: '100px', width: '60%', margin: '0 auto' }}>
        <hr style={{marginBottom: "5vh"}}/>
          <div style={{fontWeight: 600, marginBottom: 40}} className="dirtext">Rationale and Technical Specs</div>
            <img src={chart} height="400" style={{paddingBottom: "5vh"}}/>
          <p id="aboutText" style={{ width: '100%', textAlign: 'justify', marginLeft: '-30px' }}>
          We built a tool to make stock predictions using Reddit and Twitter data. We believe that using non conventional data (such as Twitter and Reddit) can give traders an edge when it comes to predicting the stock market. The two tools can be easily integrated with the traders terminal or used through our web app.
          
          <br /><br />
          Reddit stock prediction:
          Many traders used Reddit in their spare time. So we thought of analysing Reddit’s world news data to predict the outcome of DJIA (Dow Jones Index Average). We try two methods of prediction: news to predict whether open > close using news on the day and using news from the previous days to predict the outcome (open > close) on the next day.
          To accomplish this we build a neural network model using the state of the art LSTM (Long Short Term Memory). Recent research shows that LSTM works best with textual and sequential data. We trained our LSTM based on dataset by Sun, J, 2016, which contains Reddit world news data over a period of 8 years starting in 2008 and DJIA score. The score is 0 if opening is lower than closing, 1 if it is equal to or higher. Our best model predicts the DJIA score using the data from the day before to predict the outcome of DJIA in the following day.
          
          <br /><br />
          Twitter Sentiment analysis stock prediction:
          Many traders are avid Twitter users. Therefore it might be useful to find out what people are thinking about certain topics in real time. With this, traders could find recent sentiments on a certain topic, which may influence stock prices. To build this tool, we used the Twitter API along with Google Cloud sentiment analysis under their NLP service.
          </p>
        </div>
        <Banner />
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
	      <Navlink labels={['Using alternative data to predict stock prices.']} />
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
  <div id="direction"><p className="dirtext">Based on today's news and historical data, the Dow index is likely to <img src={rise} alt="rise" height="50px" id="dirbutton"/></p></div>
  )
}

const About = (props) => {
  return (
    <div id="aboutcontainer">
      <div id="about">
        <img id="testTube" src={tube} />
        <div id="textbox">
          <p id="aboutText">
            Indicat analyses unorthodox alternative data sources in order to predict whether the price of the Dow Jones Index will increase or decrease using machine learning.
            <br /><br />
            In the future, we plan to include a multitude of uncorrelated factors and variables into the model including sentiment analysis and Google search trends. What you see here is a proof of concept: we have analysed the top news stories from r/worldnews on Reddit.
            <br /><br />
            The Reddit news stories are run through our ML models to come up with a binary price movement (rise/fall) prediction that approaches 60% accuracy.
            <br /><br />
            Our goal was to get as far over the 50% mark as possible. In aggregate even 51% has the potential for serious profit if enough volume is used, so the fact that we managed to reach almost 60% has some serious potential.
          </p>
        </div>
      </div>
    </div>
  )
}


class LiveTweets extends Component {
  state = {
    tweets: [],
    hashtag: '',
    loading: false,
  }

  getTweets = async () => {
    // const hashtag = this.state.hashtag;
    await this.setState({ loading: true });
    await this.setState({ tweets: tweet_data });
    await this.setState({ loading: false });
  }

  render() {
    return <div>
    <div className="dirtext" style={{fontWeight: 600}}>Find the sentiment of a hashtag:</div><div className="inputstuff">
      <input className="input" type="text" onChange={e => this.setState({ hashtag: e.target.value })} />
      <button style={{fontSize: "2em",color: "white", background: "black", borderRadius: "15px", marginTop: "10px", cursor: "pointer"}} onClick={this.getTweets}>Get Tweets</button>
      </div>
      <div className="tweetbox">
      { 
        this.state.tweets.map(t => {
          return <div className="tweet" id={t.score > 0 ? 'Positive' : 'Negative'}>
            <div>Tweet: "{t.tweet}"</div>
            <div>Sentiment: {t.score > 0 ? 'Positive' : 'Negative'}</div>
          </div>
        })
      }
      {
        this.state.loading && <div>Fetching tweets...</div>
      }
      </div>
    </div>
  }
}

const Banner = (props) => {
  return (
    <div><img id="ad" src={ad} /></div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App;
