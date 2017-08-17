import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Line } from 'rc-progress'

const level = {
    0: "No password",
    1: "Weak",
    2: "OK",
    3: "Good",
    4: "Strong"
}

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            password: '',
            level_password: 0,
            has_number: false,
            has_special: false
        }
    }

    onChangePassword(e){
        let password = e.target.value;
        this.setState({ password })
        if(password.length === 0) {
            this.setState({ level_password: 0, has_number: false, has_special: false })
        } else {
            if(password.length < 6) {
                this.setState({ level_password: 1,  has_number: false, has_special: false })
            }

            if(password.length >= 6) {
                this.setState({ level_password: 2, has_number: false, has_special: false});
                if( /\d/.test(password) && /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password)) {

                    // contain both number and special symbol
                    this.setState({ level_password: 4, has_number: true, has_special: true });  // level three -> Strong Level
                } else if(/\d/.test(password)) {
                    // contain only number
                    this.setState({ level_password: 3, has_number: true, has_special: false}); // level two -> Good Level
                }
                 else if(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password)){
                     // contain only special
                    this.setState({ level_password: 3, has_special: true, has_number: false}); // level two -> Good Level
                 }
            }
        }
    }

    colorBar(level){
        switch (level) {
            case 0:
                return "white";
            case 1:
                return "red";
            case 2:
                return "yellow";
            case 3:
                return "#b3ff66";
            case 4:
                return "green";
            default:
                return "white";
        }

    }

  render() {
    return (
      <div className="container">
          <h1>Password Strength Meter</h1>
          <div className="row">
              <div className="col-md-6">
                  <div className="from-group">
                      <label htmlFor="password">Password</label>
                      <input className="form-control" type="password" onChange={(e) => this.onChangePassword(e)}/>
                  </div>
              </div>
              <div className="col-md-6">
                  { level[this.state.level_password] }
                  <ul>
                      <Line percent={this.state.level_password*(25)} strokeWidth="6" trailWidth="6"  strokeColor={this.colorBar(this.state.level_password)} />
                      Strong password is :
                      <li className={(this.state.level_password < 2) ? "alert-danger" : ""}>has at least 6 characters</li>
                      <li className={(this.state.has_number) ? "" : "alert-danger"}>has at least one number</li>
                      <li className={(this.state.has_special) ? "" : "alert-danger"}>has at least one special symbol</li>
                  </ul>
              </div>
          </div>

      </div>
    );
  }
}

export default App;
