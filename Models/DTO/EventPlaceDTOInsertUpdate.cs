using System.ComponentModel.DataAnnotations;

namespace CSHARPAPI_WineReview.Models.DTO
{
    public record EventPlaceDTOInsertUpdate
    (
    [Required(ErrorMessage ="Obavezno polje")]
    string Country,
    [Required(ErrorMessage ="Obavezno polje")]
    string City,
    [Required(ErrorMessage ="Obavezno polje")]
    string PlaceName,

        string? EventName
        
    );
}
