using API.DTOs;
using API.Entities;

namespace API.Repository
{
    public class TaskRepository : ITaskRepository
    {
        private readonly DataContext _context;
        
        public TaskRepository(DataContext context) {
            _context = context;
        }

        public async Task AddTask(TaskInputDto taskInputDto) {
            var title = taskInputDto.Title.ToLower();
            var desc = taskInputDto.Description;
            var status = taskInputDto.Status;

            var newTask = new TaskData {
                Title = title,
                Description = desc,
                Status = status
            };
            await _context.Tasks.AddAsync(newTask); 
            await _context.SaveChangesAsync();
        }

        public async Task<List<TaskData>> GetTasksAsync()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<TaskData> GetTaskByIdAsync(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task UpdateTask(int id, TaskInputDto taskInputDto)
        {
            var task = await GetTaskByIdAsync(id);
            
            task.Title = taskInputDto.Title;
            task.Description = taskInputDto.Description;
            task.Status = taskInputDto.Status;

            _context.Entry(task).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTask(int id)
        {
            _context.Tasks.Remove(await GetTaskByIdAsync(id));
            await _context.SaveChangesAsync();
        }
    }
}