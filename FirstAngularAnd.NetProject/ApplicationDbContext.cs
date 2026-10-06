
using FirstAngularAnd.NetProject.Models;
using Microsoft.EntityFrameworkCore;

namespace FirstAngularAnd.NetProject
{

    // applicationDbContext is our application's database context class
    // this class inherits from DBContext, which is provided by ef core.
    //here DbContext acts as a brige between your application and the database.
    public class ApplicationDbContext : DbContext
    {

        //Contructor of ApplicaitonDbContext


        //DbContextOptions<ApplicationDbContext> here contains the configuration

        /// <summary>
        /// that is required by ef core to work with the database
        /// 
        /// 
        /// </summary>
        /// <param name="options"></param>
        /// 

        // base(options) call the constructor of dbcontext and give the database configuration

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        //here we can pass the database configuration/options to the parent dbcontext class

        // here we can get and set

        // get== allows us to read/access the object.
        //set == allows ef core to set the dbset , set the records


        public DbSet<User> Users { get; set; }

        //    public DbSet<Product> Products { get; set; }  


        //    public DbSet<project> Projects { get; set; }
    }
}
