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
    //dependency injection
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
        /// Get a reviewer by ID from the table.
        /// </summary>
        /// <param name="id">The ID of the reviewer.</param>
        /// <returns>The reviewer with the specified ID.</returns>
        [HttpGet("{id:int}")]
        public ActionResult<List<ReviewerDTORead>> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            Reviewer? r;
            try
            {
                r = _context.Reviewers.FirstOrDefault(r => r.Id == id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (r == null)
            {
                return NotFound(new { message = "Recenzent ne postoji u bazi" });
            }

            return Ok(_mapper.Map<ReviewerDTORead>(r));
        }

        /// <summary>
        /// Create a new reviewer entry in the table.
        /// </summary>
        /// <param name="reviewer">The reviewer to create.</param>
        /// <returns>The created reviewer.</returns>
        [HttpPost]
        public IActionResult Post(ReviewerDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            Reviewer? r;

            //creates new entry in Reviewer table
            try
            {

                r = _mapper.Map<Reviewer>(dto);
                _context.Reviewers.Add(r);               
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<Reviewer>(r));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Update an existing reviewer entry in the table.
        /// </summary>
        /// <param name="id">The ID of the reviewer to update.</param>
        /// <param name="reviewer">The updated reviewer data.</param>
        /// <returns>A status indicating the result of the update.</returns>
        [HttpPut("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, ReviewerDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            Reviewer? r;
            //updates existing entry retrieve by ID in Wine table
            try
            {
                r = _context.Reviewers.FirstOrDefault(r => r.Id == id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            r = _mapper.Map(dto, r);
            _context.Reviewers.Update(r);

            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, new { message = "Uspješno promijenjeno", wine = _mapper.Map<Reviewer>(r) });
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

            //unable to delete data - handle 500 internal server error
            try
            {
                _context.Reviewers.Remove(reviewer);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   new { message = "nije moguće obrisati, korisnik je napravio recenziju" });
            }

            return Ok(new { message = "Uspješno obrisano" });
        }

        [HttpGet]
        [Route("getPages/{page}")]
        public IActionResult GetPages(int page, string condition = "")
        {
            var byPage = 4;
            condition= condition.ToLower();
            try
            {
                var reviewers = _context.Reviewers
                    .Where(r => EF.Functions.Like(r.FirstName.ToLower(), "%" + condition + "%")
                    || EF.Functions.Like(r.LastName.ToLower(), "%" + condition + "%"))
                    .Skip((byPage * page) - byPage)
                    .Take(byPage)
                    .ToList();

                return Ok(_mapper.Map<List<ReviewerDTORead>>(reviewers));
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);  
            }
        }

    }
}
