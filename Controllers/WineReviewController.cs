using AutoMapper;
using CSHARPAPI_WineReview.Data;
using Microsoft.AspNetCore.Mvc;

namespace CSHARPAPI_WineReview.Controllers
{
    public abstract class WineReviewController : ControllerBase
    {
        //dependency injection
        protected readonly WineReviewContext _context;
        protected readonly IMapper _mapper;

        //constructor injection
        public WineReviewController(WineReviewContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }




    }
}
