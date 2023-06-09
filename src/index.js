import React from 'react';
import ReactDOM from 'react-dom';
// import GlobalStyle from './styles/GlobalStyle';
import App from './App';
import Authorization  from './Context/AuthContext';
import Chatcontextprovider from './Context/ChatContext';

ReactDOM.render(
  <>
      {/* <GlobalStyle/> */}
      <Authorization>
        <Chatcontextprovider>
        <React.StrictMode>
        {/* app pr user ki auth toh lagani padegi na vohi lagai hai */}
      <App/>
      </React.StrictMode>
      </Chatcontextprovider>
      </Authorization>
  </>,document.getElementById('root')
)