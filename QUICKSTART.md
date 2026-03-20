# Quick Start Guide

## Start the Application

### Terminal 1 - Backend API
```bash
cd /Users/chasefisher/413/assignment11/BookstoreAPI
dotnet run
```
API will be available at: http://localhost:5149

### Terminal 2 - Frontend React App
```bash
cd /Users/chasefisher/413/assignment11/bookstore-frontend
npm run dev
```
Frontend will be available at: http://localhost:5173

## Access Points

- **Main Application**: http://localhost:5173
- **API Swagger Docs**: http://localhost:5149/swagger
- **API Direct**: http://localhost:5149/api/books

## Quick Test in Terminal

Test the API endpoint:
```bash
curl 'http://localhost:5149/api/books?pageNumber=1&pageSize=5' | python3 -m json.tool
```

Test sorting:
```bash
curl 'http://localhost:5149/api/books?pageNumber=1&pageSize=5&sortBy=title&sortOrder=asc' | python3 -m json.tool
```

## In Rider IDE

### Running Backend
1. Open the `BookstoreAPI` folder in Rider
2. Click the Run icon (▶) or press **⌃R** (Control+R)
3. View output in Run window (**⌘4**)

### Running Frontend
1. Open Terminal in Rider (**⌥F12** - Option+F12)
2. Navigate to bookstore-frontend: `cd bookstore-frontend`
3. Run: `npm run dev`

### Debugging Backend
1. Set breakpoints by clicking in the gutter (or **⌘F8**)
2. Click Debug icon (🐞) or press **⌃D** (Control+D)
3. Use:
   - **F8** - Step Over
   - **F7** - Step Into
   - **⇧F8** - Step Out
   - **⌥F9** - Run to Cursor

## Project Structure

```
assignment11/
├── BookstoreAPI/              # .NET Backend
│   ├── Controllers/
│   │   └── BooksController.cs     # API endpoints
│   ├── Models/
│   │   ├── Book.cs                # Book model
│   │   ├── BookstoreContext.cs    # EF Core DbContext
│   │   └── PagedResponse.cs       # Pagination DTO
│   ├── Program.cs                 # App configuration
│   ├── appsettings.json          # Settings & connection string
│   └── Bookstore.sqlite          # SQLite database (auto-created)
│
└── bookstore-frontend/        # React Frontend
    ├── src/
    │   ├── components/
    │   │   └── BookList.jsx       # Main book listing component
    │   ├── App.jsx                # Root component
    │   ├── main.jsx               # Entry point
    │   └── index.css              # Global styles
    └── package.json
```

## Key Features Implemented

### Backend (ASP.NET Core Web API)
- ✅ RESTful API with GET endpoints
- ✅ Entity Framework Core with SQLite
- ✅ Pagination (customizable page size)
- ✅ Sorting by title (asc/desc)
- ✅ CORS enabled for React
- ✅ Swagger API documentation
- ✅ 15 books pre-seeded in database

### Frontend (React + Bootstrap)
- ✅ Book listing component
- ✅ Pagination controls
- ✅ Page size selector (5, 10, 15, 20, 50)
- ✅ Sort by title button
- ✅ Bootstrap styling
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling

## Common Keyboard Shortcuts in Rider (macOS)

| Action | Shortcut |
|--------|----------|
| Run | ⌃R |
| Debug | ⌃D |
| Build Project | ⌘F9 |
| Find in Files | ⌘⇧F |
| Go to File | ⌘⇧O |
| Toggle Terminal | ⌥F12 |
| Toggle Run Window | ⌘4 |
| Toggle Breakpoint | ⌘F8 |
| Step Over | F8 |
| Step Into | F7 |
| Evaluate Expression | ⌥F8 |

## Stopping the Applications

### API (if running in terminal)
Press **Ctrl+C** in the terminal where the API is running

### React (if running in terminal)
Press **Ctrl+C** in the terminal where npm dev server is running

### In Rider
Click the Stop icon (⏹) or press **⌘F2**

## Viewing the Database in Rider

1. Open Database tool window: **View → Tool Windows → Database**
2. Click **+** → **Data Source** → **SQLite**
3. Point to: `/Users/chasefisher/413/assignment11/BookstoreAPI/Bookstore.sqlite`
4. Click **Test Connection** → **OK**
5. Expand the database to view tables and data

## Assignment Requirements Checklist

- ✅ Online bookstore web app created
- ✅ All book fields included (Title, Author, Publisher, ISBN, Classification, PageCount, Price)
- ✅ All fields required
- ✅ Database connected with seeded data
- ✅ Models match database tables
- ✅ Component displays all book information
- ✅ Pagination (5 books per page default)
- ✅ Customizable page size
- ✅ Bootstrap styling
- ✅ Sort by title functionality
- ✅ Component in App.jsx

## Next Steps for GitHub

```bash
cd /Users/chasefisher/413/assignment11
git init
git add .
git commit -m "Initial commit: Bookstore web application with pagination and sorting"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- View API documentation at http://localhost:5149/swagger (when running)
- Check browser console for frontend errors (F12 in most browsers)
- Check terminal output for backend errors
