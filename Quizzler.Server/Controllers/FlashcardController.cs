using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quizzler.Entities;
using Quizzler.Server.Entities;

namespace Quizzler.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class FlashcardController : ControllerBase
    {
        private readonly QuizzlerContext _context;
        public FlashcardController(QuizzlerContext context)
        {
            _context = context;
        }
        [HttpGet("flashcards")]
        public async Task<ActionResult<List<Flashcard>>> GetFlashcards()
        {
            return Ok(await _context.Flashcards.ToListAsync());
        }
        [HttpGet("flashcard/{id}")]
        public async Task<ActionResult<Flashcard>> GetFlashcard(int id)
        {
            var flashcard = await _context.Flashcards.FindAsync(id);
            if (flashcard is null)
            {
                return NotFound($"Flashcard {id} was not found");
            }
            return Ok(flashcard);
        }
        [HttpPut("update-strength/{id}")]
        public async Task<ActionResult> UpdateFlashcardStrength(int id, [FromBody] int newStrength)
        {
            var flashcard = await _context.Flashcards.FindAsync(id);
            if (flashcard is null)
            {
                return NotFound($"Flashcard {id} was not found");
            }

            flashcard.Strength = newStrength;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}