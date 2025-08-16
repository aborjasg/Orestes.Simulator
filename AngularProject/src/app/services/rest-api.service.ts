import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, from, Observable, of, switchMap } from 'rxjs';
import { error } from 'console';
import { response } from 'express';

export interface IResponseToken {
  access_token: string;
}

export interface IWeatherForecast {
  date: string;
  summary: string;
  temperatureC: boolean;
}

export interface ICustomer {
  id: number;
  name: string;
  status: boolean;
}

export interface IDerivedDataFilter {
  name: string;
  compressedData: string;
}

export interface IActionResponse {
  id: number;
  type: string;
  message: string;
  content: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  contentLenght: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private apiURL_base = 'http://localhost:5062';
  private apiURL_Authentication = `${this.apiURL_base}/api/Authentication/login`;
  private apiURL_WeatherForecast = `${this.apiURL_base}/api/WeatherForecast`;
  private apiURL_Customers = `${this.apiURL_base}/api/Customers`;    
  private apiURL_PictureMaker_getSourceData = `${this.apiURL_base}/api/PictureMaker/getSourceData`;
  private apiURL_PictureMaker_processData = `${this.apiURL_base}/api/PictureMaker/processData`;
  private accessToken: string = "";
  private isAPIrunning: boolean = false;

  constructor(private http: HttpClient) { this.checkAPIServices(); }

  // Private methods:

  private getAuthenticationUser() : any {
    let json_body = {
    "Username": "demo", 
    "Password": "password"
    }    
    return json_body;
  }
  
  private getAuthorizedHeader() : HttpHeaders {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': this.apiURL_base,
      'Authorization': `Bearer ${this.accessToken}`
    });    
  }

  private checkAPIServices() {    
    let result = true;
    this.http.get(this.apiURL_WeatherForecast).subscribe({
      next: (response) => {
        console.log("API|checkAPIServices:", response);
        result = true
      },
      error: (error) => {
        console.log("API|checkAPIServices:", error);
        result = false
      },
      complete: () => this.isAPIrunning = result
    });
    return of(result);
  }
  
  // Public methods:

  isAPIEnabled(): Observable<boolean> {    
    console.log("API|Enabled:", this.isAPIrunning);
    return of(this.isAPIrunning);
  }

  getToken(): Observable<IResponseToken> {
    let body = this.getAuthenticationUser();
    return this.http.post<IResponseToken>(this.apiURL_Authentication, body);
  }
  
  setToken(accessToken:string) {
    console.log("API|token:", accessToken);
    this.accessToken = accessToken;
  }

  getWeatherForecast(): Observable<IWeatherForecast[]> {    
    return this.http.get<IWeatherForecast[]>(this.apiURL_WeatherForecast);
  }

  getCustomers(): Observable<ICustomer[]> {
    if (this.accessToken) {
      let request_headers = this.getAuthorizedHeader();
      return this.http.get<ICustomer[]>(this.apiURL_Customers, { headers: request_headers });
    }
    else {
      return of([]);
    }
  }

  getPictureMakerSourceData(filter: IDerivedDataFilter): Observable<IActionResponse> {
    if (this.accessToken) {
      let request_headers = this.getAuthorizedHeader(); 
      return this.http.post<IActionResponse>(this.apiURL_PictureMaker_getSourceData, filter, { headers: request_headers });
    }
    else {
      return of();
    }
  }

  getPictureMakerProcessData(filter: IDerivedDataFilter): Observable<IActionResponse> {
    if (this.accessToken) {
      let request_headers = this.getAuthorizedHeader(); 
      return this.http.post<IActionResponse>(this.apiURL_PictureMaker_processData, filter, { headers: request_headers });
    }
    else {
      return of();
    }
  }

}