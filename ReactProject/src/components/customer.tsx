import React, { useState, useEffect } from 'react';
//import axios from 'axios';

function Customers() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiURL_base = 'http://localhost:5062';
            const apiURL_Customers = `${apiURL_base}/api/Customers`;
            const header_def = {                
                'Access-Control-Allow-Origin': apiURL_base,
                'x-api-key': 'P@ssw0rd1978',
            }
            const request_headers = new Headers(header_def);
            console.log(`Customers: api=${apiURL_Customers} | ${request_headers.get("mode")}`);

            fetch(apiURL_Customers, { method: 'GET', headers: request_headers })
            .then(response => response.json())
            .then(data => {
                console.log(`Customer: data=${data}`)
                setData(data);
                setLoading(false);
            })
            .catch(error => { 
                console.error('Error:', error)
                setError(error);
                setLoading(false);
            });
        };

        fetchData();
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
        </div>
    );
}


export default Customers;