import React, { useState, useEffect } from 'react';

function Customers() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiURL_base = 'http://localhost:5062';    
    
    useEffect(() => {
        const getToken = async () => {
            const header_def = {                
                'Access-Control-Allow-Origin': apiURL_base,       
                'Content-Type': 'application/json'
            }
            const request_headers = new Headers(header_def);
            const apiURL_Authentication = `${apiURL_base}/api/Authentication/login`;
            let body = {
                'Username': 'demo', 
                'Password': 'password'
            };    
            const requestOptions = {
                method: 'POST',
                headers: request_headers,
                body: JSON.stringify(body)
            };
            return fetch(apiURL_Authentication, requestOptions)            
        };
        const getCustomer = async () => {   
            getToken()
            .then(response => response.json())
            .then(token =>  {
                console.log(`getToken: ${token.access_token}`);                
                return token.access_token;
            })
            .then(access_token => {
                const apiURL_Customers = `${apiURL_base}/api/Customers`;            
                const header_def = {                
                    'Access-Control-Allow-Origin': apiURL_base,       
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
                const request_headers = new Headers(header_def);
                const requestOptions = {
                    method: 'GET',
                    headers: request_headers
                };                
                //console.log(`getCustomer: api=${apiURL_Customers} | ${request_headers.get("Authorization")}`);
                fetch(apiURL_Customers, requestOptions)                
                .then(response => response.json())
                .then(data => {
                    let array = JSON.stringify(data);
                    console.log(`getCustomer: data=${array}`)
                    setData(data);
                    setLoading(false);
                })
                .catch(error => { 
                    console.error('Error:', error)
                    setError(error);
                    setLoading(false);
                });
            })
            .catch(error => console.error(error));
        };
        getCustomer();       
    }, []); // The empty dependency array ensures this effect runs only once after the initial render.

    if (loading) {         
        return <div><i>Connecting to API services...</i></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Customers</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <ul>
                {data.map((item) => {
                    <li>[{item.id}] {item.name} | {item.status}</li>
                })}
            </ul>
        </div>
    );
}


export default Customers;