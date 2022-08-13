using Microsoft.EntityFrameworkCore;
using ParticipationMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParticipationMicroservice.DBContexts
{
    public class ParticipationContext : DbContext
    {
        public ParticipationContext(DbContextOptions<ParticipationContext> options) : base(options)
        {
        }

        public DbSet<Sport> Sports { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Participation> Participations { get; set; }
    }
}

