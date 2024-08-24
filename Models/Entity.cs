using System.ComponentModel.DataAnnotations;

namespace CSHARPAPI_WineReview.Models
{
    public abstract class Entity
    {
        [Key]
        public int Id { get; set; }
    }
}
