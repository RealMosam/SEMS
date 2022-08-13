using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SportsEventsMicroService.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SportsEventsMicroService.Database.Repository;
using SportsEventsMicroService.Database.DataManager;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;

namespace SportsEventsMicroService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var key = Configuration.GetValue<string>("TokenKey");

            services.AddDbContext<DatabaseContext>(option => option.UseInMemoryDatabase(Configuration.GetConnectionString("MyDb")));

            services.AddScoped<ISportDataRepository<Sport>, SportsManager>();
            services.AddScoped<IDataRepository<Event>, EventManager>();
            services.AddControllers();
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1",
                    new Microsoft.OpenApi.Models.OpenApiInfo
                    {
                        Title = "SportsEventsMicroService",
                        Version = "v1"
                    });
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please Insert Token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "bearer"
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference=new OpenApiReference
                            {
                                Type=ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        new string[]{}
                    }
                });
            });
            services.AddCors(c =>
            {
                c.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,

                    ValidIssuer = "https://localhost:44375",
                    ValidAudience = "Admin"
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "SportsEventsMicroService");
            });

            app.UseRouting();
            app.UseCors();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            var scope = app.ApplicationServices.CreateScope();
            var context = scope.ServiceProvider.GetService<DatabaseContext>();
            SeedData(context);
        }
        public static void SeedData(DatabaseContext context)
        {
            Event e1 = new Event()
            {
                EventId = 1,
                SportId = 1,
                EventName = "IPL",
                Date = DateTime.Now,
                NoOfSlots = 30
            };
            context.Events.Add(e1);

            Event e2 = new Event()
            {
                EventId = 2,
                SportId = 2,
                EventName = "FIFA",
                Date = DateTime.Now,
                NoOfSlots = 30
            };
            context.Events.Add(e2);

            Event e3 = new Event()
            {
                EventId = 3,
                SportId = 6,
                EventName = "Worldcup",
                Date = DateTime.Now,
                NoOfSlots = 100
            };
            context.Events.Add(e3);

            Event e4 = new Event()
            {
                EventId = 4,
                SportId = 5,
                EventName = "Championship",
                Date = DateTime.Now,
                NoOfSlots = 20
            };
            context.Events.Add(e4);

            context.SaveChanges();

            Sport s1 = new Sport()
            {
                SportId = 1,
                SportName = "Cricket",
                NoOfPlayers = 30,
                SportType = "Outdoor"
            };
            context.Sports.Add(s1);

            Sport s2 = new Sport()
            {
                SportId = 2,
                SportName = "FootBall",
                NoOfPlayers = 20,
                SportType = "Outdoor"
            };
            context.Sports.Add(s2);

            Sport s3 = new Sport()
            {
                SportId = 3,
                SportName = "Hockey",
                NoOfPlayers = 22,
                SportType = "Outdoor"
            };
            context.Sports.Add(s3);

            Sport s4 = new Sport()
            {
                SportId = 4,
                SportName = "Chess",
                NoOfPlayers = 2,
                SportType = "Indoor"
            };
            context.Sports.Add(s4);

            Sport s5 = new Sport()
            {
                SportId = 5,
                SportName = "Carroms",
                NoOfPlayers = 4,
                SportType = "Indoor"
            };
            context.Sports.Add(s5);

            Sport s6 = new Sport()
            {
                SportId = 6,
                SportName = "Badminton",
                NoOfPlayers = 22,
                SportType = "Outdoor"
            };
            context.Sports.Add(s6);

            context.SaveChanges();

        }
    }
}
