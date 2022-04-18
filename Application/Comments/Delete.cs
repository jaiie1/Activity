using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Comments
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var comment = await _context.Comments.FindAsync(request.Id);

                if (comment == null)
                {
                    return Result<Unit>.Failure("Comment not found");
                }

                _context.Comments.Remove(comment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure("Problem saving changes");
            }            
        }
    }
}