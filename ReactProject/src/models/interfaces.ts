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