using System.ComponentModel.DataAnnotations;

namespace CSHARPAPI_WineReview.Models.DTO
{
    public record TastingDTOInsertUpdate
    (
        [Required(ErrorMessage = "Obavezno polje")]
        DateTime EventDate,
        [Required(ErrorMessage = "Obavezno polje")]
        int WineId,
        [Required(ErrorMessage = "Obavezno polje")]
        int EventId,
        [Required(ErrorMessage ="Obavezno polje")]
        int ReviewerId,

        string? Review

        );






}
