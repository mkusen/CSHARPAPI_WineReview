using CSHARPAPI_WineReview.Data;
using CSHARPAPI_WineReview.Models;
using Microsoft.AspNetCore.Mvc;

namespace CSHARPAPI_WineReview.Controllers
{

    //napravljena uz pomoć chatGPT

    [ApiController]
    [Route("api/v1/[controller]")]
    public class ReviewerController:ControllerBase
    {

        // Dependency Injection
        private readonly WineReviewContext _context;

        // Constructor Injection
        public ReviewerController(WineReviewContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get all rows from the Reviewers table.
        /// </summary>
        /// <returns>A list of reviewers.</returns>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Reviewers);
        }

        /// <summary>
        /// Get a row by ID from the Reviewers table.
        /// </summary>
        /// <param name="id">The ID of the reviewer.</param>
        /// <returns>The reviewer with the specified ID.</returns>
        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var reviewer = _context.Reviewers.Find(id);
            if (reviewer == null)
            {
                return NotFound(new { message = "Reviewer not found" });
            }
            return Ok(reviewer);
        }

        /// <summary>
        /// Create a new entry in the Reviewers table.
        /// </summary>
        /// <param name="reviewer">The reviewer to create.</param>
        /// <returns>The created reviewer.</returns>
        [HttpPost]
        public IActionResult Post([FromBody] Reviewer reviewer)
        {
            if (reviewer == null)
            {
                return BadRequest(new { message = "Invalid data" });
            }

            _context.Reviewers.Add(reviewer);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, reviewer);
        }

        /// <summary>
        /// Update an existing entry in the Reviewers table.
        /// </summary>
        /// <param name="id">The ID of the reviewer to update.</param>
        /// <param name="reviewer">The updated reviewer data.</param>
        /// <returns>A status indicating the result of the update.</returns>
        [HttpPut("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, [FromBody] Reviewer reviewer)
        {
            if (reviewer == null)
            {
                return BadRequest(new { message = "Invalid data" });
            }

            var existingReviewer = _context.Reviewers.Find(id);
            if (existingReviewer == null)
            {
                return NotFound(new { message = "Reviewer not found" });
            }

            existingReviewer.Name = reviewer.Name;
            existingReviewer.Email = reviewer.Email;
            // Add other property updates as needed

            _context.Reviewers.Update(existingReviewer);
            _context.SaveChanges();
            return Ok(new { message = "Successfully updated" });
        }

        /// <summary>
        /// Delete a row by ID from the Reviewers table.
        /// </summary>
        /// <param name="id">The ID of the reviewer to delete.</param>
        /// <returns>A status indicating the result of the delete operation.</returns>
        [HttpDelete("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var reviewer = _context.Reviewers.Find(id);
            if (reviewer == null)
            {
                return NotFound(new { message = "Reviewer not found" });
            }

            _context.Reviewers.Remove(reviewer);
            _context.SaveChanges();
            return Ok(new { message = "Successfully deleted" });
        }



    }
}
