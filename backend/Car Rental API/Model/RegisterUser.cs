using System.ComponentModel.DataAnnotations;

namespace Car_Rental_API.Model
{
    public class RegisterUser
    {
        [Required] public string? Id { get; set; }

        [Required] public string? Name { get; set; }

        [Required] public string? Email { get; set; }

        [Required] public string? Password { get; set; }

        [Required] public string? CPassword { get; set; }

        [Required] public string? Role { get; set; }
    }
}
