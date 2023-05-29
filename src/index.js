import React from 'react';
import ReactDOM from 'react-dom';
// import GlobalStyle from './styles/GlobalStyle';
import App from './App';
import AuthContext  from './Context/AuthContext';

ReactDOM.render(
  <>
      {/* <GlobalStyle/> */}
      <AuthContext>
        {/* app pr user ki auth toh lagani padegi na vohi lagai hai */}
      <App/>
      </AuthContext>
  </>,document.getElementById('root')
)