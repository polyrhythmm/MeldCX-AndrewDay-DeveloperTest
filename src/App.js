import React from 'react'; 
import { BrowserRouter as Router, Route, } from "react-router-dom";
import './App.css';
import AppContainer from './containers/AppContainer';
import Devices from './containers/Devices';

function App() {
  return (
    <div className="App">
       <Router>
        <div>
          <Route exact path="/" component={AppContainer} />
          <Route path="/devices" component={Devices} />
        </div>
      </Router>
    </div>
  );
}

export default App;
