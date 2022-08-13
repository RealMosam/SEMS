using SportsEventsMicroService.Database;

namespace Sports_Events_Microservice.Database
{
    public class AppDbInitializer
    {
        public static void Seed(IApplicationBuilder applicationBuilder) 
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope()) 
            {
                var context = serviceScope.ServiceProvider.GetService<DatabaseContext>();

                context.Sports.AddRange(new Sport()
                {
                    SportId = 1,
                    SportName = "Cricket",
                    NoOfPlayers = 30,
                    SportType = "Outdoor"
                },
                new Sport()
                {
                SportId = 2,
                SportName = "FootBall",
                NoOfPlayers = 20,
                SportType = "Outdoor"
                }
                );

                context.SaveChanges();

                context.Events.AddRange(new Event()
                {
                    EventId = 1,
                    SportId = 1,
                    Sport = {
                    SportId = 1,
                    SportName = "Cricket",
                    NoOfPlayers = 30,
                    SportType = "Outdoor"
                    },
                    EventName = "IPL",
                    Date = DateTime.Now,
                    NoOfSlots = 30
                },
                new Event()
                {
                    EventId = 2,
                    SportId = 2,
                    EventName = "FIFA",
                    Date = DateTime.Now,
                    NoOfSlots = 30
                }
                );

                context.SaveChanges();

            }
        }
    }
}
