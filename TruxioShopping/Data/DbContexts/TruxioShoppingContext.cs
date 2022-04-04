#region Using Statements

using Microsoft.EntityFrameworkCore;
using TruxioShopping.Models;

#endregion

namespace TruxioShopping.Data
{
    public class TruxioShoppingContext: DbContext
    {
        public DbSet<ShoppingItem> ShoppingItems { get; set; }
        public DbSet<ShoppingList> ShoppingLists { get; set; }

        public TruxioShoppingContext(DbContextOptions<TruxioShoppingContext> options): base(options)
        {
        }
    }
}