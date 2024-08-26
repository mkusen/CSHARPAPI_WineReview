using CSHARPAPI_WineReview.Data;
using CSHARPAPI_WineReview.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSHARPAPI_WineReview.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class WineController : ControllerBase
    {

        //dependency injection
        private readonly WineReviewContext _context;
        //construktor injection
        public WineController(WineReviewContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get all wines from the table.
        /// </summary>
        /// <returns>A list of wines.</returns>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var wines = await _context.Wines.ToListAsync();
            return Ok(wines);
        }

        /// <summary>
        /// Get a wine by ID from the table.
        /// </summary>
        /// <param name="id">The ID of the wine.</param>
        /// <returns>The wine with the specified ID.</returns>
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var wine = await _context.Wines.FindAsync(id);
            if (wine == null)
            {
                return NotFound(new { message = "Vino nije pronađeno" });
            }
            return Ok(wine);
        }

        /// <summary>
        /// Create a new wine entry in the table.
        /// </summary>
        /// <param name="wine">The wine to create.</param>
        /// <returns>The created wine.</returns>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Wine wine)
        {
            if (wine == null || string.IsNullOrWhiteSpace(wine.WineName) || int.Parse(wine.YearOfHarvest) <= 0 || wine.Price <= 0)
            {
                return BadRequest(new { message = "Nema dovoljno podataka" });
            }

            _context.Wines.Add(wine);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = wine.Id }, wine);
        }

        /// <summary>
        /// Update an existing wine entry in the table.
        /// </summary>
        /// <param name="id">The ID of the wine to update.</param>
        /// <param name="wine">The updated wine data.</param>
        /// <returns>A status indicating the result of the update.</returns>
        [HttpPut("{id:int}")]
        [Produces("application/json")]
        public async Task<IActionResult> Put(int id, [FromBody] Wine wine)
        {
            if (wine == null || string.IsNullOrWhiteSpace(wine.WineName) || int.Parse(wine.YearOfHarvest) <= 0 || wine.Price <= 0)
            {
                return BadRequest(new { message = "Nema dovoljno podataka" });
            }

            var existingWine = await _context.Wines.FindAsync(id);
            if (existingWine == null)
            {
                return NotFound(new { message = "Vino nije pronađeno" });
            }

            existingWine.Maker = wine.Maker;
            existingWine.WineName = wine.WineName;
            existingWine.YearOfHarvest = wine.YearOfHarvest;
            existingWine.Price = wine.Price;

            _context.Wines.Update(existingWine);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Uspješno promijenjeno" });
        }

        /// <summary>
        /// Delete a wine by ID from the table.
        /// </summary>
        /// <param name="id">The ID of the wine to delete.</param>
        /// <returns>A status indicating the result of the delete operation.</returns>
        [HttpDelete("{id:int}")]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(int id)
        {
            var wine = await _context.Wines.FindAsync(id);
            if (wine == null)
            {
                return NotFound(new { message = "Vino nije pronađeno" });
            }

            _context.Wines.Remove(wine);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Uspješno obrisano" });
        }
    }

}

