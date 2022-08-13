using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ParticipationMicroservice.DBContexts;
using ParticipationMicroservice.Model;
using ParticipationMicroservice.Models.DataManager;
using ParticipationMicroservice.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace ParticipationMicroservice
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
            // local db connection string
            var key = Configuration.GetValue<string>("TokenKey");

            services.AddDbContext<ParticipationContext>(option => option.UseInMemoryDatabase(Configuration.GetConnectionString("MyDb")));

            services.AddScoped<IDataRepository<Participation>, ParticipationManager>();
            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Participation Microservice", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please Insert Token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
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

            // This middleware serves generated Swagger document as a JSON endpoint
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Participation"));

            // This middleware serves the Swagger documentation UI
            app.UseRouting();
            app.UseCors();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            var scope = app.ApplicationServices.CreateScope();
            var context = scope.ServiceProvider.GetService<ParticipationContext>();
            SeedData(context);
        }

        public static void SeedData(ParticipationContext context)
        {
            Sport s1 = new Sport()
            {
                SportId = 1,
                SportName = "Cricket",
                NoOfPlayers = 30,
                sportType = "Outdoor"
            };

            Sport s2 = new Sport()
            {
                SportId = 2,
                SportName = "FootBall",
                NoOfPlayers = 20,
                sportType = "Outdoor"
            };

            Sport s3 = new Sport()
            {
                SportId = 3,
                SportName = "Hockey",
                NoOfPlayers = 22,
                sportType = "Outdoor"
            };

            Sport s4 = new Sport()
            {
                SportId = 4,
                SportName = "Chess",
                NoOfPlayers = 2,
                sportType = "Indoor"
            };

            Sport s5 = new Sport()
            {
                SportId = 5,
                SportName = "Carroms",
                NoOfPlayers = 4,
                sportType = "Indoor"
            };

            Sport s6 = new Sport()
            {
                SportId = 6,
                SportName = "Badminton",
                NoOfPlayers = 22,
                sportType = "Outdoor"
            };

            Event e1 = new Event()
            {
                EventId = 1,
                EventName = "IPL",
                Date = DateTime.Now,
                NoOfSlots = 30
            };

            Event e2 = new Event() {
                EventId = 2,
                EventName = "FIFA",
                Date = DateTime.Now,
                NoOfSlots = 30
            };

            Event e3 = new Event() {
                EventId = 3,
                EventName = "Worldcup",
                Date = DateTime.Now,
                NoOfSlots = 100
            };

            Event e4 = new Event() {
                EventId = 4,
                EventName = "Championship",
                Date = DateTime.Now,
                NoOfSlots = 20
            };

            Player p1 = new Player()
            {
                PlayerId = 1,
                SportId = 1,
                PlayerName = "MSD",
                Age = 37,
                ContactNumber = "9999999990",
                Email = "msd@gmail.com",
                Gender = GenderLevel.Male
            };

            Player p2 = new Player()
            {
                PlayerId = 2,
                SportId = 2,
                Sports = s2,
                PlayerName = "Neymar",
                Age = 33,
                ContactNumber = "9999999980",
                Email = "neymar@gmail.com",
                Gender = GenderLevel.Male
            };

            Player p3 = new Player()
            {
                PlayerId = 3,
                SportId = 2,
                Sports = s2,
                PlayerName = "Messi",
                Age = 36,
                ContactNumber = "9999999960",
                Email = "messi@gmail.com",
                Gender = GenderLevel.Male
            };

            context.Players.Add(p1);
            context.Players.Add(p2);
            context.Players.Add(p3);

            Participation ptn1 = new Participation()
            {
                ParticipationId = 1,
                EventId = 1,
                Status = ParticipationStatus.approved
            };

            context.Sports.Add(s1);
            context.Sports.Add(s2);
            context.Sports.Add(s3);
            context.Sports.Add(s4);
            context.Sports.Add(s5);
            context.Sports.Add(s6);

            context.Events.Add(e1);
            context.Events.Add(e2);
            context.Events.Add(e3);
            context.Events.Add(e4);

            context.Players.Add(p1);

            context.Participations.Add(ptn1);

            context.SaveChanges();
        }
    }
}
