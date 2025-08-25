import React, { useState, useEffect } from 'react';
import type { ICustomer } from '../models/interfaces';
import ApiServices from '../services/ApiServices';


function Customers( {apiService}: { apiService: ApiServices }) {        
    const [list, setData] = useState<ICustomer[]>([]);
    const [error, setError] = useState<Error | null>(null);     
    const api = apiService;   

    useEffect(() => {        
        const getCustomer = async () => {
            api.getToken()
            .then(response => response.json())
            .then(token =>  {
                //console.log(`getToken: ${token.access_token}`);                
                return token.access_token;
            })
            .then(access_token => {                  
                const requestOptions = api.getRequestOptions(access_token, 'GET', null);                
                api.fetchTyped<ICustomer[]>(api.apiURL_Customers, requestOptions)                                
                .then(data => {
                    //console.log(`getCustomer: data=${JSON.stringify(data)}`);
                    setData(data);
                })
                .catch(error => { 
                    console.error('Error:', error);
                    setError(error);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error);
            });
        };
        getCustomer();       
    }, []); // The empty dependency array ensures this effect runs only once after the initial render.

    return (
        <div style={{ alignItems: 'left' }}>
            <h2>Customers</h2>   
            { list.length === 0 && !error && <p>Loading...</p> }
            { error && <p>Error: {error.message}</p> }
            { list.length !== 0 && !error ?
                <><ul>
                    { list.map((item, index) => (
                        <li key={index}> [{item.id}] {item.name}</li>
                    ))}
                </ul></>
                : <p>No data available or API not running.</p>
            }
        </div>
    );
}

export default Customers;
