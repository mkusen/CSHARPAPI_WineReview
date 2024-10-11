using AutoMapper;
using CSHARPAPI_WineReview.Models;
using CSHARPAPI_WineReview.Models.DTO;

namespace CSHARPAPI_WineReview.Mapping
{
    public class WineReviewMappingProfile : Profile
    {
        public WineReviewMappingProfile()
        {
            //mapping creation for TastingController: source, destination
            //kada se koristi .ForCtorParam, potrebno je da broj svojstava (property) u osnovnoj i DTO klasi bude jednak
            CreateMap<Tasting, TastingDTORead>()
                .ForCtorParam("WineName",
                opt => opt.MapFrom(src => src.Wine.WineName + " " +
                    src.Wine.Maker))                
                .ForCtorParam("ReviewerName",
                opt => opt.MapFrom(src => src.Reviewer.FirstName + " " + src.Reviewer.LastName))
                .ForCtorParam("EventName",
                opt => opt.MapFrom(src => src.EventPlace.City + ", " + 
                src.EventPlace.PlaceName));
            CreateMap<Tasting, TastingDTOInsertUpdate>()
                 .ForCtorParam("WineId",
                 opt => opt.MapFrom(src => src.Wine.WineName + " " + src.Wine.Maker + " " + 
                 src.Wine.YearOfHarvest + " " + src.Wine.Price))
                 .ForCtorParam("ReviewerId",
                 opt => opt.MapFrom(src => src.Reviewer.FirstName + " " + src.Reviewer.LastName))
                 .ForCtorParam("EventId",
                 opt => opt.MapFrom(src => src.EventPlace.Country + " " + src.EventPlace.City + " " + 
                 src.EventPlace.PlaceName + " " + src.EventPlace.EventName));


            CreateMap<TastingDTOInsertUpdate, Tasting>();

            CreateMap<Wine, WineDTORead>();
            CreateMap<WineDTOInsertUpdate, Wine>();

            CreateMap<Reviewer, ReviewerDTORead>();
            CreateMap<ReviewerDTOInsertUpdate, Reviewer>();

            CreateMap<EventPlace, EventPlaceDTORead>();
            CreateMap<EventPlaceDTOInsertUpdate, EventPlace>();




        }

    }
}
