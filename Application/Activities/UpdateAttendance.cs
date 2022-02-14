using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }

        }

        public class Handle : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _accessor;

            public Handle(DataContext context, IUserAccessor accessor)
            {
                _accessor = accessor;
                _context = context;
            }

            async Task<Result<Unit>> IRequestHandler<Command, Result<Unit>>.Handle(Command request,
                                                   CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(a => a.Attendees)
                    .ThenInclude(a => a.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                    if(activity == null){
                        return null;
                    }

                    var user = await _context.Users.FirstOrDefaultAsync
                    (x => x.UserName == _accessor.GetUsername());

                   var hostUsername = activity.Attendees.FirstOrDefault
                        (x => x.IsHost)?.AppUser?.UserName;

                var attendance = activity.Attendees.FirstOrDefault
                    (x => x.AppUser == user);

                if(attendance != null && hostUsername == user.UserName){
                    activity.IsCancelled = !activity.IsCancelled;;
                }

               if(attendance != null && hostUsername != user.UserName){
                    activity.Attendees.Remove(attendance);
                }

                // Todo Test if this works
                if(attendance == null){
                    activity.Attendees.Add(new ActivityAttendee 
                    { AppUser = user, IsHost = false,  });                      
                }

                var result = await _context.SaveChangesAsync() > 0; 

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem saving changes");              
            }
        }
    }
}