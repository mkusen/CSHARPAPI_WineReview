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

            CreateMap<Tasting, TastingDTORead>()
                .ForMember(
                dest => dest.Email,
                opt => opt.MapFrom(src => src.IdReviewer)
                );
            CreateMap<Tasting, TastingDTOInsertUpdate>().ForMember(
                dest=>dest.Email,
                opt=>opt.MapFrom(src=>src.IdReviewer)
                
                
              );
            CreateMap<TastingDTOInsertUpdate, Tasting>();
        
        
        }

    }
}
