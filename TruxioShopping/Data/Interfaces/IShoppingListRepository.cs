#region Using Statements

using TruxioShopping.Models;

#endregion

namespace TruxioShopping.Data.Interfaces
{
    public interface IShoppingListRepository
    {
        Task<IEnumerable<ShoppingList>> GetShoppingListsAsync();
        Task<ShoppingList?> GetShoppingListAsync(int id);
        void AddShoppingList(ShoppingList list);
        Task<ShoppingList> UpdateShoppingListAsync(int id, ShoppingList item);
        void DeleteShoppingList(ShoppingList list);
        Task<bool> SaveChangesAsync();
    }
}