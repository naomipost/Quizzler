using Microsoft.EntityFrameworkCore;
using Quizzler.Server.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quizzler.Entities
{
    public class QuizzlerContext : DbContext
    {
        public QuizzlerContext(DbContextOptions<QuizzlerContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<StudySet> StudySets { get; set; }
        public DbSet<Flashcard> Flashcards { get; set; }
    }
}