using System.ComponentModel.DataAnnotations;

namespace CSHARPAPI_WineReview.Models.DTO
{
    public record TastingDTOInsertUpdate
    (
        [Required(ErrorMessage = "Obavezno polje")]
        DateTime EventDate,
        [Required(ErrorMessage = "Obavezno polje")]
        int Wine,
        [Required(ErrorMessage = "Obavezno polje")]
        int EventPlace,
        [Required(ErrorMessage ="Obavezno polje")]
        int Reviewer,

        string? Review

        );
        




    
}
