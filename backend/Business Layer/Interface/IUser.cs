using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared;

namespace Business_Layer.Interface
{
    public interface IUser
    {
        public void Register(RegisterUser user);
        public string Login(LoginUser user);
        public DbSet<RegisterUser> Get();
    }
}
