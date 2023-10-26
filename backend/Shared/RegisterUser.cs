using System.ComponentModel.DataAnnotations;

namespace Shared
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