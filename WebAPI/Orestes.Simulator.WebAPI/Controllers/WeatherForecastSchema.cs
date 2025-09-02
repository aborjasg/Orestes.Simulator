using Orestes.Simulator.DataSource.Models;
using GraphQL.Types;

namespace Orestes.Simulator.WebAPI.Controllers
{
    public class WeatherForecastSchema : Schema
    {
        public WeatherForecastSchema(IServiceProvider provider) : base(provider)
        {
            Query = provider.GetRequiredService<WeatherForecastQuery>();
        }
    }
}
