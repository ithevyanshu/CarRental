using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared;

namespace Data_Layer
{
    public class CarRentalDbContext : DbContext
    {
        public CarRentalDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<RegisterUser> Users { get; set; }
        public DbSet<CarDetails> CarDetails { get; set; }
        public DbSet<RentalAgreement> RentalAgreement { get; set; }
    }
}
