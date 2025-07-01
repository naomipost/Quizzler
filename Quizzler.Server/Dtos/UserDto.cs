using Quizzler.Server.Entities;

public record UserSignUpDto(
    string Username, string Password, string Email
);

public record LoginDto(
    string Username,
    string Password
);

public static class UserDtoExtensions
{
    // public static UserSignUpDto ToUserSignUpDto (
    //     this User @this,
    //     ) {}

    public static User ToUser(this UserSignUpDto @this) => new()
    {
        Username = @this.Username,
        Email = @this.Email,
        PasswordHash = @this.Password //hash this later
    };
}