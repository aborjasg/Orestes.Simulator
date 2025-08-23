import React, { useState, useEffect } from 'react';
import type { IActionResponse, IDerivedDataFilter } from '../models/interfaces';
import ApiServices from '../services/apiServices';


function PictureMaker({apiService}: { apiService: ApiServices }) {        
    const [sourceData, setSourceData] = useState<IActionResponse>();
    const [processData, setProcessData] = useState<IActionResponse>();
    const [error, setError] = useState<Error | null>(null);   
    const api = apiService;    

    useEffect(() => {      
        const getPictureMakerData = async () => {   
            let filter: IDerivedDataFilter = { 
                name: "Spectrum (Picture)", 
                compressedData: ""
            };
            api.getToken()
            .then(response => response.json())
            .then(token =>  {
                //console.log(`getToken: ${token.access_token}`);                
                return token.access_token;
            })
            .then(access_token => {                  
                const requestOptions = api.getRequestOptions(access_token, 'POST', filter);                
                api.fetchTyped<IActionResponse>(api.apiURL_PictureMaker_getSourceData, requestOptions)                                
                .then(data => {
                    //let array = JSON.stringify(data);
                    //console.log(`getPictureMakerSourceData: data=${array}`);
                    setSourceData(data);
                    filter.compressedData = data.content;

                    const requestOptions2 = api.getRequestOptions(access_token, 'POST', filter);                
                    api.fetchTyped<IActionResponse>(api.apiURL_PictureMaker_processData, requestOptions2)                                
                    .then(data2 => {
                        //let array2 = JSON.stringify(data2);
                        //console.log(`getPictureMakerProcessData: data=${array2}`);
                        setProcessData(data2);
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
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error);
            });
        };
        getPictureMakerData();  
    }, []); // The empty dependency array ensures this effect runs only once after the initial render.

    return (
        <div style={{ alignItems: 'left' }}>
            <h2>Picture Maker</h2>                
            { !sourceData && !processData && !error && <p>Loading...</p> }
            { error && <p>Error: {error.message}</p> }
            { sourceData && processData && !error ?
                <><p>time={processData?.duration}</p><p>length={processData?.contentLenght}</p><img src={processData?.content} /></>
                : <p>No data available or API not running.</p>
            }
        </div> 
    );
}

export default PictureMaker;