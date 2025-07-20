using Quizzler.Server.Entities;

public record StudySetDto
{
    public required string Name { get; set; }
    public required DateTime CreatedAt { get; set; } = DateTime.Now;
    public List<Flashcard> Flashcards { get; set; } = [];
}

public record UpdateStudySetDto
{
    public required int Id { get; set; }
    public required string Name { get; set; }
    public List<Flashcard> Flashcards { get; set; } = [];
}