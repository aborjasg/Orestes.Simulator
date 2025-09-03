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
    public class CustomerType : ObjectGraphType<Customer>
    {
        public CustomerType()
        {
            Field(x => x.Id).Description("The ID of the customer.");
            Field(x => x.Name).Description("The name of the customer.");
            Field(x => x.Status).Description("The status of the customer.");
        }
    }

    public class CustomerQuery : ObjectGraphType
    {
        public CustomerQuery(ICustomerService service)
        {
            Field<ListGraphType<CustomerType>>(Name = "customers").Resolve(x => service.GetAll());
            Field<ListGraphType<CustomerType>>(Name = "customer")
                .Arguments(new QueryArguments(new QueryArgument<IntGraphType> { Name = "id" }))
                .Resolve(x => service.GetOne(x.GetArgument<int>("id")));
        }
    }

    public class CustomerService : ICustomerService
    {
        //private readonly OrestesDBContext _context;
        private List<Customer> _list = new List<Customer>();
        public CustomerService()
        {
            //_context = context;
            _list = new List<Customer>() { new Customer() { Id=1, Name="Alex", Status=true } }; // _context.Customers.ToList();
        }
        public List<Customer> GetAll()
        {
            return _list;
        }
        public List<Customer> GetOne(int id)
        {
            return _list.Where(wf => wf.Id == id).ToList();
        }
    }

    public interface ICustomerService
    {
        public List<Customer> GetAll();
        public List<Customer> GetOne(int id);
    }
}
