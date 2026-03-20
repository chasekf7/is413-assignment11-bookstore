# Bookstore Web Application - Assignment 11

This is a full-stack web application for an online bookstore, built with ASP.NET Core Web API backend and React frontend.

## Project Structure

```
assignment11/
├── BookstoreAPI/          # ASP.NET Core Web API backend
│   ├── Controllers/       # API controllers
│   ├── Models/           # Data models and DbContext
│   └── Bookstore.sqlite  # SQLite database
└── bookstore-frontend/   # React frontend
    └── src/
        └── components/   # React components
```

## Technologies Used

### Backend
- ASP.NET Core Web API (.NET 10)
- Entity Framework Core
- SQLite Database
- Swagger/OpenAPI for API documentation

### Frontend
- React (with Vite)
- Bootstrap 5 for styling
- Modern JavaScript (ES6+)

## Features

### Backend API
- RESTful API with pagination support
- Sorting by multiple fields (title, author, price, page count)
- CORS enabled for cross-origin requests
- Swagger UI for API testing
- Seeded database with 15 books

### Frontend
- Clean, Bootstrap-styled interface
- Pagination with customizable page size (5, 10, 15, 20, 50 books per page)
- Sort books by title (ascending/descending)
- Responsive design
- Real-time API integration
- Loading states and error handling

## Database Schema

### Book Table
- `BookId` (int, Primary Key)
- `Title` (string, required)
- `Author` (string, required)
- `Publisher` (string, required)
- `ISBN` (string, required)
- `Classification` (string, required) - Book category
- `PageCount` (int, required)
- `Price` (decimal, required)

## API Endpoints

### GET /api/books
Retrieve paginated list of books with optional sorting.

**Query Parameters:**
- `pageNumber` (int, default: 1) - Page number to retrieve
- `pageSize` (int, default: 5) - Number of books per page
- `sortBy` (string, optional) - Field to sort by (title, author, price, pagecount)
- `sortOrder` (string, default: asc) - Sort direction (asc or desc)

**Response:**
```json
{
  "items": [...],
  "totalCount": 15,
  "pageNumber": 1,
  "pageSize": 5,
  "totalPages": 3
}
```

### GET /api/books/{id}
Retrieve a single book by ID.

## Setup Instructions

### Prerequisites
- .NET 10 SDK
- Node.js (v22+)
- npm (v10+)

### Backend Setup

1. Navigate to the BookstoreAPI directory:
   ```bash
   cd BookstoreAPI
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the API:
   ```bash
   dotnet run
   ```

   The API will start on `http://localhost:5149`

4. Access Swagger UI:
   Open `http://localhost:5149/swagger` in your browser

### Frontend Setup

1. Navigate to the bookstore-frontend directory:
   ```bash
   cd bookstore-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

## Running the Complete Application

1. **Start the Backend:**
   ```bash
   cd BookstoreAPI
   dotnet run
   ```

2. **Start the Frontend (in a new terminal):**
   ```bash
   cd bookstore-frontend
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## Usage

### Pagination
- Use the pagination controls at the bottom to navigate between pages
- Change the "Books per page" dropdown to adjust how many books are displayed

### Sorting
- Click the "Sort by Title" button to sort books alphabetically
- Click again to reverse the sort order (indicated by ↑ or ↓)
- Click "Clear Sort" to return to default ordering

### Book Information Displayed
Each book shows:
- Book ID
- Title (bold)
- Author
- Publisher
- ISBN (monospace font)
- Category (colored badge)
- Page count
- Price (green, formatted as currency)

## Development Notes

### In Rider IDE (macOS)

**Running the Backend:**
- Open `BookstoreAPI.sln` or the folder in Rider
- Use ⌃R (Control + R) to run the project
- View output in the Run tool window (⌘4)

**Building:**
- Use ⌘F9 to build the project
- Or use Terminal tool window (⌥F12) and run `dotnet build`

**Database Inspection:**
- Use Rider's Database tool window (View → Tool Windows → Database)
- Add the SQLite database file: `BookstoreAPI/Bookstore.sqlite`
- Browse tables and data directly in Rider

**Debugging:**
- Set breakpoints by clicking in the gutter (or ⌘F8)
- Use ⌃D (Control + D) to debug
- Step through code with F8 (step over) or F7 (step into)

### Key Learning Concepts

1. **ASP.NET Core Web API**
   - Creating RESTful endpoints
   - Dependency injection with `DbContext`
   - CORS configuration for cross-origin requests
   - Query parameter handling

2. **Entity Framework Core**
   - Code-first database approach
   - DbContext configuration
   - Data seeding
   - LINQ queries for pagination and sorting

3. **React Concepts**
   - useState and useEffect hooks
   - API integration with fetch
   - Conditional rendering
   - Component-based architecture
   - Event handling

4. **Bootstrap Styling**
   - Responsive grid system
   - Component styling (cards, tables, buttons, badges)
   - Utility classes
   - Form controls

5. **Full-Stack Integration**
   - Frontend-backend communication
   - RESTful API design
   - State management
   - Error handling

## Common Issues and Solutions

### API not connecting
- Ensure the API is running on port 5149
- Check CORS configuration in `Program.cs`
- Verify the API_BASE_URL in `BookList.jsx`

### Books not displaying
- Check browser console for errors
- Verify the API is returning data: `http://localhost:5149/api/books`
- Ensure the database was created and seeded

### Port conflicts
- If port 5149 or 5173 is in use, stop the conflicting process
- Or modify the port in `launchSettings.json` (API) or `vite.config.js` (frontend)

## Assignment Requirements Checklist

- ✅ Created web app for online bookstore
- ✅ All required book fields included (Title, Author, Publisher, ISBN, Classification, PageCount, Price)
- ✅ All fields are required in the model
- ✅ Database connected and seeded with books
- ✅ Models match database tables
- ✅ Component lists all book information
- ✅ Pagination implemented (5 books per page default)
- ✅ User can change number of results per page
- ✅ Bootstrap styling applied
- ✅ Sort by book title functionality added
- ✅ Component added to App.jsx (App.tsx equivalent)

## Author
Chase Fisher - IS 413 Assignment 11

## Acknowledgments
- Inspired by Amazon's origin story
- Database seeded with Prof. Hilton's favorite books
- Built with modern web development best practices
