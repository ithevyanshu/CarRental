using Data_Layer.Interface;
using Microsoft.EntityFrameworkCore;
using Shared;

namespace Data_Layer.Implementation
{
    public class CarDL : ICarDL
    {
        public readonly CarRentalDbContext _context;

        public CarDL(CarRentalDbContext context)
        {
            _context = context;
        }

        public DbSet<CarDetails> Get()
        {
            return _context.CarDetails;
        }

        public CarDetails Get(string Id)
        {
            return _context.CarDetails.Find(Id);
        }

        public void Add(CarDetails carDetails)
        {
            _context.CarDetails.Add(carDetails);
        }

        public void Update(CarDetails carDetails)
        {
            _context.CarDetails.Update(carDetails);
        }

        public void Delete(CarDetails carDetails)
        {
            _context.CarDetails.Remove(carDetails);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
