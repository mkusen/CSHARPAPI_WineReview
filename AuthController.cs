using CSHARPAPI_WineReview.Data;
using CSHARPAPI_WineReview.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace CSHARPAPI_WineReview.Controllers
{
    /// <summary>
    /// Controller for handling authorization related actions.
    /// </summary>
    /// <remarks>
    /// Initializes a new instance of the <see cref="AuthController"/> class.
    /// </remarks>
    /// <param name="context">The database context.</param>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly WineReviewContext _context;

        public AuthController(WineReviewContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Generates a JWT token for the given operator.
        /// </summary>
        /// <param name="reviewer">The operator data transfer object.</param>
        /// <returns>The generated JWT token.</returns>
        [HttpPost("token")]
        public IActionResult GenerateToken(AuthDTO reviewer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = _context.Reviewers
                   .Where(u => u.Email!.Equals(reviewer.Email))
                   .FirstOrDefault();
            if (user == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Niste autorizirani, ne mogu na?i korisnika");
            }
            if (!BCrypt.Net.BCrypt.Verify(reviewer.Pass, user.Pass))
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Niste autorizirani, lozinka ne odgovara");
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("MojKljucKojijeJakoTajan i dovoljno duga?ak da se može koristiti");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.UtcNow.Add(TimeSpan.FromHours(8)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);
            return Ok(jwt);
        }
    }
}
