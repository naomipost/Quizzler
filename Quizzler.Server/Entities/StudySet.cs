using System;
using System.Collections.Generic;
using Quizzler.Controllers;

namespace Quizzler.Server.Entities
{
    public class StudySet
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required DateTime CreatedAt { get; set; }
        public List<Flashcard> Flashcards { get; set; } = [];
    }
}