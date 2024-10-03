using System.ComponentModel.DataAnnotations;

namespace CSHARPAPI_WineReview.Models.DTO
{
    public record TastingDTOInsertUpdate
    (
        [Required(ErrorMessage = "Obavezno polje")]
        string Email

        );
        




    
}
