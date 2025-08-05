import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { error } from 'console';
import { response } from 'express';

export interface ResponseToken {
  access_token: string;
}

export interface WeatherForecast {
  date: string;
  summary: string;
  temperatureC: boolean;
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

  getToken(): Observable<ResponseToken> {
    let body = {
    "Username": "demo", 
    "Password": "password"
    }    
    return this.http.post<ResponseToken>(this.apiURL_Authentication, body);
  }

  getWeatherForecast(): Observable<WeatherForecast[]> {    
    return this.http.get<WeatherForecast[]>(this.apiURL_WeatherForecast);
  }

  getCustomers(access_token:string): Observable<Customer[]> {
    let request_headers = new HttpHeaders({
      'Access-Control-Allow-Origin': this.apiURL_base,
      'Authorization': `Bearer ${access_token}`
    });    
    return this.http.get<Customer[]>(this.apiURL_Customers, { headers: request_headers });
  }
}