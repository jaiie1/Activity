using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        // [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(4,8)$", ErrorMessage = "Password must be between 4 and 8 characters and contain at least one number, one uppercase and one lowercase letter.")]
        public string Password { get; set; }
        [Required]
        public string userName { get; set; }
    }
}