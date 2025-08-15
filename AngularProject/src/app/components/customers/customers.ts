import { ChangeDetectorRef, Component, Injectable, OnInit, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICustomer, RestApiService } from '../../services/rest-api.service';
import { forkJoin, map, Observable, of, retry, shareReplay, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-customers',
  imports: [CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
  host: {ngSkipHydration: 'true'},
})
export class Customers implements OnInit {
  list$: ICustomer[] = [];  
  constructor(private api: RestApiService, private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.loadData();    
  } 

  loadData() {
    this.api.getToken()
    .pipe(
      switchMap(token => {        
        this.api.setToken(token.access_token);
        return this.api.getCustomers()
      }))
    .subscribe({ 
        next: list => {
          console.log("API|getCustomers():", list);
          this.list$ = list
          this.cdr.detectChanges();
      },
      error: error => console.error(`API|Error: ${error}`),
      complete: () => console.log(`API|End of process`)
    });
  }

}