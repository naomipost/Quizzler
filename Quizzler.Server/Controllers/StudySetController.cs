using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quizzler.Entities;
using Quizzler.Server.Entities;

namespace Quizzler.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class StudySetController : ControllerBase
{        private readonly QuizzlerContext _context;
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
            var studySet = await _context.StudySets.FindAsync(id);
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

    }
}
