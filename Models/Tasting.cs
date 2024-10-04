using System.ComponentModel.DataAnnotations.Schema;

namespace CSHARPAPI_WineReview.Models
{
    public class Tasting : Entity
    {

        public string? Review { get; set; }

        [Column("event_date")]
        public required DateTime EventDate { get; set; }


        [ForeignKey("id_wine")]
        public required Wine Wine { get; set; }

        [ForeignKey("id_event_place")]
        public required EventPlace EventPlace { get; set; }

        [ForeignKey("id_reviewer")]
        public required Reviewer Reviewer { get; set; } 

    }
}
