## Potential Improvements

- **UI**:  
  I would want to spend more time in improving the UI. When looking into how it looks on mobile or tablet the Specialties are causing the column to be too wide. Also the cards could use some improvement to how they look on mobile. The pill shape I have for their education and the years of experience are two different shapes and it looks off. Also I would add some type of FAB to allow a user to navigate to the top on mobile since it can be lots of scrolling. Maybe look into either infinite query or better position for pagination.

- **Testing**:  
  Implement unit tests for individual functions and components, and integration tests for API routes and database interactions. Use tools like Jest or Vitest. I notice in some manual QA I could improve what is being returned in the database query for search function so testing can help keep a consistent codebase.

- **Error Handling**:  
  Create a error handling strategy for both frontend and backend. Use some type of logging solution like sentry. Return meaningful error messages to users and avoid exposing sensitive information. The big important thing is keep a consistent expectation from the backend to the frontend.

- **Code Modularity**:  
  I would like to break down some of the larger components I have into smaller, focused modules. The idea is to keep components single-purpose and easy to test.

- **Performance**:  
  Profile API endpoints and database queries for bottlenecks. Minimize unnecessary re-renders or too much code shifting. If the dataset is large adding something like infinite scrolling can help with the UX.

- **Improved Filtering**:  
  Enhance the filtering logic for data tables and API endpoints. Implement multi-field and partial match filtering, and allow users to combine filters (e.g., by name, status, date range). I am right now filtering by a search field and using like in sql to find match. Would spend time thinking of ways to improve this. I would also like to add the ability to order by and hide columns to improve the UX.

- **Database**:  
  Add Database indexes on frequently search columns, add restriction range for things like years of experience for query, better indexing for specialties search.

- **Accessibility**:  
  There is already some built in ARIA in some of the libraries/components I use. Need to test with screen readers and keyboard navigation. Ensure color contrast and focus states are accessible. Use tools like browserstack to help evaluate our code.
