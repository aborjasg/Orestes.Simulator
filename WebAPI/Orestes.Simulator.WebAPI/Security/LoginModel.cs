using System.ComponentModel.DataAnnotations;

namespace Orestes.Simulator.WebAPI.Security
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Username is required.")]
        public string Username { get; set; } = "";

        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        public string Password { get; set; } = "";
    }
}
