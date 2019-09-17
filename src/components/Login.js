import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: false }
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }
    submitForm(e) {
        console.log(this.state);
        axios.post('http://35.201.2.209:8000/login', {
            email: this.state.email,
            password: this.state.password
          }).then((data) => {
            this.setState({ error: false })
            this.props.history.push('/devices')
        }).catch((err) => {
            this.setState({ error: true })
        });
    }

    setEmail(val) {
       this.setState({ email: val.target.value })
    }

    setPassword(val) {
        this.setState({ password: val.target.value })
    }
    render() {
        return (
            <div>
                <div className="Aligner login-background">
                    <div className="Aligner-item">
                        <p className="login-title">Login</p>
                        <div className="input-box">
                            <img className="form-icon" src={require('./../images/mail.jpg')} alt="mail" />
                            <input className="input" type="text" placeholder="Email Address" onChange={this.setEmail}/>
                        </div>
                        <div className="input-box2">
                            <img className="form-icon2" src={require('./../images/alert.jpg')}  alt="alert"/>
                            <input className="input" type="password" placeholder="Password" onChange={this.setPassword}/>
                            <button className="form-button" onClick={this.submitForm.bind(this)}>LOGIN</button> 
                        </div>
                    </div>
                </div>
                {this.state.error === true ? <p className="error-message">There was an error</p> : <p></p>}
            </div>
            
        )
    }
}

export default withRouter(Login);