using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data_Layer.Interface;
using Shared;

namespace Data_Layer.Implementation
{
    public class UserDL : IUserDL
    {
        public readonly CarRentalDbContext _context;

        public UserDL(CarRentalDbContext context)
        {
            _context = context;
        }

        public void Add(RegisterUser user)
        {
            _context.Users.Add(user);
        }

        public DbSet<RegisterUser> Get()
        {
            return _context.Users;
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
