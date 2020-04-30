import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import DisplayResult from './components/DisplayResult';
import ConstituencyWise from './components/ConstituencyWise';
import AllConstituencies from './components/AllConstituencies'
import AllParties from './components/AllParties'

function App() {
  return (
    <div >
      <Router>
        <div>
          <Route path="/" component={DisplayResult} />
          <Route path="constituency-wise-results" component={ConstituencyWise} />
          <Route path="constituencies" component={AllConstituencies} />
          <Route path="parties" component={AllParties} />
        </div>
      </Router>
    </div>
  );
}

export default App;
