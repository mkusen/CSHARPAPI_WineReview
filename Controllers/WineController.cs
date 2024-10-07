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
    public class WineController(WineReviewContext context, IMapper mapper) : WineReviewController(context, mapper)
    {
        /// <summary>
        /// Get all wines from the table.
        /// </summary>
        /// <returns>A list of wines.</returns>
        [HttpGet]
        public ActionResult<List<WineDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<WineDTORead>>(_context.Wines));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get a wine by ID from the table.
        /// </summary>
        /// <param name="id">The ID of the wine.</param>
        /// <returns>The wine with the specified ID.</returns>
        [HttpGet("{id:int}")]
        public ActionResult<List<WineDTORead>> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            Wine? w;
            try
            {
                w = _context.Wines.FirstOrDefault(w => w.Id == id);               
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (w == null)
            {
                return NotFound(new { message = "Vino ne postoji u bazi" });
            }

            return Ok(_mapper.Map<WineDTORead>(w));

        }

        /// <summary>
        /// Create a new wine entry in the table.
        /// </summary>
        /// <param name="wine">The wine to create.</param>
        /// <returns>The created wine.</returns>
        [HttpPost]
        public IActionResult Post(WineDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            Wine? w;

            //creates new entry in Wine table
            try
            {

                w = _mapper.Map<Wine>(dto);
                _context.Wines.Add(w);
                if (w.YearOfHarvest.Length > 5)
                {
                    return NotFound(new { message = "Godina berbe ne smije sadržavati više od 5 znakova" });
                }
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<Wine>(w));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Update an existing wine entry in the table.
        /// </summary>
        /// <param name="id">The ID of the wine to update.</param>
        /// <param name="wine">The updated wine data.</param>
        /// <returns>A status indicating the result of the update.</returns>
        [HttpPut("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, WineDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            Wine? w;
            //updates existing entry retrieve by ID in Wine table
            try
            {
                w = _context.Wines.FirstOrDefault(w => w.Id == id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            w = _mapper.Map(dto, w);
            _context.Wines.Update(w);

            if (w.YearOfHarvest.Length > 5)
            {
                return NotFound(new { message = "Godina berbe ne smije sadržavati više od 5 znakova" });
            }

            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, new { message = "Uspješno promijenjeno", wine=_mapper.Map<Wine>(w) });

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

            //unable to delete data - handle 500 internal server error
            try
            {
                _context.Wines.Remove(wine);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { message = "nije moguće brisanje, za vino je već napravljena recenzija" });
            }

            return Ok(new { message = "Uspješno obrisano" });
        }
    }

}

