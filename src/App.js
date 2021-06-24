import React, { useState, useEffect } from 'react';
import Loader from './components/loader/loader';
import Table from './components/table';
import './index.css';

function App() {

  let [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://www.filltext.com/?rows=400&id={index}&firstName={firstName}&delay=0.3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <div className="App">
      { data.length ? <Table data={data} /> : <Loader /> }
    </div>
  );
}

export default App;
