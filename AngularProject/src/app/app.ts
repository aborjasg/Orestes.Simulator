import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherForecast } from "./components/weather-forecast/weather-forecast";
import { Customers } from "./components/customers/customers";
import { PictureMaker } from "./components/picture-maker/picture-maker";
import { RestApiService } from './services/rest-api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WeatherForecast, Customers, PictureMaker],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {    
  protected readonly title = signal('Orestes.Simulator');

  isAPIrunning: boolean = false;
  constructor(private api: RestApiService, private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.checkServices();
  }

  private checkServices() {
    this.api.isAPIEnabled()
    .subscribe({
      next: response => this.isAPIrunning = response,
      complete: () => this.cdr.detectChanges()
    });
  }
}
