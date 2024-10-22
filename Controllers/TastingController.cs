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
    public class TastingController : WineReviewController
    {
        public TastingController(WineReviewContext context, IMapper mapper) : base(context, mapper) { }

        /// <summary>
        /// Get all tastings from the table.
        /// </summary>
        /// <returns>A list of tastings.</returns>
        [HttpGet]
        public ActionResult<List<TastingDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                var tasting = _context.Tastings
                    .Include(r => r.Reviewer)
                    .Include(e => e.EventPlace)
                    .Include(w => w.Wine);
                return _mapper.Map<List<TastingDTORead>>(tasting);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        /// <summary>
        /// Get a tasting by ID from the table.
        /// </summary>
        /// <param name="id">The ID of the tasting.</param>
        /// <returns>The tasting with the specified ID.</returns>
        [HttpGet("{id:int}")]
        [Produces("application/json")]
        public ActionResult<TastingDTORead> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            Tasting? t;
            try
            {
                t = _context.Tastings
                    .Include(r => r.Reviewer)
                    .Include(e => e.EventPlace)
                    .Include(w => w.Wine)
                    .FirstOrDefault(t => t.Id == id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (t == null)
            {
                return NotFound(new { message = "Recenzija ne postoji" });
            }
            return Ok(_mapper.Map<TastingDTORead>(t));
        }

        /// <summary>
        /// Create a new tasting entry in the table.
        /// </summary>
        /// <param name="dto">The tasting to create.</param>
        /// <returns>The created tasting.</returns>
        [HttpPost]
        public IActionResult Post(TastingDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            Wine? w;
            try
            {
                w = _context.Wines.Find(dto.WineId);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (w == null)
            {
                return NotFound(new { message = "Vino ne postoji u bazi" });
            }

            EventPlace? e;
            try
            {
                e = _context.EventPlaces.Find(dto.EventId);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { message = "Događaj ne postoji u bazi" });
            }

            Reviewer? r;
            try
            {
                r = _context.Reviewers.Find(dto.ReviewerId);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (r == null)
            {
                return NotFound(new { message = "Recenzent ne postoji u bazi" });
            }

            try
            {
                var t = _mapper.Map<Tasting>(dto);
                t.Wine = w;
                t.Reviewer = r;
                t.EventPlace = e;
                _context.Tastings.Add(t);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<Tasting>(t));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Update an existing tasting entry in the table.
        /// </summary>
        /// <param name="id">The ID of the tasting to update.</param>
        /// <param name="dto">The updated tasting data.</param>
        /// <returns>A status indicating the result of the update.</returns>
        [HttpPut("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, TastingDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            Tasting? t;
            try
            {
                t = _context.Tastings.FirstOrDefault(t => t.Id == id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (t == null)
            {
                return NotFound(new { message = "Unos ne postoji" });
            }

            t = _mapper.Map(dto, t);
            _context.Tastings.Update(t);
            _context.SaveChanges();

            return Ok(new { message = "Uspješno promijenjeno" });
        }

        /// <summary>
        /// Delete a tasting by ID from the table.
        /// </summary>
        /// <param name="id">The ID of the tasting to delete.</param>
        /// <returns>A status indicating the result of the delete operation.</returns>
        [HttpDelete("{id:int}")]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(int id)
        {
            var tasting = await _context.Tastings.FindAsync(id);
            if (tasting == null)
            {
                return NotFound(new { message = "Podatak nije pronađen" });
            }

            try
            {
                _context.Tastings.Remove(tasting);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "nije obrisano" });
            }

            return Ok(new { message = "Uspješno obrisano" });
        }

        /// <summary>
        /// Get tastings by page with optional condition.
        /// </summary>
        /// <param name="page">The page number.</param>
        /// <param name="condition">The optional condition to filter tastings.</param>
        /// <returns>A list of tastings for the specified page.</returns>
        [HttpGet]
        [Route("getPages/{page}")]
        public IActionResult GetPages(int page, string condition = "")
        {
            var byPage = 4;
            condition = condition.ToLower();
            try
            {
                var tastings = _context.Tastings
                    .Include(r => r.Reviewer)
                    .Include(e => e.EventPlace)
                    .Include(w => w.Wine)
                    .Where(r => EF.Functions.Like(r.Review.ToLower(), "%" + condition + "%"))
                    .Skip((byPage * page) - byPage)
                    .Take(byPage)
                    .ToList();

                return Ok(_mapper.Map<List<TastingDTORead>>(tastings));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
