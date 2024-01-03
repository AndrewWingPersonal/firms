
import './App.css';
import {useState} from 'react';
import useFetch from './hooks/useFetch.js';
import useObtainAuth from './hooks/useObtainAuth.js';

function App() {
  // obtain the bearer token
  const { token, loadingAuth } = useObtainAuth()

  const { data1, loading, error} = useFetch(token);

  return (
    <div className="App">
      {loading === true ? (

        <div>Loading...</div>
      ) : (
        <>
          <h1>Users</h1>
          <table border={1}>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Added</th>
              <th>Address</th>
            </tr>
            {data1.map(data => (
              <tr key={data.data.firmName}>
                <td>{data.data.firmName}</td>
                <td>{data.data.firmType}</td>
                <td>{data.data.yearEst}</td>
                <td>{data.data.address}</td>
              </tr>
            ))}
          </table>
        </>
      )}
    </div>
  )
}

export default App;

 