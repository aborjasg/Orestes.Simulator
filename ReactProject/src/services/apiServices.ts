
class ApiServices {  

    apiURL_base = 'http://localhost:5062';
    apiURL_Authentication = `${this.apiURL_base}/api/Authentication/login`;
    apiURL_WeatherForecast = `${this.apiURL_base}/api/WeatherForecast`;
    apiURL_Customers = `${this.apiURL_base}/api/Customers`;    
    apiURL_PictureMaker_getSourceData = `${this.apiURL_base}/api/PictureMaker/getSourceData`;
    apiURL_PictureMaker_processData = `${this.apiURL_base}/api/PictureMaker/processData`;

    constructor() {
      
    }; 

    getAuthenticationUser(): any {
        const json_body = {
            "Username": "demo", 
            "Password": "password"
        }    
        return json_body;
    }
    
    getHeader() : any {
        const json_body = {
            'Access-Control-Allow-Origin': this.apiURL_base,
            'Content-Type': 'application/json'
        };  
        return json_body; 
    }

    getAuthorizedHeader(accessToken: string) : any {
        const json_body = {
            'Access-Control-Allow-Origin': this.apiURL_base,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };  
        return json_body; 
    }

    getRequestOptions(accessToken: string, method: string, body: any = null) : any {
        const header_def = this.getAuthorizedHeader(accessToken);
        //console.log(JSON.stringify(header_def));
        const request_headers = new Headers(header_def);
        const requestOptions = {
            method: method,
            headers: request_headers,
            body: (body ? JSON.stringify(body) : null)
        };
        //console.log(JSON.stringify(requestOptions));
        return requestOptions;
    }

    async fetchTyped<T>(url: string, requestOptions: any): Promise<T> {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        return data as T;
    }

    async getToken() : Promise<Response> {
        const header_def = this.getHeader();
        const request_headers = new Headers(header_def);
        let body = this.getAuthenticationUser();
        const requestOptions = {
            method: 'POST',
            headers: request_headers,
            body: JSON.stringify(body)
        };
        return fetch(this.apiURL_Authentication, requestOptions)            
    };
}

export default ApiServices;