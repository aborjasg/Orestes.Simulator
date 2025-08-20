import { ChangeDetectorRef, Component, Injectable, OnInit, Signal, signal, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICustomer, ApiService } from '../../services/api.service';
import { forkJoin, map, Observable, of, retry, shareReplay, switchMap, tap } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  imports: [CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit {
  list$: ICustomer[] = []; 
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.getList();    
  } 

  getList() {    
    this.api.getToken()
    .pipe(
      switchMap(token => {        
        this.api.setToken(token.access_token);
        return this.api.getList<ICustomer>(this.api.apiURL_Customers)
      }))
    .subscribe({ 
        next: list => {
          console.log("API|getCustomers():", list);
          this.list$ = list          
      },
      error: error => console.error(`API|Error: ${error}`),
      complete: () => this.cdr.detectChanges()
    });
  }

  clearList() {
    this.list$ = [];
    this.cdr.detectChanges();
  }

  addCustomer() {
    let newCustomer: ICustomer = { id: 0, name: 'New Customer', status: true };
    this.api.saveRecord<ICustomer>(this.api.apiURL_Customers, newCustomer)
    .subscribe({ 
        next: response => {
          console.log("API|Customer added successfully:", response);
          this.list$.push(response);
          this.cdr.detectChanges();
        },
        error: error => console.error(`API|Error adding customer: ${error}`),
        complete: () => console.log(`API|End`)
    });
  }

  deleteCustomer(inputBox: HTMLInputElement) {
    if (this.list$.length > 0) {
      this.api.deleteRecord(this.api.apiURL_Customers, parseInt(inputBox.value))
      .subscribe({
        next: () => {
          console.log("API|Customer deleted successfully:", inputBox.value);
          this.list$ = this.list$.filter(c => c.id !== parseInt(inputBox.value));
          inputBox.value = ""; // Clear input after deletion
        },
        error: error => console.error(`API|Error deleting customer: ${error}`),
        complete: () => this.cdr.detectChanges()
      });
    } else {
      console.warn("No customers to delete.");
    }
  }

}
