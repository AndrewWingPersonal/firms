import {useEffect, useState} from 'react';


const useFetch = (token) => {

  const [data1, setData1] = useState({});
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {

 
    const fetchData = async () => {
           try {

              if (!token) {
                  return {data1, loading, error}
              }
        
              const responsesJSON = await Promise.all([
                  fetch('https://api.preqin.com/api/Investor?FirmID=2670', {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                  }),
                  fetch('https://api.preqin.com/api/Investor?FirmID=2792', {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                  }),
                   fetch('https://api.preqin.com/api/Investor?FirmID=3611,', {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                  })
              ]);
              const [firm1, firm2, firm3] = await Promise.all(responsesJSON.map(r => r.json()));

              setData1([firm1, firm2, firm3])
              setLoading(false)
 
            } catch (err) {
              console.log(err)
              setError(true)
            }
          };
          
          fetchData();
    }, [token]);
 
    return {data1, loading, error}
}

export default useFetch;