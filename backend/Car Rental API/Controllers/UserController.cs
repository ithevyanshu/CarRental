using Car_Rental_API.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Business_Layer.Interface;
using Microsoft.AspNetCore.Authorization;
using LoginUser = Shared.LoginUser;
using RegisterUser = Shared.RegisterUser;

namespace Car_Rental_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class UserController : Controller
    {
        private readonly IUser _user;

        public UserController(IUser user)
        {
            _user = user;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register(RegisterUser user)
        {
            if (_user.Get().FirstOrDefault(u => u.Email == user.Email) != null)
            {
                return Ok("Email already exists");
            }
            _user.Register(user);
            return Ok("Success");
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login(LoginUser user)
        {
            return Ok(_user.Login(user));
        }
    }
}
