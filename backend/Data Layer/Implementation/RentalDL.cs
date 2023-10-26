using Data_Layer.Interface;
using Microsoft.EntityFrameworkCore;
using Shared;

namespace Data_Layer.Implementation
{
    public class RentalDL : IRentalDL
    {
        public readonly CarRentalDbContext _context;

        public RentalDL(CarRentalDbContext context)
        {
            _context = context;
        }
        public IEnumerable<RentalAgreementwithUserandCarDetails> Get()
        {
            var rentalAgreementsWithCarAndUserDetails = _context.RentalAgreement
                .Where(rental => rental.CarId != null && rental.UserId != null) 
                .Join(
                    _context.CarDetails,
                    rental => rental.CarId,
                    car => car.Id,
                    (rental, car) => new
                    {
                        rental,
                        car
                    }
                )
                .Join(
                    _context.Users,
                    joined => joined.rental.UserId,
                    user => user.Id,
                    (joined, user) => new RentalAgreementwithUserandCarDetails
                    {
                        Id = joined.rental.Id,
                        CarId = joined.rental.CarId,
                        UserId = joined.rental.UserId,
                        StartDate = joined.rental.StartDate,
                        EndDate = joined.rental.EndDate,
                        RentalDuration = joined.rental.RentalDuration,
                        ReturnReq = joined.rental.ReturnReq,
                        ReturnResp = joined.rental.ReturnResp,
                        CarDetails = joined.car,
                        User = user
                    }
                )
                .ToList();

            return rentalAgreementsWithCarAndUserDetails;
        }


        public RentalAgreement Get(string Id)
        {
            return _context.RentalAgreement.Find(Id);
        }

        public void Add(RentalAgreement rentalAgreement)
        {
            _context.RentalAgreement.Add(rentalAgreement);
        }

        public void Update(RentalAgreement rentalAgreement)
        {
            _context.RentalAgreement.Update(rentalAgreement);
        }

        public void Delete(RentalAgreement rentalAgreement)
        {
            _context.RentalAgreement.Remove(rentalAgreement);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
