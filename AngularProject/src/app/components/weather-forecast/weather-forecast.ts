import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IWeatherForecast, RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-weather-forecast',
  imports: [CommonModule],
  templateUrl: './weather-forecast.html',
  styleUrl: './weather-forecast.css'
})
export class WeatherForecast {
  list$: IWeatherForecast[] = [];
  constructor(private api: RestApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.getWeatherForecast().subscribe({
      next: list =>  {
        console.log("API|getWeatherForecast():", list);
        this.list$ = list
        this.cdr.detectChanges();
      },
      error: error => console.error(`API|Error: ${error}`),
      complete: () => console.log(`API|End of process`)
    });
  }
}
