using AutoMapper;
using CSHARPAPI_WineReview.Models;
using CSHARPAPI_WineReview.Models.DTO;

namespace CSHARPAPI_WineReview.Mapping
{
    public class WineReviewMappingProfile:Profile
    {
        public WineReviewMappingProfile() 
        {
            //mapping creation for TastingController: source, destination
            //potrebno dodati još ostale podatke 
            CreateMap<Tasting, TastingDTORead>()
                 .ForMember(dest => dest.Wine,
                opt => opt.MapFrom(src => src.Wine.WineName + " " + src.Wine.Maker + " " + src.Wine.YearOfHarvest + " " + src.Wine.Price)).
                ForMember(dest => dest.Reviewer,
                opt => opt.MapFrom(src => src.Reviewer.FirstName + " " + src.Reviewer.LastName)).
                ForMember(dest => dest.EventPlace,
                opt => opt.MapFrom(src => src.EventPlace.Country + " " + src.EventPlace.City + " " + src.EventPlace.PlaceName + " " + src.EventPlace.EventName)).
                ForMember(dest => dest.Id,
                opt => opt.MapFrom(src => src.Review + " " + src.EventDate));




            //.ForCtorParam(
            //"WineName",
            //opt => opt.MapFrom(src => src.Wine.WineName)
            //);
            //.ForCtorParam(
            //"Reviewer",
            //opt => opt.MapFrom(src => src.Reviewer.FirstName + " " + src.Reviewer.LastName)
            //).ForCtorParam(
            //"Reviewer",
            //opt => opt.MapFrom(src => src.Reviewer.Email)
            //);

            CreateMap<TastingDTOInsertUpdate, Tasting>();
        
        
        }

    }
}
