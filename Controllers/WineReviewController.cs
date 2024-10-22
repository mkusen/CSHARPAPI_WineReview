using AutoMapper;
using CSHARPAPI_WineReview.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace CSHARPAPI_WineReview.Controllers
{
    /// <summary>
    /// Abstract base controller for handling wine reviews.
    /// </summary>
    /// <param name="context">The database context for wine reviews.</param>
    /// <param name="mapper">The AutoMapper instance for mapping objects.</param>
    public abstract class WineReviewController(WineReviewContext context, IMapper mapper) : ControllerBase
    {
        // Dependency injection
        protected readonly WineReviewContext _context = context;
        protected readonly IMapper _mapper = mapper;
    }
}
