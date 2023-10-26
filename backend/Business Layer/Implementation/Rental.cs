using Business_Layer.Interface;
using Data_Layer.Implementation;
using Data_Layer.Interface;
using Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Layer.Implementation
{
    public class Rental : IRental
    {
        private readonly IRentalDL _rental;

        public Rental(IRentalDL rental)
        {
            _rental = rental;
        }
        public List<RentalAgreementwithUserandCarDetails> Get()
        {
            return _rental.Get().ToList();
        }
        public RentalAgreement Get(string id)
        {
            return _rental.Get(id);
        }

        public void Add(RentalAgreement rental)
        {
            rental.Id = Guid.NewGuid().ToString();
            _rental.Add(rental);
            _rental.Save();
        }
        public void Update(string id, DateTime startDate, DateTime endDate)
        {
            var rental = _rental.Get(id);
            rental.StartDate = startDate;
            rental.EndDate = endDate;
            rental.RentalDuration = (int)(endDate - startDate).TotalDays + 1;
            _rental.Update(rental);
            _rental.Save();
        }
        public void ReturnRequest(string id, Boolean request) {
            var rental = _rental.Get(id);
            rental.ReturnReq = true;
            _rental.Update(rental);
            _rental.Save();
        }
        public void ReturnResponse(string id, Boolean response) {
            var rental = _rental.Get(id);
            rental.ReturnResp = true;
            _rental.Update(rental);
            _rental.Save();
        }
        public void Delete(string id)
        {
            var rental = _rental.Get(id);
            _rental.Delete(rental);
            _rental.Save();
        }
    }
}
