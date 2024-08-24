using System.ComponentModel.DataAnnotations.Schema;

namespace CSHARPAPI_WineReview.Models
{
    public class Wine:Entity    
    {
        public string? Maker { get; set; }

        [Column("wine_name")]
        public string? WineName { get; set; }
        [Column("year_of_harvest")]
        public string? YearOfHarvest { get; set; }
        public decimal? Price { get; set; }
    }
}
