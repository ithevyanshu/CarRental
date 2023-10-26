using Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Layer.Interface
{
    public interface IRental
    {
        public void Add(RentalAgreement car);
        public void Update(string id, DateTime startDate, DateTime endDate);
        public void ReturnResponse(string id, Boolean response);
        public void ReturnRequest(string id, Boolean response);
        public void Delete(string id);
        public RentalAgreement Get(string id);
        public List<RentalAgreementwithUserandCarDetails> Get();
    }
}
