import React from 'react';
import AllRepos from './components/AllRepos';
// import LanguageFilter from './components/LanguageFilter';
import { Row } from 'react-materialize';




function App() {
  return (
    <div>
      <header>
        <Row>
          {/* <LanguageFilter /> */}
          <AllRepos />
        </Row>
      </header>
    </div>
  );
}

export default App;
