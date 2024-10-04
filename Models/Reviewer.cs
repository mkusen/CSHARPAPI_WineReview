namespace CSHARPAPI_WineReview.Models
{
    public class Reviewer:Entity
    {
        public required string Email { get; set; }
        public required string Pass { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }

      

    }
}
