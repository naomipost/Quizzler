using System;
using System.Collections.Generic;
using Quizzler.Controllers;

namespace Quizzler.Server.Entities
{
    public class Flashcard
    {
        public int Id { get; set; }
        public required int StudySetId { get; set; }
        public required string Front { get; set; }
        public required string Back { get; set; }
        public required int Strength { get; set; }
    }
}