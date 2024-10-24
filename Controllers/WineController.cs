using AutoMapper;
using CSHARPAPI_WineReview.Data;
using CSHARPAPI_WineReview.Models;
using CSHARPAPI_WineReview.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

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


        [HttpGet]
        [Route("getPages/{page}")]
        public IActionResult GetPages(int page, string condition = "")
        {
            var byPage = 4;
            condition = condition.ToLower();
            try
            {
                var wines = _context.Wines
                    .Where(w => EF.Functions.Like(w.Maker.ToLower(), "%" + condition + "%")
                    || EF.Functions.Like(w.WineName.ToLower(), "%" + condition + "%")
                    || EF.Functions.Like(w.YearOfHarvest.ToLower(), "%" + condition + "%"))
                    .Skip((byPage * page) - byPage)
                    .Take(byPage)
                    .ToList();

                return Ok(_mapper.Map<List<WineDTORead>>(wines));
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("setPicture/{id:int}")]
        public IActionResult SetPic(int id, ImageDTO image) {
            if (id <= 0)
            {
                return BadRequest("Šifra mora biti veća od nula (0)");
            }
            if (image.Base64 == null || image.Base64?.Length == 0)
            {
                return BadRequest("Slika nije postavljena");
            }
            var p = _context.Wines.Find(id);
            if (p == null)
            {
                return BadRequest("Ne postoji vino s šifrom: " + id + ".");
            }
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string dir = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "images" + ds + "wines");

                if (!System.IO.Directory.Exists(dir))
                {
                    System.IO.Directory.CreateDirectory(dir);
                }
                var putanja = Path.Combine(dir + ds + id + ".png");
                System.IO.File.WriteAllBytes(putanja, Convert.FromBase64String(image.Base64!));
                return Ok("Uspješno pohranjena slika");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }

}

