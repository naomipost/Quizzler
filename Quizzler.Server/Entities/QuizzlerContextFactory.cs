using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Quizzler.Entities;

public class QuizzlerContextFactory : IDesignTimeDbContextFactory<QuizzlerContext>
{
    public QuizzlerContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<QuizzlerContext>();
        optionsBuilder.UseMySql(
            "ConnectionStrings:DefaultConnection",
            new MySqlServerVersion(new Version(8, 0, 36)),
            mySqlOptions => mySqlOptions
                .EnableRetryOnFailure()
        );
        
        return new QuizzlerContext(optionsBuilder.Options);
    }
}