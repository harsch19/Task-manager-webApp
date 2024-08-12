using API.Entities;
using API.DTOs;

namespace API.Repository
{
    public interface ITaskRepository
    {
        public void AddTask(TaskInputDto task);
        Task SaveAllAsync();
        public Task<List<TaskData>> GetTasksAsync();
        public Task<TaskData> GetTaskByIdAsync(int id);
        public Task UpdateTask(int id, TaskInputDto task);
        public Task DeleteTask(int id);
    }
}