using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PlayersMicroService.Database;

namespace PlayerMicroservice.Database
{
    public class DatabaseContext : DbContext
    { 
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }
        public DbSet<Player> Players { get; set; }
        public DbSet<Sport> Sports { get; set; }
    }

}
