using Microsoft.EntityFrameworkCore;

namespace BookstoreAPI.Models;

public class BookstoreContext : DbContext
{
    public BookstoreContext(DbContextOptions<BookstoreContext> options) : base(options)
    {
    }

    public DbSet<Book> Books { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed the database with sample books (Prof. Hilton's favorites)
        modelBuilder.Entity<Book>().HasData(
            new Book
            {
                BookId = 1,
                Title = "The Lean Startup",
                Author = "Eric Ries",
                Publisher = "Crown Business",
                ISBN = "978-0307887894",
                Classification = "Business",
                PageCount = 336,
                Price = 14.99m
            },
            new Book
            {
                BookId = 2,
                Title = "Zero to One",
                Author = "Peter Thiel",
                Publisher = "Crown Business",
                ISBN = "978-0804139298",
                Classification = "Business",
                PageCount = 224,
                Price = 16.99m
            },
            new Book
            {
                BookId = 3,
                Title = "The Innovator's Dilemma",
                Author = "Clayton M. Christensen",
                Publisher = "Harvard Business Review Press",
                ISBN = "978-1633691780",
                Classification = "Business",
                PageCount = 288,
                Price = 18.99m
            },
            new Book
            {
                BookId = 4,
                Title = "Clean Code",
                Author = "Robert C. Martin",
                Publisher = "Prentice Hall",
                ISBN = "978-0132350884",
                Classification = "Technology",
                PageCount = 464,
                Price = 44.99m
            },
            new Book
            {
                BookId = 5,
                Title = "The Pragmatic Programmer",
                Author = "Andrew Hunt, David Thomas",
                Publisher = "Addison-Wesley Professional",
                ISBN = "978-0135957059",
                Classification = "Technology",
                PageCount = 352,
                Price = 39.99m
            },
            new Book
            {
                BookId = 6,
                Title = "Sapiens",
                Author = "Yuval Noah Harari",
                Publisher = "Harper",
                ISBN = "978-0062316097",
                Classification = "History",
                PageCount = 464,
                Price = 17.99m
            },
            new Book
            {
                BookId = 7,
                Title = "Atomic Habits",
                Author = "James Clear",
                Publisher = "Avery",
                ISBN = "978-0735211292",
                Classification = "Self-Help",
                PageCount = 320,
                Price = 14.99m
            },
            new Book
            {
                BookId = 8,
                Title = "Thinking, Fast and Slow",
                Author = "Daniel Kahneman",
                Publisher = "Farrar, Straus and Giroux",
                ISBN = "978-0374533557",
                Classification = "Psychology",
                PageCount = 499,
                Price = 19.99m
            },
            new Book
            {
                BookId = 9,
                Title = "The 7 Habits of Highly Effective People",
                Author = "Stephen R. Covey",
                Publisher = "Free Press",
                ISBN = "978-1982137274",
                Classification = "Self-Help",
                PageCount = 464,
                Price = 16.99m
            },
            new Book
            {
                BookId = 10,
                Title = "Good to Great",
                Author = "Jim Collins",
                Publisher = "HarperBusiness",
                ISBN = "978-0066620992",
                Classification = "Business",
                PageCount = 320,
                Price = 18.99m
            },
            new Book
            {
                BookId = 11,
                Title = "The Power of Habit",
                Author = "Charles Duhigg",
                Publisher = "Random House",
                ISBN = "978-0812981605",
                Classification = "Psychology",
                PageCount = 371,
                Price = 15.99m
            },
            new Book
            {
                BookId = 12,
                Title = "Educated",
                Author = "Tara Westover",
                Publisher = "Random House",
                ISBN = "978-0399590504",
                Classification = "Biography",
                PageCount = 334,
                Price = 14.99m
            },
            new Book
            {
                BookId = 13,
                Title = "How to Win Friends and Influence People",
                Author = "Dale Carnegie",
                Publisher = "Pocket Books",
                ISBN = "978-0671027032",
                Classification = "Self-Help",
                PageCount = 288,
                Price = 12.99m
            },
            new Book
            {
                BookId = 14,
                Title = "The Millionaire Next Door",
                Author = "Thomas J. Stanley, William D. Danko",
                Publisher = "Taylor Trade Publishing",
                ISBN = "978-1589795471",
                Classification = "Finance",
                PageCount = 272,
                Price = 15.99m
            },
            new Book
            {
                BookId = 15,
                Title = "Start with Why",
                Author = "Simon Sinek",
                Publisher = "Portfolio",
                ISBN = "978-1591846444",
                Classification = "Business",
                PageCount = 256,
                Price = 16.99m
            }
        );
    }
}
