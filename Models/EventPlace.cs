using System.ComponentModel.DataAnnotations.Schema;

namespace CSHARPAPI_WineReview.Models
{

    [Table("event_places")]
    public class EventPlace:Entity
    {
        public string? Country { get; set; }
        public string? City  { get; set; }
        [Column("place_name")]
        public string? PlaceName { get; set; }
        [Column("event_name")]
        public string? EventName { get; set; }

       
    }
}
