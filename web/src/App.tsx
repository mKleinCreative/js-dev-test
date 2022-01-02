import React from 'react';
import AllRepos from './components/AllRepos';
import { Row } from 'react-materialize';

function App() {
  return (
    <div>
      <header>
        <Row>
          <AllRepos />
        </Row>
      </header>
    </div>
  );
}

export default App;
