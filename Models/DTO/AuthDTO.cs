using System.ComponentModel.DataAnnotations;

namespace CSHARPAPI_WineReview.Models.DTO
{
    public record AuthDTO(
    
        [Required(ErrorMessage = "Email je obavezan.")]
        string? Email,

    [Required(ErrorMessage = "Lozinka je obavezna.")]
            string? Pass);
    
}
