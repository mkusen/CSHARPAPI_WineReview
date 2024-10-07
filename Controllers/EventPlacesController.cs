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
    public class EventPlacesController(WineReviewContext context, IMapper mapper) : WineReviewController(context, mapper)
    {
    
        /// <summary>
        /// Get all rows from the table.
        /// </summary>
        /// <returns>A list of event places.</returns>
        [HttpGet]
        public ActionResult<List<EventPlaceDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<EventPlaceDTORead>>(_context.EventPlaces));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get a row by ID from the table.
        /// </summary>
        /// <param name="id">The ID of the event place.</param>
        /// <returns>The event place with the specified ID.</returns>
        [HttpGet("{id:int}")]
        public ActionResult<List<EventPlaceDTORead>> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            EventPlace? e;
            try
            {
                e = _context.EventPlaces.FirstOrDefault(e => e.Id == id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { message = "Događaj ne postoji u bazi" });
            }

            return Ok(_mapper.Map<EventPlaceDTORead>(e));

        }

        /// <summary>
        /// Create a new entry in the table.
        /// </summary>
        /// <param name="eventPlace">The event place to create.</param>
        /// <returns>The created event place.</returns>
        [HttpPost]
        public IActionResult Post(EventPlaceDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            EventPlace? e;

            //creates new entry in EventPlace table
            try
            {

                e = _mapper.Map<EventPlace>(dto);
                _context.EventPlaces.Add(e);
                
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<EventPlace>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Update an existing entry in the table.
        /// </summary>
        /// <param name="id">The ID of the event place to update.</param>
        /// <param name="eventPlace">The updated event place data.</param>
        /// <returns>A status indicating the result of the update.</returns>
        [HttpPut("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, EventPlaceDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            EventPlace? e;
            //updates existing entry retrieve by ID in EventPlace table
            try
            {
                e = _context.EventPlaces.FirstOrDefault(e => e.Id == id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            e = _mapper.Map(dto, e);
            _context.EventPlaces.Update(e);

            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, new { message = "Uspješno promijenjeno", eventplace = _mapper.Map<EventPlace>(e) });

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
