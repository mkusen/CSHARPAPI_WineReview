using System.ComponentModel.DataAnnotations.Schema;

namespace CSHARPAPI_WineReview.Models
{
    public class Tasting : Entity
    {

        [ForeignKey("id_reviewer")]
        [Column("id_reviewer")]
        
        public required int IdReviewer { get; set; }

        [ForeignKey("id_wine")]
        [Column("id_wine")]
        public required int IdWine { get; set; }

        [ForeignKey("id_event_place")]
        [Column("id_event_place")]
        public required int IdEventPlace { get; set; }
        public string? Review { get; set; }

        [Column("event_date")]
        public DateTime EventDate { get; set; }

    }
}
