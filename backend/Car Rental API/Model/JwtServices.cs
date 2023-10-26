using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Car_Rental_API.Model
{
    public class JwtServices
    {
        private const string SecretKey = "a07e37613f3e67552456792bef7d8fb522a9bf239a963e9d2ad763700340239d";
        private const int TokenDuration = 60;

        public string GenerateToken(string id, string name, string email, string number, string role)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));

            var signature = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var payload = new[]
            {
                new Claim("id", id),
                new Claim("name", name),
                new Claim("email", email),
                new Claim("role", role)
            };

            var jwtToken = new JwtSecurityToken(
                "localhost",
                "localhost",
                payload,
                expires: DateTime.Now.AddMinutes(TokenDuration),
                signingCredentials: signature
            );

            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        }
    }
}
