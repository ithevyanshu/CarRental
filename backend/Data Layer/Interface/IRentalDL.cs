using Microsoft.EntityFrameworkCore;
using Shared;

namespace Data_Layer.Interface
{
    public interface IRentalDL
    {
        public IEnumerable<RentalAgreementwithUserandCarDetails> Get();
        public RentalAgreement Get(string Id);
        public void Add(RentalAgreement rentalAgreement);
        public void Update(RentalAgreement rentalAgreement);
        public void Delete(RentalAgreement rentalAgreement);
        public void Save();
    }
}
