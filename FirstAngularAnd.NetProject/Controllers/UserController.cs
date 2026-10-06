using FirstAngularAnd.NetProject.DTO;
using FirstAngularAnd.NetProject.Services.IServices;
using Microsoft.AspNetCore.Http;
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
                return NotFound();
            }

            return Ok(result);
        }
        [HttpPut("Update")]
        public async Task<IActionResult> Update(UserUpdateDto userUpdateDto)
        {
            var result = await _userService.Update(userUpdateDto);
            return Ok(result);
        }
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(int Id)
        {
            var result= await _userService.Delete(Id);
            return Ok(result);
        }

    }
}
