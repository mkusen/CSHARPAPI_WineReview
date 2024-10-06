using System.ComponentModel.DataAnnotations;

namespace CSHARPAPI_WineReview.Models.DTO
{
    public record WineDTOInsertUpdate
    (
         [Required(ErrorMessage ="Obavezno polje")]
            string Maker,
         [Required(ErrorMessage ="Obavezno polje")]
            string WineName,
         [Required(ErrorMessage ="Obavezno polje")]
            string YearOfHarvest,

           decimal? Price

        );



}
