import React, { Component } from 'react';
import './App.css';
var uuid = require('uuid');
var firebase = require('firebase');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA5BKXEcD94fZtwf8Mmsfki6g8yIeS_Yhc",
  authDomain: "simplesurvey-jacob.firebaseapp.com",
  databaseURL: "https://simplesurvey-jacob.firebaseio.com",
  projectId: "simplesurvey-jacob",
  storageBucket: "simplesurvey-jacob.appspot.com",
  messagingSenderId: "184049507360"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        id:uuid.v1(),
        name:'',
        answers: {
          q1:'',
          q2:'',
          q3:'',
          q4:''
        },
        submitted: false
      }

      this.handleQuestionChange = this.handleQuestionChange.bind(this);
    }

    handleNameSubmit(event){
      var name= this.refs.name.value;
      this.setState({name:name}, function(){
        console.log(this.state);
      });      
      event.preventDefault();
    }

    handleQuestionSubmit(event){
      console.log('Questions submitting...');
      firebase.database().ref('surveys/'+this.state.id).set({
        name: this.state.name,
        answers:this.state.answers
      });

      this.setState({submitted:true}, function(){
        console.log('Questions submitted');
      });
      event.preventDefault();
    }

    handleQuestionChange(event){
      let answers = this.state.answers;
      if(event.target.name === 'q1'){
        answers.q1 = event.target.value;
      } else if(event.target.name === 'q2'){
        answers.q2 = event.target.value;
      } else if(event.target.name === 'q3'){
        answers.q3 = event.target.value;
      } else if(event.target.name === 'q4'){
        answers.q4 = event.target.value;
      }

      this.setState({answers:answers},function(){
        console.log(this.state);
      });
    }


  render() {3
    let user;
    let questions;
    if(this.state.name && this.state.submitted === false){
      user = <h2>Welcome, {this.state.name}</h2>
      questions = <span>
        <h3>Survey Questions</h3>
        <form onSubmit={this.handleQuestionSubmit.bind(this)}>
          <div>
            <label>What is your favorite OS?</label><br />
            <input type="radio" name="q1" value="Windows" onChange={this.handleQuestionChange} />Windows<br />
            <input type="radio" name="q1" value="OSX" onChange={this.handleQuestionChange} />OSX<br />
            <input type="radio" name="q1" value="Linux" onChange={this.handleQuestionChange} />Linux<br />
            <input type="radio" name="q1" value="Solaris" onChange={this.handleQuestionChange} />Solaris<br />
            <input type="radio" name="q1" value="Other" onChange={this.handleQuestionChange} />Other<br />
          </div>
          <div>
            <label>What is your favorite brand on TV?</label><br />
            <input type="radio" name="q2" value="Sony" onChange={this.handleQuestionChange} />Sony<br />
            <input type="radio" name="q2" value="Samsung" onChange={this.handleQuestionChange} />Samsung<br />
            <input type="radio" name="q2" value="Panasonic" onChange={this.handleQuestionChange} />Panasonic<br />
            <input type="radio" name="q2" value="Vizio" onChange={this.handleQuestionChange} />Vizio<br />
            <input type="radio" name="q2" value="Other" onChange={this.handleQuestionChange} />Other<br />
          </div>
          <div>
            <label>What is your favorite Smartphone brand?</label><br />
            <input type="radio" name="q3" value="Morning" onChange={this.handleQuestionChange} />Morning<br />
            <input type="radio" name="q3" value="Afternoon" onChange={this.handleQuestionChange} />Afternoon<br />
            <input type="radio" name="q3" value="Evening" onChange={this.handleQuestionChange} />Evening<br />
            <input type="radio" name="q3" value="Night" onChange={this.handleQuestionChange} />Night<br />
            <input type="radio" name="q3" value="Other" onChange={this.handleQuestionChange} />Other<br />
          </div>
          <div>
            <label>What is your favorite CPU brand?</label><br />
            <input type="radio" name="q4" value="Intel" onChange={this.handleQuestionChange} />Intel<br />
            <input type="radio" name="q4" value="AMD" onChange={this.handleQuestionChange} />AMD<br />
            <input type="radio" name="q4" value="Nvidia" onChange={this.handleQuestionChange} />Nvidia<br />
            <input type="radio" name="q4" value="ARM" onChange={this.handleQuestionChange} />ARM<br />
            <input type="radio" name="q4" value="Other" onChange={this.handleQuestionChange} />Other<br />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </span>
    } else if(!this.state.name && this.state.submitted === false){
      user = <span>
        <h2>Please enter your name to begin the survey</h2>
        <form onSubmit={this.handleNameSubmit.bind(this)}>
          <input type="text" placeholder="Enter Name..." ref="name" />
        </form>
      </span>;
      questions = '';
    } else if(this.state.submitted === true){
      user = <h2>Thank You, {this.state.name}</h2>
    }
    return (
      <div className="App">
        <header className="App-header text-center">
          <h1 className="App-title">SimpleSurvey</h1>
        </header>
        <div className="text-center">
        {user}
        </div>
        <div className="container">
          {questions}
        </div>
      </div>
    );
  }
}  

export default App;
