using AutoMapper;
using CSHARPAPI_WineReview.Data;
using CSHARPAPI_WineReview.Models;
using CSHARPAPI_WineReview.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSHARPAPI_WineReview.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    // Dependency Injection
    public class ReviewerController(WineReviewContext context, IMapper mapper) : WineReviewController(context, mapper)
    {
        /// <summary>
        /// Get all reviewers from the table.
        /// </summary>
        /// <returns>A list of reviewers.</returns>
        [HttpGet]
        public ActionResult<List<ReviewerDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<ReviewerDTORead>>(_context.Reviewers));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get a reviewer by ID.
        /// </summary>
        /// <param name="id">The ID of the reviewer.</param>
        /// <returns>A reviewer.</returns>
        [HttpGet("{id:int}")]
        public ActionResult<ReviewerDTORead> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                var reviewer = _context.Reviewers.Find(id);
                if (reviewer == null)
                {
                    return NotFound();
                }
                return Ok(_mapper.Map<ReviewerDTORead>(reviewer));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Create a new reviewer.
        /// </summary>
        /// <param name="dto">The reviewer data transfer object.</param>
        /// <returns>The created reviewer.</returns>
        [HttpPost]
        public IActionResult Post(ReviewerDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                var reviewer = _mapper.Map<Reviewer>(dto);
                _context.Reviewers.Add(reviewer);
                _context.SaveChanges();
                return CreatedAtAction(nameof(GetById), new { id = reviewer.Id }, _mapper.Map<ReviewerDTORead>(reviewer));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Update an existing reviewer.
        /// </summary>
        /// <param name="id">The ID of the reviewer to update.</param>
        /// <param name="dto">The reviewer data transfer object.</param>
        /// <returns>No content.</returns>
        [HttpPut("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, ReviewerDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                var reviewer = _context.Reviewers.Find(id);
                if (reviewer == null)
                {
                    return NotFound();
                }
                _mapper.Map(dto, reviewer);
                _context.SaveChanges();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Delete a reviewer by ID.
        /// </summary>
        /// <param name="id">The ID of the reviewer to delete.</param>
        /// <returns>No content.</returns>
        [HttpDelete("{id:int}")]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                var reviewer = await _context.Reviewers.FindAsync(id);
                if (reviewer == null)
                {
                    return NotFound();
                }
                _context.Reviewers.Remove(reviewer);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get reviewers by pages.
        /// </summary>
        /// <param name="page">The page number.</param>
        /// <param name="condition">The condition to filter reviewers.</param>
        /// <returns>A list of reviewers.</returns>
        [HttpGet]
        [Route("getPages/{page}")]
        public IActionResult GetPages(int page, string condition = "")
        {

            var byPage = 4;
            condition = condition.ToLower();
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                var reviewers = _context.Reviewers
                    .Where(r => string.IsNullOrEmpty(condition) || r.FirstName.Contains(condition) || r.LastName.Contains(condition))
                     .Skip((byPage * page) - byPage)
                    .Take(byPage)
                    .ToList();
                return Ok(_mapper.Map<List<ReviewerDTORead>>(reviewers));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
