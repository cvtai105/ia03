using System;
using System.Collections.Generic;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using IA03.Config;
using Microsoft.IdentityModel.Tokens;

namespace IA03.Services
{
    public class JwtService
    {
        private readonly JwtSettings _jwtSettings;

        public JwtService(IConfiguration configuration)
        {
            _jwtSettings = configuration.GetSection("JwtSettings").Get<JwtSettings>();
        }

        private string _secret => _jwtSettings.Secret;
        private string _issuer => _jwtSettings.Issuer;
        private string _audience => _jwtSettings.Audience;   
        private readonly TimeSpan _expiration = TimeSpan.FromHours(24);

        public string GenerateToken(string email, Guid id, string role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_secret);

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Email, email),
                new(JwtRegisteredClaimNames.Sub, email),
                new(ClaimTypes.Role, role),
                new(ClaimTypes.NameIdentifier, id.ToString())
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.Add(_expiration),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _issuer,
                Audience = _audience,
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        
    }
}