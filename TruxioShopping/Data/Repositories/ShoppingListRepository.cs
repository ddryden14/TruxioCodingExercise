#region Using Statements

using Microsoft.EntityFrameworkCore;
using TruxioShopping.Models;
using TruxioShopping.Data.Interfaces;

#endregion

namespace TruxioShopping.Data.Repositories
{
    public class ShoppingListRepository : IShoppingListRepository
    {
        private readonly TruxioShoppingContext _context;

        public ShoppingListRepository(TruxioShoppingContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ShoppingList>> GetShoppingListsAsync()
        {
            return await _context.ShoppingLists.ToListAsync();
        }

        public async Task<ShoppingList?> GetShoppingListAsync(int id)
        {
            return await _context.ShoppingLists.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public void AddShoppingList(ShoppingList list)
        {
           _context.ShoppingLists.Add(list);
        }

        public async Task<ShoppingList> UpdateShoppingListAsync(int id, ShoppingList item)
        {
            var listToUpdate = await GetShoppingListAsync(id);

            listToUpdate.Name = item.Name;

            return listToUpdate;
        }

        public void DeleteShoppingList(ShoppingList list)
        {
            var itemsInList = _context.ShoppingItems.Where(x => x.ShoppingListId == list.Id);

            foreach(var item in itemsInList)
            {
                _context.ShoppingItems.Remove(item);
            }

            _context.ShoppingLists.Remove(list);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync() >= 0);
        }
    }
}