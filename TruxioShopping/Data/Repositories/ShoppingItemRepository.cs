#region Using Statements

using Microsoft.EntityFrameworkCore;
using TruxioShopping.Models;
using TruxioShopping.Data.Interfaces;

#endregion

namespace TruxioShopping.Data.Repositories
{
    public class ShoppingItemRepository : IShoppingItemRepository
    {
        private readonly TruxioShoppingContext _context;

        public ShoppingItemRepository(TruxioShoppingContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ShoppingItem>> GetShoppingItemsAsync(int listId)
        {
            return await _context.ShoppingItems.Where(x => x.ShoppingListId == listId).ToListAsync();
        }

        public async Task<ShoppingItem> GetShoppingItemAsync(int id)
        {
            return await _context.ShoppingItems.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public void AddShoppingItem(ShoppingItem item)
        {
            _context.ShoppingItems.Add(item);
        }

        public async Task<ShoppingItem> UpdateShoppingItemAsync(int id, ShoppingItem item)
        {
            var itemToUpdate = await GetShoppingItemAsync(id);

            itemToUpdate.Name = item.Name;
            itemToUpdate.Quantity = item.Quantity;
            itemToUpdate.Link = item.Link;

            return itemToUpdate;
        }

        public void DeleteShoppingItem(ShoppingItem item)
        {
            _context.ShoppingItems.Remove(item);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync() >= 0);
        }
    }
}