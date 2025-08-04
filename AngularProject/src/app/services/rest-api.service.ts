import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { error } from 'console';
import { response } from 'express';

export interface ResponseToken {
  access_token: string;
}

export interface Customer {
  id: number;
  name: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private apiURL_base = 'http://localhost:5062';
  private apiURL_Authentication = `${this.apiURL_base}/api/Authentication/login`;
  private apiURL_WeatherForecast = `${this.apiURL_base}/api/WeatherForecast`;
  private apiURL_Customers = `${this.apiURL_base}/api/Customers`;    

  constructor(private http: HttpClient) {}

  getToken():Observable<ResponseToken> {
    let body = {
    "Username": "demo", 
    "Password": "password"
    }    
    return this.http.post<ResponseToken>(this.apiURL_Authentication, body);
  }

  getWeatherForecast(): Observable<any> {    
    return this.http.get(this.apiURL_WeatherForecast);
  }

  getCustomers(access_token:string): Observable<any> {
    let request_headers = new HttpHeaders({
      'Access-Control-Allow-Origin': this.apiURL_base,
      'Authorization': `Bearer ${access_token}`
    });    
    // console.log('Origin:', this.apiURL_base);
    // console.log('access_token:', access_token);
      
    return this.http.get(this.apiURL_Customers, { headers: request_headers });
  }

}