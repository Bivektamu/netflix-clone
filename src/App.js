import React from 'react';
import logo from './logo.svg';
import './App.css';
import Row from './Row';
import requests from './request';

function App() {
  return (
    <div className="app">
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
    </div>
  );
}

export default App;
