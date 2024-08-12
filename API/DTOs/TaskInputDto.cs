using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class TaskInputDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Status { get; set; }
    }
}