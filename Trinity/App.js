import React, {Component} from 'react';
import { Provider } from 'redux-thunk';
import configureStore from './configureStore';
import Login from './src/Login'

const store = configureStore();

class App extends Component{
  render() {
    return (   
        <Login />   
    );
  }
}

export default App;

