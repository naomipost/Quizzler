using Quizzler.Server.Entities;
using Quizzler.Server.Services;

public record UserSignUpDto(
    string Username, string Password, string Email
);

public record LoginDto(
    string Username,
    string Password
);

// DTO for user response without sensitive data
public record UserResponseDto(
    int Id,
    string Username,
    string Email
);

public static class UserDtoExtensions
{
    public static User ToUser(this UserSignUpDto @this, IPasswordService passwordService) => new()
    {
        Username = @this.Username,
        Email = @this.Email,
        PasswordHash = passwordService.HashPassword(@this.Password)
    };

    public static UserResponseDto ToUserResponseDto(this User @this) => new(
        @this.Id,
        @this.Username,
        @this.Email
    );
}