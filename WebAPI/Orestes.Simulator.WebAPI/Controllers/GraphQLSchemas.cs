
using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;
using Orestes.Simulator.DataSource.GraphTypes;

namespace Orestes.Simulator.WebAPI.Controllers
{
    public class WeatherForecastSchema : Schema
    {
        public WeatherForecastSchema(IServiceProvider provider) : base(provider)
        {
            Query = provider.GetRequiredService<WeatherForecastQuery>();                        
        }
    }

    public class CustomerSchema : Schema
    {
        public CustomerSchema(IServiceProvider provider) : base(provider)
        {
            Query = provider.GetRequiredService<CustomerQuery>();
        }
    }
}
