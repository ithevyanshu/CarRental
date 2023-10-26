using System.ComponentModel.DataAnnotations;

namespace Car_Rental_API.Model
{
    public class LoginUser
    {
        [Required] public string? Email { get; set; }

        [Required] public string? Password { get; set; }
    }
}
