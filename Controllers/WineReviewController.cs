using AutoMapper;
using CSHARPAPI_WineReview.Data;
using Microsoft.AspNetCore.Mvc;

namespace CSHARPAPI_WineReview.Controllers
{
    public abstract class WineReviewController(WineReviewContext context, IMapper mapper) : ControllerBase
    {
        //dependency injection
        protected readonly WineReviewContext _context = context;
        protected readonly IMapper _mapper = mapper;
    }
}
