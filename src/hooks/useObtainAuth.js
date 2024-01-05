
import {useEffect, useState} from 'react';

const userName = "REMOVED";
const apiKey = "REMOVED";

const useObtainAuth = () => {

   const [loading, setLoading] = useState(true)
   const [token, setToken] = useState("")

   const url = "https://api.preqin.com/connect/token";

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({
                        "username": userName,
                        "apikey": apiKey
                    })
                });
                const reply = await response.json();
                setToken(reply.access_token)
                console.log(token);
                setLoading(false)
                
            } catch (error) {
                console.log("error:", error);
            }
           };
          
          fetchData();
    });
 
    return {token, loading}
}

export default useObtainAuth;