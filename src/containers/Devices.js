import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'; 
import $ from 'jquery';

class Devices extends Component {
    constructor(props) {
        super(props);

        this.state = { devices_display: [], devices_online: 0, devices: [] }

        this.makeAPICall();

        setInterval(
            () => {
                this.makeAPICall();
            },5000);
        
            this.logout = this.logout.bind(this);
    }

    makeAPICall() {
        axios.get('http://35.201.2.209:8000/devices').then(data => {
            this.setState({ devices: data.data.devices, devices_online: data.data.devices.length }, () => {
                this.setupDevices();
            });
        }).catch((err) => {
            console.log(err);
        })
    }

    setupDevices() { 
        const array = this.state.devices.map((item, index) => {
            return <li className="circle" key={index} ><p className="circle-text">{item.name}</p></li>
        })

        this.setState({ devices_display: array }, () => {
            const list = $(".list li");

            this.updateLayout(list);
        });

       
    }

    updateLayout(listItems) {
        for (var i = 0; i < listItems.length; i++) {
            var offsetAngle = 360 / listItems.length;
            var rotateAngle = offsetAngle * i;
            $(listItems[i]).css("transform", "rotate(" + rotateAngle + "deg) translate(0, -200px) rotate(-" + rotateAngle + "deg)")
        }; 
    }

    notify() {
        var config = {
            headers: {'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub3ciOjE1Njg4NTM2NzQ3NTYsInNlbmRlciI6ImRheV9hbmR5QGhvdG1haWwuY29tIiwiaWF0IjoxNTY4ODUzNjc0fQ.VznnRXJVtBo76dBffshR9vpw0zREPt8cngP6y07Fke4"}
        };
        
        var bodyParameters = {
            name: 'Andrew Day',
            email: 'day_andy@hotmail.com',
            repoUrl: 'https://github.com/polyrhythmm/MeldCX-AndrewDay-DeveloperTest'
        }
        
        axios.post( 
          'http://35.201.2.209:8000/notify',
          bodyParameters,
          config
        ).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log("ERROR" + error)
        });
    }

    logout() {
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <div className="devices-background">
                    <div className="devices-online">
                        <p className="devices-number">{this.state.devices_online.toString()}</p>
                        <p className="devices-text">DEVICES<br />ONLINE</p>    
                    </div>  
                    <div className="circle-container">
                        <ul className="list">
                            {this.state.devices_display}
                        </ul>
                    </div>   
                    <div className="footer">
                      <button className="notify-button" onClick={this.notify}>NOTIFY</button>   
                      <button className="logout-button" onClick={this.logout}>LOGOUT</button>
                    </div>        
                </div>    
            </div>
        )
    }
}

export default withRouter(Devices);