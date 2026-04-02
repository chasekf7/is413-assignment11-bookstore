using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookstoreAPI.Models;

namespace BookstoreAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly BookstoreContext _context;
    private readonly ILogger<BooksController> _logger;

    public BooksController(BookstoreContext context, ILogger<BooksController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET: api/books?pageNumber=1&pageSize=5&sortBy=title&sortOrder=asc&category=Business
    [HttpGet]
    public async Task<ActionResult<PagedResponse<Book>>> GetBooks(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 5,
        [FromQuery] string? sortBy = null,
        [FromQuery] string sortOrder = "asc",
        [FromQuery] string? category = null)
    {
        try
        {
            // Validate pagination parameters
            if (pageNumber < 1)
                pageNumber = 1;

            if (pageSize < 1)
                pageSize = 5;
            else if (pageSize > 100)
                pageSize = 100; // Maximum page size

            // Start with the base query
            IQueryable<Book> query = _context.Books;

            // Apply category filter if provided
            if (!string.IsNullOrWhiteSpace(category))
            {
                query = query.Where(b => b.Classification == category);
            }

            // Apply sorting
            if (!string.IsNullOrWhiteSpace(sortBy))
            {
                query = sortBy.ToLower() switch
                {
                    "title" => sortOrder.ToLower() == "desc"
                        ? query.OrderByDescending(b => b.Title)
                        : query.OrderBy(b => b.Title),
                    "author" => sortOrder.ToLower() == "desc"
                        ? query.OrderByDescending(b => b.Author)
                        : query.OrderBy(b => b.Author),
                    "price" => sortOrder.ToLower() == "desc"
                        ? query.OrderByDescending(b => b.Price)
                        : query.OrderBy(b => b.Price),
                    "pagecount" => sortOrder.ToLower() == "desc"
                        ? query.OrderByDescending(b => b.PageCount)
                        : query.OrderBy(b => b.PageCount),
                    _ => query.OrderBy(b => b.BookId) // Default sort by BookId
                };
            }
            else
            {
                // Default sort order
                query = query.OrderBy(b => b.BookId);
            }

            // Get total count before pagination
            var totalCount = await query.CountAsync();

            // Apply pagination
            var books = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var response = new PagedResponse<Book>
            {
                Items = books,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while fetching books");
            return StatusCode(500, "An error occurred while processing your request");
        }
    }

    // GET: api/books/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetBook(int id)
    {
        try
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound($"Book with ID {id} not found");
            }

            return Ok(book);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while fetching book {BookId}", id);
            return StatusCode(500, "An error occurred while processing your request");
        }
    }

    // GET: api/books/categories
    [HttpGet("categories")]
    public async Task<ActionResult<IEnumerable<string>>> GetCategories()
    {
        try
        {
            var categories = await _context.Books
                .Select(b => b.Classification)
                .Distinct()
                .OrderBy(c => c)
                .ToListAsync();

            return Ok(categories);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while fetching categories");
            return StatusCode(500, "An error occurred while processing your request");
        }
    }

    // POST: api/books
    [HttpPost]
    public async Task<ActionResult<Book>> CreateBook(Book book)
    {
        try
        {
            // Validate the model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Add the book to the context
            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            // Return 201 Created with the location of the new resource
            return CreatedAtAction(nameof(GetBook), new { id = book.BookId }, book);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while creating book");
            return StatusCode(500, "An error occurred while processing your request");
        }
    }

    // PUT: api/books/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(int id, Book book)
    {
        try
        {
            // Check if the id in the URL matches the id in the book object
            if (id != book.BookId)
            {
                return BadRequest("Book ID mismatch");
            }

            // Validate the model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the book exists
            var existingBook = await _context.Books.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound($"Book with ID {id} not found");
            }

            // Update the book properties
            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.Publisher = book.Publisher;
            existingBook.ISBN = book.ISBN;
            existingBook.Classification = book.Classification;
            existingBook.PageCount = book.PageCount;
            existingBook.Price = book.Price;

            // Save changes
            await _context.SaveChangesAsync();

            return NoContent(); // 204 No Content - successful update
        }
        catch (DbUpdateConcurrencyException ex)
        {
            _logger.LogError(ex, "Concurrency error occurred while updating book {BookId}", id);
            return StatusCode(409, "The book was modified by another user");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while updating book {BookId}", id);
            return StatusCode(500, "An error occurred while processing your request");
        }
    }

    // DELETE: api/books/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        try
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound($"Book with ID {id} not found");
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent(); // 204 No Content - successful deletion
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while deleting book {BookId}", id);
            return StatusCode(500, "An error occurred while processing your request");
        }
    }
}
