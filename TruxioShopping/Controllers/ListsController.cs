#region Using Statements

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using TruxioShopping.Models;
using TruxioShopping.Data.Interfaces;

#endregion

namespace TruxioShopping.Controllers
{
    [ApiController]
    [Route("api/lists")]
    public class ListsController : ControllerBase
    {
        private readonly IShoppingListRepository _shoppingListRepository;

        public ListsController(IShoppingListRepository shoppingListRepository) 
        {
            _shoppingListRepository = shoppingListRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShoppingList>>> GetShoppingLists()
        {
            var shoppingListEntities = await _shoppingListRepository.GetShoppingListsAsync();
            return Ok(shoppingListEntities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ShoppingList>> GetShoppingList(int id)
        {
            ActionResult result = NotFound();
            var list = await _shoppingListRepository.GetShoppingListAsync(id);

            if (list != null)
            {
                result = Ok(list);
            }

            return result;
        }

        [HttpPost]
        public async Task<ActionResult<ShoppingList>> CreateShoppingList([FromBody] ShoppingList list)
        {
            _shoppingListRepository.AddShoppingList(list);
            await _shoppingListRepository.SaveChangesAsync();

            return Ok(list);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ShoppingList>> UpdateShoppingList(int id, [FromBody] ShoppingList list)
        {
            ActionResult result = NotFound();
            var listToUpdate = await _shoppingListRepository.GetShoppingListAsync(id);
            if (listToUpdate != null)
            {
                var updatedItem = await _shoppingListRepository.UpdateShoppingListAsync(id, list);
                await _shoppingListRepository.SaveChangesAsync();
                result = Ok(updatedItem);
            }

            return result;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteShoppingList(int id)
        {
            ActionResult result = NotFound();
            var listToDelete  = await _shoppingListRepository.GetShoppingListAsync(id);

            if (listToDelete != null)
            {
                _shoppingListRepository.DeleteShoppingList(listToDelete);
                await _shoppingListRepository.SaveChangesAsync();
                result = Ok(listToDelete);
            }

            return result;
        }
    }
}