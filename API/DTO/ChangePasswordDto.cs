namespace API.DTO
{
    public class ChangePasswordDto
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string Email { get; set; }

    }
}