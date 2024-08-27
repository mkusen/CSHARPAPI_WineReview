using CSHARPAPI_WineReview.Models;
using Microsoft.EntityFrameworkCore;

namespace CSHARPAPI_WineReview.Data
{
    public class WineReviewContext: DbContext
    {
        public WineReviewContext(DbContextOptions<WineReviewContext> options):base(options) { 
        
        }

        //DB query
        public DbSet<EventPlace> EventPlaces { get; set; }
        public DbSet<Reviewer> Reviewers { get; set; }
        public  DbSet<Wine> Wines { get; set; }

        public DbSet<Tasting> Tastings { get; set; }
    }
}
