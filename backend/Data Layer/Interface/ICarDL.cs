using Microsoft.EntityFrameworkCore;
using Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_Layer.Interface
{
    public interface ICarDL
    {
        public DbSet<CarDetails> Get();
        public CarDetails Get(string Id);
        public void Add(CarDetails carDetails);
        public void Update(CarDetails carDetails);
        public void Delete(CarDetails carDetails);
        public void Save();
    }
}
