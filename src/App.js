import React from 'react';
import './App.css';

const initialState = {
  minutes: 25,
  seconds: 0,
  sesLength: 25,
  breakLength: 5,
  buttonStyle: "fas fa-play buttons",
  display: "Session",
  timer: false,
  timerStyle: {
    fontFamily: "digital-7",
    fontSize: '70px',
    margin: '0',
    color: 'antiquewhite'
  },
  audio: document.getElementById('beep')
};



class App extends React.Component {
    constructor(){
      super();
      this.state=initialState;
      this.handlePlayPause=this.handlePlayPause.bind(this);
      this.handleSesInc=this.handleSesInc.bind(this);
      this.handleSesDec=this.handleSesDec.bind(this);
      this.handleBrInc=this.handleBrInc.bind(this);
      this.handleBrDec=this.handleBrDec.bind(this);
      this.zeroAdder=this.zeroAdder.bind(this);
      this.handleReset=this.handleReset.bind(this);
      this.timer=this.timer.bind(this);
      this.timerLogic=this.timerLogic.bind(this);
      this.beepAudio=this.beepAudio.bind(this);
    }

    timer(){
      if (this.state.timer){
        this.timerID = setInterval(() => this.setState((prevState)=>this.timerLogic(prevState)), 1000)
      }
      else{
        clearInterval(this.timerID);
      }
    }
    timerLogic(obj) {
      if (obj.seconds > 0){
        return {seconds: obj.seconds-1}
      }
      if (obj.seconds === 0 && obj.minutes > 1){
        return {
          minutes: obj.minutes-1,
          seconds: 59
        }
      }else if(obj.seconds === 0 && obj.minutes === 1){
        return {
          timerStyle: {
            fontFamily: "digital-7",
            fontSize: '70px',
            margin: '0',
            color: 'red'
          },
          minutes: obj.minutes-1,
          seconds: 59
        }
      }else{
        this.beepAudio();
        return (
          obj.display === "Session" ?
          {
            timerStyle: {
              fontFamily: "digital-7",
              fontSize: '70px',
              margin: '0',
              color: 'antiquewhite'
            },
            display: "Break",
            minutes: obj.breakLength,
            seconds: 0
          }:{
            timerStyle: {
              fontFamily: "digital-7",
              fontSize: '70px',
              margin: '0',
              color: 'antiquewhite'
            },
            display: "Session",
            minutes: obj.breakLength,
            seconds: 0
          }
        )
      }
    }
    handleReset(){
      this.setState(()=>initialState, ()=>this.timer(), this.beepAudio('stop'))
    }
    handlePlayPause(){
      this.setState((function (prevState) {
        return (
          !prevState.timer ? {
            buttonStyle: "fas fa-pause buttons",
            timer: true
        } : {
          buttonStyle: "fas fa-play buttons",
          timer: false
        }
      ) 
      }), () => this.timer());
    }
    handleSesInc(){
      if (this.state.timer === false && this.state.sesLength < 60){
        this.setState(function (prevState) {
          return (
            this.state.display === 'Session' ? {
            sesLength: prevState.sesLength+1,
            minutes: prevState.sesLength+1,
            seconds: 0
            }:{
              sesLength: prevState.sesLength+1
            }
          )
        });
      }
    }
    handleSesDec(){
      if (this.state.timer === false && this.state.sesLength > 1){
        this.setState(function (prevState) {
          return (
            this.state.display === 'Session' ? {
            sesLength: prevState.sesLength-1,
            minutes: prevState.sesLength-1,
            seconds: 0
            }:{
              sesLength: prevState.sesLength-1
            }
          )
        });
      }
    }
    handleBrInc(){
      if (this.state.timer === false && this.state.breakLength < 60){
        this.setState(function (prevState) {
          return (
            this.state.display === 'Break' ? {
            breakLength: prevState.breakLength+1,
            minutes: prevState.breakLength+1,
            seconds: 0
            }:{
              breakLength: prevState.breakLength+1
            }
          )
        });
      }
    }
    handleBrDec(){
      if (this.state.timer === false && this.state.breakLength > 1){
        this.setState(function (prevState) {
          return (
            this.state.display === 'Break' ? {
            breakLength: prevState.breakLength-1,
            minutes: prevState.breakLength-1,
            seconds: 0
            }:{
              breakLength: prevState.breakLength-1
            }
          )
        });
      }
    };
    zeroAdder(num){
      return(
        num >= 0 && num <=9 ? '0'+String(num) : num
      )};
    beepAudio(active = 'play'){
      let audio = document.getElementById('beep');
      if (active === 'play'){
        audio.play();
        setTimeout(() => audio.pause(), 2000);
      }else if(active === 'stop'){
        audio.pause();
      }
      audio.currentTime = 0;
    }

  render() {
    return (
      <div className="App">
        <div className='timerBody'>
    <h1 className='label'>Mega Timer</h1>
          <div className='break'>
            <h2 id='break-label'>Break Length</h2>
            <div className='sectorsButtons'>
            <i id='break-increment' className="fas fa-angle-double-up signs" onClick={this.handleBrInc}></i>
              <p id='break-length'>{this.state.breakLength}</p>
              <i id='break-decrement' className="fas fa-angle-double-down signs" onClick={this.handleBrDec}></i>
            </div>
          </div>
          <div className='session'>
            <h2 id='session-label'>Session Length</h2>
            <div className='sectorsButtons'>
              <i id='session-increment' className="fas fa-angle-double-up signs" onClick={this.handleSesInc}></i>
              <p id='session-length'> {this.state.sesLength} </p>
              <i id='session-decrement' className="fas fa-angle-double-down signs" onClick={this.handleSesDec}></i>
            </div>
          </div>
          <div className='timer'>
            <div className='timer-container'>
              <h2 id='timer-label'>{this.state.display}</h2>
              <p id='time-left' style={this.state.timerStyle}>{this.zeroAdder(this.state.minutes)}:{this.zeroAdder(this.state.seconds)}</p>
              <audio id='beep' preload="auto" src={require('./media/beep.mp3')}></audio>
            </div>
          </div>
          <div id="button-container">
          <i id="start_stop" className={this.state.buttonStyle} onClick={this.handlePlayPause}></i>
          <i id='reset' className="fas fa-sync buttons" onClick={this.handleReset}></i>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
