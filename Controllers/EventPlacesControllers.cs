using CSHARPAPI_WineReview.Data;
using CSHARPAPI_WineReview.Models;
using Microsoft.AspNetCore.Mvc;

namespace CSHARPAPI_WineReview.Controllers
{
    //napisao ja
    [ApiController]
    [Route("api/v1/[controller]")]
    public class EventPlacesControllers:ControllerBase
    {
       //dependency injection     

        private readonly WineReviewContext _context;

        //constructor injection
        public EventPlacesControllers(WineReviewContext context)
        {
            _context = context;
        }

        //route for  DB query

        /// <summary>
        /// get all rows from table
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.EventPlaces);
        }

        /// <summary>
        /// get row by ID from table
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetById(int id)
        {
            return Ok(_context.EventPlaces.Find(id));
        }

        /// <summary>
        /// create new entry to table
        /// </summary>
        /// <param name="eventPlace"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post(EventPlace eventPlace) 
        {
            _context.EventPlaces.Add(eventPlace);   
            _context.SaveChanges(); 
            return StatusCode(StatusCodes.Status201Created, eventPlace);
        }

        /// <summary>
        /// updates (changes) data in row selected by ID
        /// </summary>
        /// <param name="id"></param>
        /// <param name="eventPlace"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, EventPlace eventPlace)
        {
            var ep = _context.EventPlaces.Find(id);

            ep.Country = eventPlace.Country;
            ep.City= eventPlace.City;   
            ep.PlaceName= eventPlace.PlaceName;
            ep.EventName= eventPlace.EventName;

            _context.EventPlaces.Update(ep);            
            _context.SaveChanges();
            return Ok(new { message = "uspješno promijenjeno" });
        }

        /// <summary>
        /// deletes row selected by ID 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id) 
        {
            var ep = _context.EventPlaces.Find(id);
            _context.EventPlaces.Remove(ep);
            _context.SaveChanges();

            return Ok(new { message = "uspješno obrisano" });
        }
        

    }
}
