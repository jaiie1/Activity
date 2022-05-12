using API.Services;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System;

namespace API.Extenstions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityService(this IServiceCollection services, 
        IConfiguration configuration)
        {
            services.AddIdentityCore<AppUser>(options =>
            {               
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireDigit = false;                
                options.Password.RequiredLength = 6;            
                options.SignIn.RequireConfirmedEmail = true;
                
                
            })            
            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<AppUser>>()
            .AddDefaultTokenProviders();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"]));

            

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/chat")))
                            {
                                context.Token = accessToken;
                            }
                            return Task.CompletedTask;
                        }
                    };                    
                });
            services.AddAuthorization(opt => 
            {
                opt.AddPolicy("IsActivityHost", policy => 
                {
                    policy.Requirements.Add(new IsHostRequirement());
                });
            });
            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
            services.AddScoped<TokenServices>();


            return services;           
        }
    }
}