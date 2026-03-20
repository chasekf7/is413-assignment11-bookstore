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

    // GET: api/books?pageNumber=1&pageSize=5&sortBy=title&sortOrder=asc
    [HttpGet]
    public async Task<ActionResult<PagedResponse<Book>>> GetBooks(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 5,
        [FromQuery] string? sortBy = null,
        [FromQuery] string sortOrder = "asc")
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
}
