using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlayerMicroservice.Database;
using PlayerMicroService.Repositories;
//using log4net;
using Microsoft.AspNetCore.Authorization;

namespace PlayerMicroService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PlayersController : ControllerBase
    {
        private readonly IDataRepository<Player> _playerRepository;
        //private readonly ILog _logger;

        public PlayersController(IDataRepository<Player> playerRepository)
        {
            this._playerRepository = playerRepository;
            //this._logger = LogManager.GetLogger(typeof(PlayersController));
        }

        // GET: api/Players
        [HttpGet]
        public  IActionResult GetPlayers()
        {
            IEnumerable<Player> players=_playerRepository.GetAll();
            return Ok(players);
        }

        // POST: api/Players
        [HttpPost]
        public IActionResult PostPlayer([FromBody] Player player)
        {

            _playerRepository.Add(player);

            return Ok(new { message=$"Player added successfully" });
        }

        // DELETE: api/Players/5
        [HttpDelete("{id}")]
        public IActionResult DeletePlayer(int id)
        {

            if (string.IsNullOrEmpty(id.ToString()))
            {
                //_logger.Warn("Id cannot be null");
                return BadRequest("Please enter Player Id first.");
            }
            else if(!_playerRepository.Delete(id))
            {
                //_logger.Warn("Player Doesn't exist");
                return BadRequest("Player not found");
            }
            else
                return Ok( new { message = $"Player with id {id} deleted successfully" } );

        }
    }
}
