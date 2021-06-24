import React, { useState, useEffect } from 'react';
import Loader from './components/loader/loader';
import Table from './components/table';
import './index.css';

function App() {

  let [data, setData] = useState([]);

  useEffect(() => {
    fetch(`database.json`)
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
