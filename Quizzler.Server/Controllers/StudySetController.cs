using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quizzler.Entities;
using Quizzler.Server.Entities;

namespace Quizzler.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class StudySetController : ControllerBase
    {
        private readonly QuizzlerContext _context;
        public StudySetController(QuizzlerContext context)
        {
            _context = context;
        }
        [HttpGet("study-sets")]
        public async Task<ActionResult<List<StudySet>>> GetStudySets()
        {
            return Ok(await _context.StudySets.ToListAsync());
        }
        [HttpGet("study-set{id}")]
        public async Task<ActionResult<StudySet>> GetStudySet(int id)
        {
            var studySet = await _context.StudySets
                .Include(s => s.Flashcards)
                .FirstOrDefaultAsync(s => s.Id == id);
            if (studySet is null)
            {
                return NotFound($"Study set {id} was not found");
            }
            return Ok(studySet);
        }
        [HttpPost("create-study-set")]
        public async Task<ActionResult<StudySet>> CreateStudySet(StudySet studySet)
        {
            _context.StudySets.Add(studySet);
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpPut("update-study-set/{id}")]
        public async Task<ActionResult<StudySet>> UpdateStudySet(int id, UpdateStudySetDto updatedStudySet)
        {
            if (id != updatedStudySet.Id)
            {
                return BadRequest("Route ID does not match the payload ID.");
            }

            var existingStudySet = await _context.StudySets
                .Include(s => s.Flashcards)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (existingStudySet is null)
            {
                return NotFound($"Study set {id} was not found");
            }

            // Update the study set name
            existingStudySet.Name = updatedStudySet.Name;

            // Update flashcards
            foreach (var updatedFlashcard in updatedStudySet.Flashcards)
            {
                var existingFlashcard = existingStudySet.Flashcards.FirstOrDefault(f => f.Id == updatedFlashcard.Id);
                if (existingFlashcard != null)
                {
                    // Update existing flashcard
                    existingFlashcard.Front = updatedFlashcard.Front;
                    existingFlashcard.Back = updatedFlashcard.Back;
                }
                else
                {
                    // Add new flashcard
                    existingStudySet.Flashcards.Add(updatedFlashcard);
                }
            }

            // Remove flashcards that are no longer in the updated list
            var flashcardsToRemove = existingStudySet.Flashcards
                .Where(f => !updatedStudySet.Flashcards.Any(uf => uf.Id == f.Id))
                .ToList();

            foreach (var flashcardToRemove in flashcardsToRemove)
            {
                existingStudySet.Flashcards.Remove(flashcardToRemove);
                _context.Flashcards.Remove(flashcardToRemove);
            }

            await _context.SaveChangesAsync();

            return Ok(existingStudySet);
        }
    }
}
