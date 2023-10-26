using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shared;

namespace Data_Layer.Interface
{
    public interface IUserDL
    {
        public void Add(RegisterUser user);
        public DbSet<RegisterUser> Get();
        public void Save();
    }
}
