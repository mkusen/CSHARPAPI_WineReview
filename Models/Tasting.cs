using System.ComponentModel.DataAnnotations.Schema;

namespace CSHARPAPI_WineReview.Models
{
    public class Tasting : Entity
    {


        [Column("id_reviewer")]
        public int IdReviewer { get; set; }


        [Column("id_wine")]
        public int IdWine { get; set; }


        [Column("id_event_place")]
        public int IdEventPlace { get; set; }

        public string? Review { get; set; }

        [Column("event_date")]
        public DateTime EventDate { get; set; }


        [ForeignKey("IdWine")]
        public required Wine Wine { get; set; }

        [ForeignKey("IdEventPlace")]
        public required EventPlace EventPlace { get; set; }

        [ForeignKey("IdReviewer")]
        public required Reviewer Reviewer { get; set; } 

    }
}
