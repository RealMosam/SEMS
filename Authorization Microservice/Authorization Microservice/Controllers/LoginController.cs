using JwtAuthentication.Database;
using JwtAuthentication.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static JwtAuthentication.Database.Login;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace JwtAuthentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IJwtAuthenticationManager jwtAuthenticationManager;
        private readonly IRepository<Login> loginRepository;

        public LoginController(IJwtAuthenticationManager jwtAuthenticationManager, IRepository<Login> loginRepository)
        {
            this.jwtAuthenticationManager = jwtAuthenticationManager;
            this.loginRepository = loginRepository;
        }

        /*        // GET: api/<LoginController>
                [HttpGet]
                public IActionResult Get()
                {
                    IEnumerable<Login> logins = loginRepository.GetAll();
                    return Ok(logins);
                }*/


        [AllowAnonymous]
        [HttpPost, Route("authenticate")]
        public IActionResult Authenticate([FromBody] Login userCred)
        {
            if (!loginRepository.Get(userCred))
            {
                return Unauthorized(null);
            }

            var tokenString = jwtAuthenticationManager.GenerateToken(userCred.Username, userCred.Password);
            return Ok(new { token = tokenString });
        }
        [AllowAnonymous]
        [HttpPost, Route("register")]
        public IActionResult CreateUser([FromBody] Login userCred)
        {
            Login login = loginRepository.CreateLogin(userCred);
            if (login == null)
            {
                return BadRequest("Username already exists");
            }
            return Ok(new { message = "User registered successfully" });
        }
    }
}
