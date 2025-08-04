import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-weather-forecast',
  imports: [CommonModule],
  templateUrl: './weather-forecast.html',
  styleUrl: './weather-forecast.css'
})
export class WeatherForecast {
  listWeather: any[] = [];
  constructor(private api: RestApiService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.getWeatherForecast().subscribe(data => {
      this.listWeather = data;
    });
  }
}
