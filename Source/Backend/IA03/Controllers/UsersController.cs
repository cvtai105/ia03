using IA03.Data;
using IA03.DTO;
using IA03.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace IA03.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "user")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            // Get the user ID from the authorization token
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            
            // Check if the ID in the token matches the route ID
            if (userId == null || userId != id.ToString())
            {
                return Forbid();
            }

            var user = await _context.Users.FindAsync(id);
            
            if (user == null)
            {
                return NotFound(); 
            }
            
            return Ok(new { user.Id, user.Email, user.Name }); 
        }
        
    }
}
