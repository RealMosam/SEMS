using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace SportsEventsMicroService.Database.Repository
{
    public interface ISportDataRepository<TEntity>
    {
        IEnumerable<TEntity> GetAll();
        TEntity GetByName(string name);
    }
}
