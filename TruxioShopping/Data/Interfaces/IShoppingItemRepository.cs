#region Using Statements

using TruxioShopping.Models;

#endregion

namespace TruxioShopping.Data.Interfaces
{
    public interface IShoppingItemRepository
    {
        Task<IEnumerable<ShoppingItem>> GetShoppingItemsAsync(int listId);
        Task<ShoppingItem> GetShoppingItemAsync(int id);
        void AddShoppingItem(ShoppingItem item);
        Task<ShoppingItem> UpdateShoppingItemAsync(int id, ShoppingItem item);
        void DeleteShoppingItem(ShoppingItem item);
        Task<bool> SaveChangesAsync();
    }
}