using GraphQL;
using GraphQL.Types;
using Orestes.Simulator.DataSource.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Orestes.Simulator.DataSource.GraphTypes
{
    public class WeatherForecastType : ObjectGraphType<WeatherForecast>
    {
        public WeatherForecastType()
        {
            Field(x => x.Date).Description("The date of the weather forecast.");
            Field(x => x.TemperatureC).Description("The temperature in Celsius.");
            Field(x => x.TemperatureF).Description("The temperature in Fahrenheit.");
            Field(x => x.Summary, nullable: true).Description("A summary of the weather forecast.");
        }
    }

    public class WeatherForecastQuery : ObjectGraphType
    {
        public WeatherForecastQuery(IWeatherForecastService service)
        {
            Field<ListGraphType<WeatherForecastType>>(Name = "weatherForecasts").Resolve(x => service.GetAll());
            Field<ListGraphType<WeatherForecastType>>(Name = "weatherForecast")
                .Arguments(new QueryArguments(new QueryArgument<IntGraphType> { Name = "id" }))
                .Resolve(x => service.GetOne(x.GetArgument<int>("id")));
        }
    }

    public class WeatherForecastService : IWeatherForecastService
    {
        private List<WeatherForecast> _list = new List<WeatherForecast>();
        public WeatherForecastService()
        {
            var summaries = new[]
            {
                "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
            };
            _list = Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = summaries[Random.Shared.Next(summaries.Length)]
            }).ToList();
        }
        public List<WeatherForecast> GetAll()
        {
            return _list;
        }
        public List<WeatherForecast> GetOne(int id)
        {
            return _list.Where(wf => wf.Date.Day == id).ToList();
        }
    }

    public interface IWeatherForecastService
    {
        public List<WeatherForecast> GetAll();
        public List<WeatherForecast> GetOne(int id);
    }
}
