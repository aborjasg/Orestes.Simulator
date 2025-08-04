import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer, RestApiService } from '../../services/rest-api.service';
import { Observable, of, take } from 'rxjs';

@Component({
  selector: 'app-customers',
  imports: [CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers implements OnInit {
  listCustomer: any[]=[];
  constructor(private api: RestApiService) {}

  ngOnInit() {
    this.loadData();     
  }

  loadData() {
    this.api.getToken().subscribe(response => {
        //console.log("Customer: getToken():", response);
        this.api.getCustomers(response.access_token).subscribe(response => {
          console.log("Customer: getCustomers():", response);
          this.listCustomer = response;
        });
      });
  }  
}
