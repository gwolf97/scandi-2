import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, ApolloProvider , InMemoryCache} from '@apollo/client'
import {Provider} from "react-redux"
import store from "./store"


const client = new ApolloClient({
  uri:'https://scandiweb-hptz.onrender.com/graphql',
  cache: new InMemoryCache(),
  mode:"no-cors"
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Provider store={store}>
          <ApolloProvider client={client}>
            <App client={client} />
          </ApolloProvider>
        </Provider>
,);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
