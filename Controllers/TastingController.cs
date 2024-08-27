using CSHARPAPI_WineReview.Data;
using CSHARPAPI_WineReview.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSHARPAPI_WineReview.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class TastingController:ControllerBase
    {

        //dependency injection
        private readonly WineReviewContext _context;
        //constructor injection
        public TastingController(WineReviewContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get all tastings from the table.
        /// </summary>
        /// <returns>A list of tastings.</returns>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var tastings = await _context.Tastings.ToListAsync();
            return Ok(tastings);
        }


        /// <summary>
        /// Get a tasting by ID from the table.
        /// </summary>
        /// <param name="id">The ID of the tasting.</param>
        /// <returns>The tasting with the specified ID.</returns>
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var tasting = await _context.Tastings.FindAsync(id);
            if (tasting == null)
            {
                return NotFound(new { message = "Podatak nije pronađen" });
            }
            return Ok(tasting);
        }

        /// <summary>
        /// Create a new tasting entry in the table.
        /// </summary>
        /// <param name="tasting">The tasting to create.</param>
        /// <returns>The created tasting.</returns>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Tasting tasting)
        {
            if (tasting == null || tasting.IdEventPlace == 0 || tasting.IdWine ==0 || tasting.IdReviewer ==0 || string.IsNullOrEmpty(tasting.Review))
            {
                return BadRequest(new { message = "Nema dovoljno podataka" });
            }
            
            _context.Tastings.Add(tasting);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = tasting.Id }, tasting);
        }


    }
}
