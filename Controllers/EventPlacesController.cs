using CSHARPAPI_WineReview.Data;
using CSHARPAPI_WineReview.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSHARPAPI_WineReview.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class EventPlacesController(WineReviewContext context) : ControllerBase
    {
        // Dependency Injection
        private readonly WineReviewContext _context = context;

        /// <summary>
        /// Get all rows from the table.
        /// </summary>
        /// <returns>A list of event places.</returns>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var eventPlaces = await _context.EventPlaces.ToListAsync();
            return Ok(eventPlaces);
        }

        /// <summary>
        /// Get a row by ID from the table.
        /// </summary>
        /// <param name="id">The ID of the event place.</param>
        /// <returns>The event place with the specified ID.</returns>
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var eventPlace = await _context.EventPlaces.FindAsync(id);
            if (eventPlace == null)
            {
                return NotFound(new { message = "Unos nije pronađen" });
            }
            return Ok(eventPlace);
        }

        /// <summary>
        /// Create a new entry in the table.
        /// </summary>
        /// <param name="eventPlace">The event place to create.</param>
        /// <returns>The created event place.</returns>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EventPlace eventPlace)
        {
            if (eventPlace == null || string.IsNullOrWhiteSpace(eventPlace.PlaceName) || string.IsNullOrWhiteSpace(eventPlace.EventName))
            {
                return BadRequest(new { message = "Nema dovoljno podataka" });
            }

            _context.EventPlaces.Add(eventPlace);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = eventPlace.Id }, eventPlace);
        }

        /// <summary>
        /// Update an existing entry in the table.
        /// </summary>
        /// <param name="id">The ID of the event place to update.</param>
        /// <param name="eventPlace">The updated event place data.</param>
        /// <returns>A status indicating the result of the update.</returns>
        [HttpPut("{id:int}")]
        [Produces("application/json")]
        public async Task<IActionResult> Put(int id, [FromBody] EventPlace eventPlace)
        {
            if (eventPlace == null || string.IsNullOrWhiteSpace(eventPlace.PlaceName) || string.IsNullOrWhiteSpace(eventPlace.EventName))
            {
                return BadRequest(new { message = "Nema dovoljno podataka" });
            }

            var existingEventPlace = await _context.EventPlaces.FindAsync(id);
            if (existingEventPlace == null)
            {
                return NotFound(new { message = "Unos nije pronađen" });
            }

            existingEventPlace.Country = eventPlace.Country;
            existingEventPlace.City = eventPlace.City;
            existingEventPlace.PlaceName = eventPlace.PlaceName;
            existingEventPlace.EventName = eventPlace.EventName;

            _context.EventPlaces.Update(existingEventPlace);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Uspješno promijenjeno" });
        }

        /// <summary>
        /// Delete a row by ID from the table.
        /// </summary>
        /// <param name="id">The ID of the event place to delete.</param>
        /// <returns>A status indicating the result of the delete operation.</returns>
        [HttpDelete("{id:int}")]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(int id)
        {
            var eventPlace = await _context.EventPlaces.FindAsync(id);
            if (eventPlace == null)
            {
                return NotFound(new { message = "Unos nije pronađen" });
            }

            //unable to delete data - handle 500 internal server error
            try
            {
                _context.EventPlaces.Remove(eventPlace);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { message = "nije moguće brisanje, mjesto je ocjenjeno" });
            }

            return Ok(new { message = "Uspješno obrisano" });
        }
    }

}
