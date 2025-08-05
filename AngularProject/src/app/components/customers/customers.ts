import { Component, Injectable, OnInit, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer, ResponseToken, RestApiService } from '../../services/rest-api.service';
import { forkJoin, map, Observable, of, retry, shareReplay, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-customers',
  imports: [CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
  host: {ngSkipHydration: 'true'},
})
export class Customers implements OnInit {
  listCustomer!: Observable<any>;  
  constructor(private api: RestApiService) {}
  
  ngOnInit() {
    this.api.getToken()
    .pipe(
      switchMap(token => {
        //console.log("API|getToken():", token.access_token);
        return this.api.getCustomers(token.access_token)
      }),
      shareReplay(1))
    .subscribe({ 
      next: list => {
        console.log("API|getCustomers():", list);
        this.listCustomer = of(list);
      },
      error: error => console.error(`API|Error: ${error}`),
      complete: () => console.log("API|Completed")
    });
  } 

}