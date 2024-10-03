using System.ComponentModel.DataAnnotations;

namespace CSHARPAPI_WineReview.Models.DTO
{
    public record EventPlaceDTOInsertUpdate
    (
    [Required(ErrorMessage ="Obavezno polje")]
    string Country,
    string City,
    string PlaceName,

        string EventName
        
    );
}
