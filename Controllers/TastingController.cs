using CSHARPAPI_WineReview.Data;
using CSHARPAPI_WineReview.Models;
using CSHARPAPI_WineReview.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace CSHARPAPI_WineReview.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class TastingController (WineReviewContext context, IMapper mapper) : WineReviewController(context, mapper)
    {

        /// <summary>
        /// Get all tastings from the table.
        /// </summary>
        /// <returns>A list of tastings.</returns>
        [HttpGet]
        public ActionResult<List<TastingDTORead>> Get()
        {
            if (!ModelState.IsValid) {
                return BadRequest(new { message = ModelState});
            
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

                var tastingDTO = _mapper.Map<List<TastingDTORead>>(tastings);

                return tastingDTO;

            }
            catch (Exception e)
            {

         return BadRequest(new {message= e.Message});   
            }
         
        }


        /// <summary>
        /// Get a tasting by ID from the table.
        /// </summary>
        /// <param name="id">The ID of the tasting.</param>
        /// <returns>The tasting with the specified ID.</returns>
        [HttpGet("{id:int}")]
        [Produces("application/json")]
        public ActionResult<List<TastingDTORead>> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });

            }

           
            try
            {
                // DB query for retrieve data
                var tasting = _context.Tastings.FindAsync(id)
                 .Include(r => r.Reviewer)
                    .Include(e => e.EventPlace)
                    .Include(w => w.Wine)
                    
                .ToList();
                 

                // result mapped to DTO

                var tastingDTO = _mapper.Map<List<TastingDTORead>>(tasting);

              

                return tastingDTO;

            }
            catch (Exception e)
            {

                return BadRequest(new { message = e.Message });
            }

        }

        /// <summary>
        /// Create a new tasting entry in the table.
        /// </summary>
        /// <param name="tasting">The tasting to create.</param>
        /// <returns>The created tasting.</returns>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Tasting tasting)
        {
            if (tasting == null || tasting.EventPlace.Id == 0 || tasting.Wine.Id == 0 || tasting.Reviewer.Id == 0 || string.IsNullOrEmpty(tasting.Review))
            {
                return BadRequest(new { message = "Nema dovoljno podataka" });
            }

            _context.Tastings.Add(tasting);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = tasting.Id }, tasting);
        }

        /// <summary>
        /// Update an existing tasting entry in the table.
        /// </summary>
        /// <param name="id">The ID of the tasting to update.</param>
        /// <param name="tasting">The updated tasting data.</param>
        /// <returns>A status indicating the result of the update.</returns>
        [HttpPut("{id:int}")]
        [Produces("application/json")]
        public async Task<IActionResult> Put(int id, [FromBody] Tasting tasting)
        {
            if (tasting == null || tasting.EventPlace.Id == 0 || tasting.Wine.Id == 0 || tasting.Reviewer.Id == 0 || string.IsNullOrEmpty(tasting.Review))
            {
                return BadRequest(new { message = "Nema dovoljno podataka" });
            }

            var existingTasting = await _context.Tastings.FindAsync(id);
            if (existingTasting == null)
            {
                return NotFound(new { message = "Podatak nije pronađen" });
            }

            existingTasting.Reviewer.Id = tasting.Reviewer.Id;
            existingTasting.EventPlace.Id = tasting.EventPlace.Id;
            existingTasting.Wine.Id = tasting.Wine.Id;
            existingTasting.Review = tasting.Review;
            existingTasting.EventDate = tasting.EventDate;

            _context.Tastings.Update(existingTasting);
            await _context.SaveChangesAsync();
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
