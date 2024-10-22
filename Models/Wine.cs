using System.ComponentModel.DataAnnotations.Schema;

namespace CSHARPAPI_WineReview.Models
{

    /// <summary>
    /// Represents a wine entity with details about the maker, name, year of harvest, and price.
    /// </summary>
    public class Wine : Entity
    {
        /// <summary>
        /// Gets or sets the maker of the wine.
        /// </summary>
        public required string Maker { get; set; }

        /// <summary>
        /// Gets or sets the name of the wine.
        /// </summary>
        [Column("wine_name")]
        public required string WineName { get; set; }

        /// <summary>
        /// Gets or sets the year the wine was harvested.
        /// </summary>
        [Column("year_of_harvest")]
        public required string YearOfHarvest { get; set; }

        /// <summary>
        /// Gets or sets the price of the wine.
        /// </summary>
        public decimal? Price { get; set; }
    }
}
