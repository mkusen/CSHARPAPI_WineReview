namespace CSHARPAPI_WineReview.Models.DTO
{
    public record TastingDTORead
    (
            //id in 'tasting' table pull single record
            int Id,
            string Review,
            DateTime EventDate,

            //user (reviewer) by FK 'id_reviewer' taken from 'reviewer' table
            string ReviewerName,

            int ReviewerId,

            //wine by FK 'id_wine' taken from 'wine' table
            string WineName,

            int WineId, 

            //event_places by FK 'id_event_place' taken from 'event_places' table
            string EventName,

        int EventId

        );


}
