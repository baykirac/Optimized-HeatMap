namespace HeatMap.Data.GenericRepository
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync (object id);
        Task AddAsync (T entity);
        Task AddRangeAsync (IEnumerable<T> entities);
        void Update (T entity);   
        void Delete (T entity);   
    }
}
