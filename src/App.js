
import './App.css';
import {useState} from 'react';
import useFetch from './hooks/useFetch.js';
import useObtainAuth from './hooks/useObtainAuth.js';

//const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IkQ1QjdBOUIxODFFOEYxN0UwRTU5MkFFQTdBREFDRjk4IiwieDV0IjoiZmFxUHJnMW5adU1RSjJidTByVXJWbGp1eVVJIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwczovL3BkaXMtaWRlbnRpdHktc2VydmVyLmlyaWRpdW0ucHJvLnByZXFpbi5jb20iLCJuYmYiOjE3MDQ0NTU5NTQsImlhdCI6MTcwNDQ1NTk1NCwiZXhwIjoxNzA0NTQyMzU0LCJhdWQiOlsicHJlcWluLmNvbS5hcGkiLCJodHRwczovL3BkaXMtaWRlbnRpdHktc2VydmVyLmlyaWRpdW0ucHJvLnByZXFpbi5jb20vcmVzb3VyY2VzIl0sInNjb3BlIjpbIm9wZW5pZCIsInByZXFpbi5jb20uZGVmYXVsdCIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwd2QiXSwiY2xpZW50X2lkIjoicHJlcWluLmNvbS5jbGllbnQucHJvYXBpIiwic3ViIjoiMzI5OTc4IiwiYXV0aF90aW1lIjoxNzA0NDU1OTU0LCJpZHAiOiJsb2NhbCIsIm5hbWUiOiJkdW1teWRhdGFmZWVkc0BwcmVxaW4uY29tIiwiZW1haWwiOiJkdW1teWRhdGFmZWVkc0BwcmVxaW4uY29tIiwicHJlcWluX2NvbnRhY3RGaXJtSWQiOiI4NjA1MDYiLCJwcmVxaW5fZmlybUlkIjoiOTUyIiwicHJlcWluX2Zpcm1OYW1lIjoiUHJlcWluIiwicHJlcWluX2Zpcm1UeXBlIjoiU29mdHdhcmUgQ29tcGFueSIsInByZXFpbl9wcm9kdWN0IjoibW9iaWxlIiwicHJlcWluX3B1YmxpY2F0aW9uSWRzIjpbIjg3OSIsIjg4OCIsIjkyMyJdLCJwcmVxaW5fc3Vic2NyaXB0aW9uIjpbImFzbGJlbiIsImFzbGJlbm5kIiwiZXNnaW1wYWN0IiwiZXNncHJvX3MiLCJlc2dyaXNrX3MiLCJmYXNsYmVuIiwiZmJkIiwiZmJkZSIsImZiZGYiLCJmYmRtYiIsImZiZG1pbmYiLCJmYmRtcGQiLCJmYmRtcmUiLCJmYmRtdmMiLCJmYm4iLCJmY2YiLCJmY2ljIiwiZmNtbmYiLCJmY21uZ3AiLCJmY21ubHAiLCJmZXNnYWVtIiwiZmVzZ2FpIiwiZmVzZ2FyIiwiZmVzZ2FzYXNiIiwiZmVzZ2ZncGEiLCJmZXNnZmdwdCIsImZlc2dmaSIsImZlc2dmaWEiLCJmZXNnZmxwYSIsImZlc2dmbWFmZiIsImZlc2dmbWMiLCJmZXNnZm1pcCIsImZlc2dmbXJkIiwiZmVzZ2ZtcmUiLCJmZXNnZm1yc2FzYiIsImZlc2dmbXQiLCJmZXNnZm10aSIsImZlc2dmciIsImZlc2dmcmEiLCJmZXNnaWEiLCJmZXNnaWMiLCJmZXNnaWZtdCIsImZlc2dpdCIsImZmdCIsImZnbGZtIiwiZmdsaSIsImZoZmJtIiwiZmhmZXNnZm0iLCJmaGZlc2dpIiwiZmhmZiIsImZoZmZhZiIsImZoZmZtIiwiZmhmZm1jIiwiZmhmaGZwIiwiZmhmaSIsImZoZmljIiwiZmhmaWNkIiwiZmhmbiIsImZoZnNwZiIsImZpYyIsImZpbmZkIiwiZmluZmRwIiwiZmluZmVzZ2ZtIiwiZmluZmVzZ2kiLCJmaW5mZiIsImZpbmZmbSIsImZpbmZmbWMiLCJmaW5maGZwIiwiZmluZmkiLCJmaW5maWMiLCJmaW5maWNkIiwiZmluZm4iLCJmaW5mc20iLCJmaW5mc3BmIiwiZm1kbCIsImZucmRwIiwiZm5yZXNnZm0iLCJmbnJlc2dpIiwiZm5yZiIsImZucmZtIiwiZm5yZm1jIiwiZm5yaGZwIiwiZm5yaSIsImZucmljIiwiZm5yaWNkIiwiZm5ybiIsImZucnNtIiwiZm5yc3BmIiwiZnBjYmNmIiwiZnBjYm0iLCJmcGNxaWJtIiwiZnBkZCIsImZwZGRwIiwiZnBkZXNnZiIsImZwZGVzZ2ZtIiwiZnBkZXNnaSIsImZwZGVzZ3IiLCJmcGRmIiwiZnBkZm0iLCJmcGRmbWMiLCJmcGRoZnAiLCJmcGRpIiwiZnBkaWMiLCJmcGRpY2QiLCJmcGRuIiwiZnBkc20iLCJmcGRzcGYiLCJmcGVkcCIsImZwZWVzZ2YiLCJmcGVlc2dmbSIsImZwZWVzZ2kiLCJmcGVlc2dyIiwiZnBlZiIsImZwZWZtIiwiZnBlZm1jIiwiZnBlaGZwIiwiZnBlaSIsImZwZWljIiwiZnBlaWNkIiwiZnBlbiIsImZwZXNtIiwiZnBlc3BmIiwiZnJlZCIsImZyZWRwIiwiZnJlZXNnZm0iLCJmcmVlc2dpIiwiZnJlZiIsImZyZWZtIiwiZnJlZm1jIiwiZnJlaGZwIiwiZnJlaSIsImZyZWljIiwiZnJlaWNkIiwiZnJlbiIsImZyZXNtIiwiZnJlc3BmIiwiZnNlY24iLCJmc3BkYiIsImZzcGRpbmYiLCJmc3BkcGQiLCJmc3BkcmUiLCJmc3BkdmMiLCJmc3BmIiwiZnNwdCIsImZ2Y2QiLCJmdmNkZSIsImZ2Y2RmIiwiZnZjZXNnciIsImZ2Y24iLCJmdmNzbSIsInBjYXNoZmxvdyIsInBlIiwicGVfY29uc3VsdGFudCIsInBlX2NvbnN1bHRhbnRfY29udGFjdCIsInBlX2Z1bmQiLCJwZV9mdW5kX3BlcmZvcm1hbmNlIiwicGVfZnVuZG1hbmFnZXIiLCJwZV9mdW5kbWFuYWdlcl9jb250YWN0IiwicGVfZnVuZG1hbmFnZXJfZnVuZCIsInBlX2Z1bmRtYW5hZ2VyX3BlcmZvcm1hbmNlIiwicGVfaW52ZXN0b3IiLCJwZV9pbnZlc3Rvcl9jb250YWN0IiwicGVfaW52ZXN0b3JfZnVuZCIsInBlX2ludmVzdG9yX2Z1bmRtYW5hZ2VyIiwicGVfaW52ZXN0b3JfbmV3cyIsInBmcmVlIiwicGhmbSIsInBoaSIsInBpZCIsInBpZm0iLCJwaWkiLCJwbmZtIiwicG5pIiwicHBkIiwicHBkZCIsInBwZGZtIiwicHBkaSIsInBwZm0iLCJwcGZ0IiwicHBpIiwicHBybyIsInByZCIsInByZXFpbmFwaWludmVzdG9yY29tbWl0bWVudHMiLCJwcmVxaW5hcGlpbnZlc3RvcnMiLCJwcmZtIiwicHJpIiwicHNlYyIsInB2ZCIsInJlIiwicmVfY29uc3VsdGFudCIsInJlX2NvbnN1bHRhbnRfY29udGFjdCIsInJlX2Z1bmQiLCJyZV9mdW5kbWFuYWdlciIsInJlX2Z1bmRtYW5hZ2VyX2NvbnRhY3QiLCJyZV9mdW5kbWFuYWdlcl9mdW5kIiwicmVfaW52ZXN0b3IiLCJyZV9pbnZlc3Rvcl9jb250YWN0IiwicmVfaW52ZXN0b3JfZnVuZCIsInJlX2ludmVzdG9yX2Z1bmRtYW5hZ2VyIiwicmVfaW52ZXN0b3JfbmV3cyJdLCJwcmVxaW5fdXNlcklkIjoiMzI5OTc4IiwicHJlcWluX3VzZXJOYW1lIjoiRHVtbXkgRGF0YSBGZWVkcyIsInN1YnNjcmlwdGlvbl9jb3VudF9jbGFzc2ljIjoiMTMiLCJzdWJzY3JpcHRpb25fY291bnRfcHJvIjoiMjcifQ.eEdvGHRUbOMainNCZPMuAWNHguUCc8_Fwrif_6nCDrh1PnpfBpQ22OjfxkHlft43Wy8ACuHbsWo7ClDqJ2PmOseNnEVzTzkeQNcxhTuLbwiZiVWPi2cunQeWu773dRmvJP-vGBhlMob8v4HzLYZZWKMBe12zCqkNl3F1D-2djVb-m-X4tivhjFGd0oaV-eWhhcSdjYuIOvAHIGh5VpATmD9oxp29yUzEjGB8ssosUUQ1tX8jid6DWPqOB3Jw6J3GKOHZXw72JqLuImfMrhfXp2MCjX239z9TTQ0Ps79WFiCaXrC_wke2-NEhgKAGawM0_xl0UEayEorStbQJFniF8g"


function App() {
  // obtain the bearer token
  const { token, loadingAuth } = useObtainAuth()

  // get the firm data
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
              <tr key={data.data[0].firmName}>
                <td>{data.data[0].firmName}</td>
                <td>{data.data[0].firmType}</td>
                <td>{data.data[0].yearEst}</td>
                <td>{data.data[0].address}</td>
              </tr>
            ))}
          </table>
        </>
      )}
    </div>
  )
}

export default App;

 