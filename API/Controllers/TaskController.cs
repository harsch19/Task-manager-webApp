using API.DTOs;
using API.Entities;
using API.Repository;

namespace API.Controllers
{
    public class TaskController : BaseApiController
    {
        private readonly ITaskRepository _taskRepository;
        public TaskController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        [HttpPost("Add")]
        public async Task<ActionResult<TaskResponseDto>> Add(TaskInputDto taskInputDto)
        {
            try
            {
                await _taskRepository.AddTask(taskInputDto);
                return new TaskResponseDto
                {
                    Success = true,
                    Message = "Task Added Successfully"
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Internal Server Error");
            }
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<TaskData>>> GetAll()
        {
            try
            {
                return await _taskRepository.GetTasksAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Internal Server Error");
            }
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<TaskData>> GetById(int id)
        {
            try
            {
                var task = await _taskRepository.GetTaskByIdAsync(id);
                if (task == null)
                {
                    return NotFound("Task Not Found");
                }
                return task;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Internal Server Error");
            }
        }
        
        [HttpPut("Update/{id}")]
        public async Task<ActionResult<TaskResponseDto>> Update(TaskInputDto taskInputDto, int id)
        {
            try
            {
                var task = await _taskRepository.GetTaskByIdAsync(id);
                if (task == null)
                {
                    return NotFound(
                        "Task Not Found");
                }
                await _taskRepository.UpdateTask(id, taskInputDto);

                var response = new TaskResponseDto
                {
                    Success = true,
                    Message = "Task Updated Successfully"
                };
                return response;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Internal Server Error");
            }
        }
        
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<TaskResponseDto>> Delete(int id)
        {
            try
            {
                var task = await _taskRepository.GetTaskByIdAsync(id);
                if (task == null)
                {
                    return NotFound("Task Not Found");
                }
                await _taskRepository.DeleteTask(id);

                var response = new TaskResponseDto
                {
                    Success = true,
                    Message = "Task Deleted Successfully"
                };
                return response;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Internal Server Error");
            }
        }
    }
}