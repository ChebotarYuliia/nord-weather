import React, { Component } from 'react';
import './App.css';
import {
  Container
} from 'reactstrap';
import FormsContainer from './containers/FormsContainer';

class App extends Component {
  render() {
    return (
      <Container className="App">
        <FormsContainer />
      </Container>
    );
  }
}

export default App;
