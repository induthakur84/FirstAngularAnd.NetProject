using FirstAngularAnd.NetProject.DTO;

namespace FirstAngularAnd.NetProject.Services.IServices
{
    // we are able to achieve dependency injection with the help of interface.

    // we are able  to achieve Abstraction withh the the help of interface
    /// <summary>
    ///  in C#, we are able to implement multiple inheritance with the help of interface
    /// </summary>
    /// 
    // in interface we are just declear or define the methods
    public interface IUserService
    {
        Task<UserResponseDto> Create(UserCreateDto userCreateDto);

        Task<UserResponseDto> Update(UserUpdateDto userUpdateDto);
        Task<bool> Delete(int id);

        Task<List<UserResponseDto>> GetAll();
        Task<UserResponseDto> GetById(int id);

    }
}
