using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApicontroller : ControllerBase
    {
        private IMediator _mediatoR;
        protected IMediator Mediator => _mediatoR ??= HttpContext.RequestServices.GetService<IMediator>();
    }
}