#region Using Statements

using Microsoft.AspNetCore.Mvc;
using TruxioShopping.Data.Interfaces;
using TruxioShopping.Models;

#endregion

namespace TruxioShopping.Controllers
{
    [ApiController]
    [Route("api/lists/{listId}/items")]
    public class ItemsController : ControllerBase
    {
        private readonly IShoppingItemRepository _shoppingItemRepository;

        public ItemsController(IShoppingItemRepository shoppingItemRepository)
        {
            _shoppingItemRepository = shoppingItemRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShoppingItem>>> GetShoppingItems(int listId)
        {
            ActionResult result = NotFound();
            var list = await _shoppingItemRepository.GetShoppingItemsAsync(listId);

            if(list != null)
            {
                result = Ok(list);
            }

            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ShoppingItem>> GetShoppingItem(int id)
        {
            ActionResult result = NotFound();
            var item = await _shoppingItemRepository.GetShoppingItemAsync(id);

            if(item != null)
            {
                result = Ok(item);
            }

            return result;
        }

        [HttpPost]
        public async Task<ActionResult<ShoppingItem>> CreateShoppingItem([FromBody]ShoppingItem item)
        {
            _shoppingItemRepository.AddShoppingItem(item);
            await _shoppingItemRepository.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ShoppingItem>> UpdateShoppingItem(int id, [FromBody] ShoppingItem item)
        {
            ActionResult result = NotFound();
            var itemToUpdate = await _shoppingItemRepository.GetShoppingItemAsync(id);
            if (itemToUpdate != null)
            {
                var updatedItem = await _shoppingItemRepository.UpdateShoppingItemAsync(id, item);
                await _shoppingItemRepository.SaveChangesAsync();
                result = Ok(updatedItem);
            }
            
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteShoppingItem(int id)
        {
            ActionResult result = NotFound();
            var itemToDelete = await  _shoppingItemRepository.GetShoppingItemAsync(id);
            
            if (itemToDelete != null)
            {
                _shoppingItemRepository.DeleteShoppingItem(itemToDelete);
                await _shoppingItemRepository.SaveChangesAsync();
                result = Ok(itemToDelete);
            }

            return result;
        }
    }
}