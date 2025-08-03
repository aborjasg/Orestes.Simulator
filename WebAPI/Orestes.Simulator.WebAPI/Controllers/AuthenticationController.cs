﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Orestes.Simulator.WebAPI.Security;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Orestes.Simulator.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IJwtSettings _settings;

        // Generating token based on user information
        private JwtSecurityToken GenerateAccessToken(string userName)
        {
            // Create user claims
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userName),
                // Add additional claims as needed (e.g., roles, etc.)
            };

            // Create a JWT
            var token = new JwtSecurityToken(
                issuer: _settings.Issuer,
                audience: _settings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(60), // Token expiration time
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.SecretKey)),
                    SecurityAlgorithms.HmacSha256)
            );

            return token;
        }

        public AuthenticationController(IJwtSettings settings)
        {
            _settings = settings;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginModel model)
        {
            // Check user credentials (in a real application, you'd authenticate against a database)
            if (model is { Username: "demo", Password: "password" })
            {
                // generate token for user
                var token = GenerateAccessToken(model.Username);
                // return access token for user's use
                return Ok(new { access_token = new JwtSecurityTokenHandler().WriteToken(token) });

            }
            // unauthorized user
            return Unauthorized("Invalid credentials");
        }
    }
}
