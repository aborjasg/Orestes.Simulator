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
export class ApiServices {
  public apiURL_base = 'http://localhost:5062';
  private apiURL_Authentication = `${this.apiURL_base}/api/Authentication/login`;
  public apiURL_WeatherForecast = `${this.apiURL_base}/api/WeatherForecast`;
  public apiURL_Customers = `${this.apiURL_base}/api/Customers`;    
  public apiURL_PictureMaker_sourceData = `${this.apiURL_base}/api/PictureMaker/getSourceData`;
  public apiURL_PictureMaker_processData = `${this.apiURL_base}/api/PictureMaker/processData`;
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

  // get data rows from DB:
  getList<T>(api_url:string, isAuthorized: boolean=true): Observable<T[]> {
    if (isAuthorized && this.accessToken) {
      let request_headers = this.getAuthorizedHeader();
      return this.http.get<T[]>(api_url, { headers: request_headers });
    }
    else if (!isAuthorized) {
      return this.http.get<T[]>(api_url);
    }
    else {
      return of([]);
    }
  }

  saveRecord<T>(api_url:string, data: T): Observable<T> {
    if (this.accessToken) {
      let request_headers = this.getAuthorizedHeader();
      return this.http.post<T>(api_url, data, { headers: request_headers }).pipe(
        switchMap((response) => {
          console.log("API|Record saved successfully:", response);
          return of(response);
        }),
        catchError((error) => {
          console.error(`API|Error saving record: ${error}`);
          return of(undefined as unknown as T);
        })
      );
    }
    else {
      return of(undefined as unknown as T);
    }
  }

  deleteRecord<T>(api_url:string, id: number): Observable<void> {
    if (this.accessToken) {
      let request_headers = this.getAuthorizedHeader();
      return this.http.delete<void>(`${api_url}/${id}`, { headers: request_headers }).pipe(
        switchMap(async () => console.log("API|Record saved successfully:", id)),
        catchError((error) => {
          console.error(`API|Error saving record: ${error}`);
          return of();
        })
      );
    }
    else { 
      return of();
    }
  }

  // Get image data from PictureMaker service:
  getPictureMaker(api_url:string, filter: IDerivedDataFilter): Observable<IActionResponse> {
    if (this.accessToken) {
      let request_headers = this.getAuthorizedHeader(); 
      return this.http.post<IActionResponse>(api_url, filter, { headers: request_headers });
    }
    else {
      return of();
    }
  }

}