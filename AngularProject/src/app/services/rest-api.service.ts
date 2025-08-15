import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, of, switchMap } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private apiURL_base = 'http://localhost:5062';
  private apiURL_Authentication = `${this.apiURL_base}/api/Authentication/login`;
  private apiURL_WeatherForecast = `${this.apiURL_base}/api/WeatherForecast`;
  private apiURL_Customers = `${this.apiURL_base}/api/Customers`;    
  private accessToken: string = "";

  constructor(private http: HttpClient) {}

  getToken(): Observable<IResponseToken> {
    let body = {
    "Username": "demo", 
    "Password": "password"
    }    
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
      let request_headers = new HttpHeaders({
        'Access-Control-Allow-Origin': this.apiURL_base,
        'Authorization': `Bearer ${this.accessToken}`
      });    
      return this.http.get<ICustomer[]>(this.apiURL_Customers, { headers: request_headers });
    }
    else {
      return of([]);
    }
  }

}