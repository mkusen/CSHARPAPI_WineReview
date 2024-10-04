using CSHARPAPI_WineReview.Models;
using Microsoft.EntityFrameworkCore;

namespace CSHARPAPI_WineReview.Data
{
    public class WineReviewContext(DbContextOptions<WineReviewContext> options) : DbContext(options)
    {

        //DB query
        public DbSet<EventPlace> EventPlaces { get; set; }
        public DbSet<Reviewer> Reviewers { get; set; }
        public  DbSet<Wine> Wines { get; set; }
        public DbSet<Tasting> Tastings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //relation 1:n for table wine
            modelBuilder.Entity<Tasting>().HasOne(w => w.Wine).WithMany().HasForeignKey(w => w.IdWine);

            //relation 1:n for table reviewer
            modelBuilder.Entity<Tasting>().HasOne(r => r.Reviewer).WithMany().HasForeignKey(r => r.IdReviewer);

            //relation 1:n for table event_place
            modelBuilder.Entity<Tasting>().HasOne(e=>e.EventPlace).WithMany().HasForeignKey(e => e.IdEventPlace);

        }



    }
}
