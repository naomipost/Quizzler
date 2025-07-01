using System;
using System.Collections.Generic;
using Quizzler.Controllers;

namespace Quizzler.Server.Entities
{
    public class User
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public List<StudySet> StudySets { get; set; } = [];
    }
}