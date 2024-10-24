using System.ComponentModel.DataAnnotations;

namespace CSHARPAPI_WineReview.Models.DTO
{
    /// <summary>
    /// Data Transfer Object for Image operations.
    /// </summary>
   
        /// <summary>
        /// Read model for ImageDTO.
        /// </summary>
        /// <param name="Base64">Base64 encoded string of the image. Required.</param>
        public record ImageDTO(
            [Required(ErrorMessage = "Base64 zapis slike obavezno")]
            string Base64
        );
    
}
