using HeatMap.Data.GenericRepository;

namespace HeatMap.Data.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        private readonly Dictionary<Type, object> _repositories = new();

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }

        public IGenericRepository<T> GetRepository<T>() where T : class
        {
            if (_repositories.TryGetValue(typeof(T), out var repo))
                return (IGenericRepository<T>)repo;

            var repositoryInstance = new GenericRepository<T>(_context);
            _repositories[typeof(T)] = repositoryInstance;
            return repositoryInstance;
        }
        public async Task<int> SaveChangesAsync() => await _context.SaveChangesAsync();
        public void Dispose() => _context.Dispose();
    }
}
