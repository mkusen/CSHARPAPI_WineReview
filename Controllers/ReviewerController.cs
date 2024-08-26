using CSHARPAPI_WineReview.Data;
using CSHARPAPI_WineReview.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSHARPAPI_WineReview.Controllers
{
    

    [ApiController]
    [Route("api/v1/[controller]")]
    public class ReviewerController : ControllerBase
    {
        //dependency injection
        private readonly WineReviewContext _context;
        //constructor injection
        public ReviewerController(WineReviewContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get all reviewers from the table.
        /// </summary>
        /// <returns>A list of reviewers.</returns>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var reviewers = await _context.Reviewers.ToListAsync();
            return Ok(reviewers);
        }

        /// <summary>
        /// Get a reviewer by ID from the table.
        /// </summary>
        /// <param name="id">The ID of the reviewer.</param>
        /// <returns>The reviewer with the specified ID.</returns>
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var reviewer = await _context.Reviewers.FindAsync(id);
            if (reviewer == null)
            {
                return NotFound(new { message = "Korisnik nije pronađen" });
            }
            return Ok(reviewer);
        }

        /// <summary>
        /// Create a new reviewer entry in the table.
        /// </summary>
        /// <param name="reviewer">The reviewer to create.</param>
        /// <returns>The created reviewer.</returns>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Reviewer reviewer)
        {
            if (reviewer == null || string.IsNullOrWhiteSpace(reviewer.Email) || string.IsNullOrWhiteSpace(reviewer.FirstName) || string.IsNullOrWhiteSpace(reviewer.LastName))
            {
                return BadRequest(new { message = "Nema dovoljno podataka" });
            }

            _context.Reviewers.Add(reviewer);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = reviewer.Id }, reviewer);
        }

        /// <summary>
        /// Update an existing reviewer entry in the table.
        /// </summary>
        /// <param name="id">The ID of the reviewer to update.</param>
        /// <param name="reviewer">The updated reviewer data.</param>
        /// <returns>A status indicating the result of the update.</returns>
        [HttpPut("{id:int}")]
        [Produces("application/json")]
        public async Task<IActionResult> Put(int id, [FromBody] Reviewer reviewer)
        {
            if (reviewer == null || string.IsNullOrWhiteSpace(reviewer.Email) || string.IsNullOrWhiteSpace(reviewer.FirstName) || string.IsNullOrWhiteSpace(reviewer.LastName))
            {
                return BadRequest(new { message = "Nema dovoljno podataka" });
            }

            var existingReviewer = await _context.Reviewers.FindAsync(id);
            if (existingReviewer == null)
            {
                return NotFound(new { message = "Korisnik nije pronađen" });
            }

            existingReviewer.Email = reviewer.Email;
            existingReviewer.Pass = reviewer.Pass;
            existingReviewer.FirstName = reviewer.FirstName;
            existingReviewer.LastName = reviewer.LastName;

            _context.Reviewers.Update(existingReviewer);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Uspješno promijenjeno" });
        }

        /// <summary>
        /// Delete a reviewer by ID from the table.
        /// </summary>
        /// <param name="id">The ID of the reviewer to delete.</param>
        /// <returns>A status indicating the result of the delete operation.</returns>
        [HttpDelete("{id:int}")]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(int id)
        {
            var reviewer = await _context.Reviewers.FindAsync(id);
            if (reviewer == null)
            {
                return NotFound(new { message = "Korisnik nije pronađen" });
            }

            _context.Reviewers.Remove(reviewer);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Uspješno obrisano" });
        }
    }
}
