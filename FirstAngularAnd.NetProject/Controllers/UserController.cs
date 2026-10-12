using FirstAngularAnd.NetProject.DTO;
using FirstAngularAnd.NetProject.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace FirstAngularAnd.NetProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("Create")]

        public async Task<IActionResult> Create(UserCreateDto userCreateDto)
        {

            if(userCreateDto==null 
                ||string.IsNullOrWhiteSpace(userCreateDto.Name)
                || string.IsNullOrWhiteSpace(userCreateDto.Email))
                {
                return BadRequest(new
                {
                    message = "Name and Email are required"
                });
            }
            var result= await _userService.Create(userCreateDto);
            return Ok(result);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var result= await _userService.GetAll();
            return Ok(result);
        }
        [HttpGet("GetbyId/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result=await _userService.GetById(id);
            if(result==null)
            {
                return NotFound
                    (new
                    {
                        message = $" User with Id {id} not found"
                    }); 
                    
            }

            return Ok(result);
        }
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> Update(UserUpdateDto userUpdateDto)
        {


            if (userUpdateDto == null
               || string.IsNullOrWhiteSpace(userUpdateDto.Name)
               || string.IsNullOrWhiteSpace(userUpdateDto.Email))
            {
                return BadRequest(new
                {
                    message = "Name and Email are required"
                });
            }





            var result = await _userService.Update(userUpdateDto);


            if (result == null)
            {
                return NotFound
                    (new
                    {
                        message = $" User with Id {userUpdateDto.Id} not found"
                    });

            }

            return Ok(result);
        }
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int Id)
        {

            if(Id<=0)
            {
                return BadRequest(new
                {
                    message = "A valid id must be required"
                });
            }
            var result= await _userService.Delete(Id);


            if (result == null)
            {
                return NotFound
                    (new
                    {
                        message = $" User with Id {Id} not found"
                    });

            }
            return Ok(result);
        }

    }
}
