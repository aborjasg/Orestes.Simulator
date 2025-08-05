import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherForecast } from "./components/weather-forecast/weather-forecast";
import { Customers } from "./components/customers/customers";
import { PictureMaker } from "./components/picture-maker/picture-maker";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WeatherForecast, Customers, PictureMaker],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {    
  protected readonly title = signal('Orestes.Simulator');
  
}
