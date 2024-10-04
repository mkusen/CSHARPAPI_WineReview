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
                .ForMember(
                dest => dest.WineName,
                opt => opt.MapFrom(src => src.Wine.WineName)
                )
                .ForMember(
                dest => dest.Reviewer,
                opt => opt.MapFrom(src => src.Reviewer.FirstName + " " + src.Reviewer.LastName)
                ).ForMember(
                dest => dest.Reviewer,
                opt => opt.MapFrom(src => src.Reviewer.Email)
                );
        
            CreateMap<TastingDTOInsertUpdate, Tasting>();
        
        
        }

    }
}
