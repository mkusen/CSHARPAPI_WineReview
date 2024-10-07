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
    public class TastingController(WineReviewContext context, IMapper mapper) : WineReviewController(context, mapper)
    {

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
                // DB query for retrieve data
                var tastings = _context.Tastings
                    .Include(r => r.Reviewer)
                    .Include(e => e.EventPlace)
                    .Include(w => w.Wine)
                    .ToList();

                // result mapped to DTO
                return _mapper.Map<List<TastingDTORead>>(tastings);
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
                // DB query for retrieve data by ID
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
            // result mapped to DTO
            return Ok(_mapper.Map<TastingDTORead>(t));
        }

        /// <summary>
        /// Create a new tasting entry in the table.
        /// </summary>
        /// <param name="tasting">The tasting to create.</param>
        /// <returns>The created tasting.</returns>
        [HttpPost]
        public IActionResult Post(TastingDTOInsertUpdate dto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(new {message= ModelState});   
            }

            //get wine by ID
            Wine? w;
            try
            {
                w = _context.Wines.Find(dto.WineId);            
            }
            catch (Exception ex)
            {
                return BadRequest(new {message= ex.Message});
            }
            if (w == null)
            {
                return NotFound(new { message = "Vino ne postoji u bazi" });

            }

            //get EventPlace by ID
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

            //get Reviewer by ID
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

            //creates new entry in Tasting table
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
        /// <param name="tasting">The updated tasting data.</param>
        /// <returns>A status indicating the result of the update.</returns>
        [HttpPut("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, TastingDTOInsertUpdate dto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            //updates existing entry retrieve by ID in Tasting table
            Tasting? t;
            try
            {
                t= _context.Tastings.FirstOrDefault(t=>t.Id== id);
               
            }
            catch (Exception ex)
            {
                return BadRequest(new {message= ex.Message});
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

            //unable to delete data - handle 500 internal server error
            try
            {
                _context.Tastings.Remove(tasting);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { message = "nije obrisano" });
            }

            return Ok(new { message = "Uspješno obrisano" });
        }

    }
}
