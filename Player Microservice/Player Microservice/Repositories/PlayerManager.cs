using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using PlayerMicroservice.Database;
using PlayersMicroService.Database;

namespace PlayerMicroService.Repositories
{
    public class PlayerManager : IDataRepository<Player>
    {
        readonly DatabaseContext _playercontext;
        public PlayerManager(DatabaseContext context)
        {
            _playercontext = context;
        }
        public IEnumerable<Player> GetAll()
        {
            return _playercontext.Players.ToList();
        }
        public bool Add(Player player)
        {
            Sport s1 = _playercontext.Sports.Where(x => x.SportName == player.Sports.SportName).FirstOrDefault();
            Player p1 = new Player { PlayerName = player.PlayerName, Age = player.Age, ContactNumber = player.ContactNumber, Email = player.Email, Gender = player.Gender, SportId = s1.SportId };
            _playercontext.Players.Add(p1);
            _playercontext.SaveChanges();
            return true;
        }
        

        public bool Delete(int id)
        {
            Player player = _playercontext.Players.Find(id);
            if(player == null)
            {
                return false;
            }
            _playercontext.Players.Remove(player);
            _playercontext.SaveChanges();
            return true;
        }
    }
}
