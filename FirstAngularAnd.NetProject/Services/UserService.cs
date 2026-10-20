using FirstAngularAnd.NetProject.DTO;
using FirstAngularAnd.NetProject.Models;
using FirstAngularAnd.NetProject.Services.IServices;
using Microsoft.EntityFrameworkCore;

namespace FirstAngularAnd.NetProject.Services
{

    //Encapsulation: encapsulation means wrapping data and method or business in one unit
    //or place

    public class UserService : IUserService
    {

        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<UserResponseDto> Create(UserCreateDto userCreateDto)
        {

            var user = new User
            {
                Name = userCreateDto.Name,
                Email = userCreateDto.Email,
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserResponseDto
            {
                Id=user.Id,
                Name=user.Name,
                Email = user.Email,
            };
        }

        public async Task<bool> Delete(int id)
        {
          var user= await _context.Users.FindAsync(id);
            if (user == null)
            {
                return false;
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<UserResponseDto>> GetAll()
        {
          return await _context.Users.Select(p=> new UserResponseDto
          {
              Id = p.Id,
              Name = p.Name,
              Email = p.Email,
          }).AsNoTracking().ToListAsync();
        }

        public async Task<UserResponseDto> GetById(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return null;
            }
            return new UserResponseDto
            {

                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
            };
        }

        public async Task<UserResponseDto> Update(UserUpdateDto userUpdateDto)
        {
            var user = await _context.Users.FindAsync(userUpdateDto.Id);
            if (user == null)
            {
                return null;
            }
            user.Name = userUpdateDto.Name; 
            user.Email = userUpdateDto.Email;

            await _context.SaveChangesAsync();

            return new UserResponseDto
            {

                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
            };

        }
    }
}
