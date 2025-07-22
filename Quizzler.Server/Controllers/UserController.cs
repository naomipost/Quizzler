using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quizzler.Entities;
using Quizzler.Server.Entities;
using Quizzler.Server.Services;

namespace Quizzler.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly QuizzlerContext _context;
        private readonly IPasswordService _passwordService;

        public UserController(QuizzlerContext context, IPasswordService passwordService)
        {
            _context = context;
            _passwordService = passwordService;
        }

        [HttpGet("whoami")]
        public async Task<ActionResult<UserResponseDto>> Whoami(string username)
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

            return Ok(user.ToUserResponseDto());
        }
        [HttpGet("all-users")]
        public async Task<ActionResult<List<UserResponseDto>>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            
            var safeUsers = users.Select(user => user.ToUserResponseDto()).ToList();
            
            return Ok(safeUsers);
        }
        [HttpPost("sign-up")]
        public async Task<ActionResult<User>> SignUp([FromBody] UserSignUpDto signUpDto)
        {
            if (string.IsNullOrWhiteSpace(signUpDto.Username))
            {
                return BadRequest("Username is required");
            }

            if (string.IsNullOrWhiteSpace(signUpDto.Password))
            {
                return BadRequest("Password is required");
            }

            if (await _context.Users.AnyAsync(u => u.Username == signUpDto.Username))
            {
                return Conflict("Username already exists");
            }

            // Create new user with hashed password
            var user = signUpDto.ToUser(_passwordService);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user.ToUserResponseDto());
        }
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] LoginDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("Username and password are required");
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }

            // Verify password using secure hash comparison
            if (!_passwordService.VerifyPassword(request.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid credentials");
            }

            return Ok(user.ToUserResponseDto());
        }
    }
}