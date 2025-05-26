# Job Search Application

This is a **Next.js 14** project for a job search application. The app allows users to search for jobs, view job details, like jobs, and manage their profile. It also includes an Express.js backend for authentication.

---

## Features

### Frontend
- **Job Search:**
  - Users can search for jobs by title.
  - Search results are displayed as a list of cards.
- **Job Details:**
  - Each job card has a "Details" button that navigates to `/job-details/:id`.
  - The details page displays all job information, including title, image, description, and more.
- **Liked Jobs:**
  - Users can like jobs, which are stored in `LocalStorage`.
  - Liked jobs are displayed on a separate page (`/liked`).
  - Users can remove jobs from the liked list.
- **Profile Management:**
  - Users can create a profile on the `/create-profile` page.
  - Profile includes:
    - **Name** (input)
    - **Desired Job Title** (input)
    - **About Me** (textarea)
  - Profile data is stored in `LocalStorage`.
- **Job Recommendations:**
  - On the `/jobs` page, users receive job recommendations based on their profile data.
  - If no profile data exists, users can still search for jobs.

### Backend
- **Authentication:**
  - A small Express.js app handles authentication (email + password).
  - MongoDB (free cluster) is used to store user data.
  - The backend can be deployed on Render (free tier).

---

## API

This project uses the [JSearch API](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch) for job data.

- **API Limitations:**
  - 200 requests per month (sufficient for 2-3 days of usage).
- **Endpoints:**
  - `/search` for job search.
  - `/job-details/:id` for job details.

---

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/job-search.git
   cd job-search
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

