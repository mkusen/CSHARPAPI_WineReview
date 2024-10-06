using System.ComponentModel.DataAnnotations;

namespace CSHARPAPI_WineReview.Models.DTO
{
    public record ReviewerDTOInsertUpdate
    (
        [Required(ErrorMessage ="Obavezno polje")]
         string Email,
        [Required(ErrorMessage ="Obavezno polje")]
        string FirstName,
        [Required(ErrorMessage ="Obavezno polje")]
        string LastName

        );




}
