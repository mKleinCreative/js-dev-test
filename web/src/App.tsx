import React from 'react';
import logo from './logo.svg';
import AllRepos from './components/AllRepos'
import { Row, Col, Card, Icon } from 'react-materialize'



function App() {
  return (
    <div>
      <header>
        <Row>
          <AllRepos/>
        </Row>
      </header>
    </div>
  );
}

export default App;
