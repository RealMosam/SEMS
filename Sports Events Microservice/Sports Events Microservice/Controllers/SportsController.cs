using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using SportsEventsMicroService.Database;
using SportsEventsMicroService.Database.Repository;
using SportsEventsMicroService.Database.DataManager;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace SportsEventsMicroService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SportsController : ControllerBase
    {
        private readonly ISportDataRepository<Sport> _dataRepository;
        // static readonly log4net.ILog _logger = log4net.LogManager.GetLogger(typeof(SportsController));
        public SportsController(ISportDataRepository<Sport> dataRepository)
        {
            _dataRepository = dataRepository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Sport> sport = _dataRepository.GetAll();
            return Ok(sport);
        }


        [HttpGet("GetByName/{name}", Name = "GetSportByName")]
        public IActionResult GetByName(string name)
        {
            Sport sport = _dataRepository.GetByName(name);
            if (sport == null)
            {
               // _logger.Warn("Searching Non Existent Sport.");
                return NotFound($"{name} Not Found");
            }
            else if (name == null) 
            {
               // _logger.Warn("Name cannot be null");
                return BadRequest("Please enter Sport's name first.");
            }
            return Ok(sport);

        }
    }
}