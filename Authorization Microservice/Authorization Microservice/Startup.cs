using JwtAuthentication.Database;
using JwtAuthentication.Models;
using JwtAuthentication.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static JwtAuthentication.Database.Login;

namespace JwtAuthentication
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

            services.AddControllers();
            services.AddDbContext<LoginDatabaseContext>(option => option.UseInMemoryDatabase(Configuration.GetConnectionString("MyDb")));
            services.AddScoped<IRepository<Login>, LoginManager>();
            services.AddSingleton<IJwtAuthenticationManager>(new JwtAuthenticationManager(key));
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Authorization Microservice", Version = "v1" });
            });

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
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
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Authorization"));

            app.UseRouting();
            app.UseCors();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


            var scope = app.ApplicationServices.CreateScope();
            var context = scope.ServiceProvider.GetService<LoginDatabaseContext>();
            SeedData(context);
        }

        public static void SeedData(LoginDatabaseContext context)
        {
            Login user1 = new Login()
            {
                Username = "mosam",
                Password = "test@123"
            };

            context.Logins.Add(user1);
            context.SaveChanges();
        }

    }
 }
