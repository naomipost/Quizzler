using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quizzler.Entities;
using Quizzler.Server.Entities;

namespace Quizzler.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly QuizzlerContext _context;

        public UserController(QuizzlerContext context)
        {
            _context = context;
        }

        [HttpGet("whoami")]
        public async Task<ActionResult<User>> Whoami(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                return BadRequest("Username is required");
            }

            var user = await _context.Users.FindAsync(username);

            if (user == null)
            {
                return NotFound($"User with username {username} not found");
            }

            return Ok(user);
        }
        [HttpGet("all-users")]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }
        [HttpPost("sign-up")]
        public async Task<ActionResult<User>> SignUp([FromBody] UserSignUpDto signUpDto)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(signUpDto.Username))
            {
                return BadRequest("Username is required");
            }

            if (string.IsNullOrWhiteSpace(signUpDto.Password))
            {
                return BadRequest("Password is required");
            }

            // Check if user already exists
            if (await _context.Users.AnyAsync(u => u.Username == signUpDto.Username))
            {
                return Conflict("Username already exists");
            }

            // Create new user (add password hashing in production!)
            var newUserDto = new UserSignUpDto(
                signUpDto.Username,
                signUpDto.Password, // Hash this in production!
                signUpDto.Email
            );

            var user = newUserDto.ToUser();

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Return the created user with ID
            return Ok(new
            {
                user.Id,
                user.Username,
                user.Email
                // Exclude password!
            });
        }
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] LoginDto request)
        {
            // 1. Basic validation
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("Username and password are required");
            }

            // 2. Find user
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }

            // 3. Verify password (plain text comparison - NOT for production!)
            if (request.Password != user.PasswordHash) // Replace with hashing later
            {
                return Unauthorized("Invalid credentials");
            }

            // 4. Return user without sensitive data
            return Ok(new
            {
                user.Id,
                user.Username,
                user.Email
                // Exclude password!
            });
        }
    }
}