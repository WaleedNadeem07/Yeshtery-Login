This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



This project implements a login form using Next.js, TailwindCSS, and Redux Toolkit based on the given Figma design and API specification.
Once logged in, the user is redirected to a dashboard that displays their ID and Name, and provides a Logout option.

Features:
  Login form with validation (email format, required fields)
  
  Integration with Yeshtery API for authentication:
  
  POST /v1/yeshtery/token for login
  
  GET /v1/user/info for fetching user details
  
  Stores authentication token in HTTP-only cookie
  
  Dashboard with user info (ID and name)
  
  Logout functionality
  
  State management using Redux Toolkit
  
  Authentication check and redirects on page load

Use the following credentials to log in:
  Email: dev.aert@gmail.com
  Password: helloworld

How It Works

Enter valid credentials and click Login.

The system calls the Login API and stores the token in an HTTP-only cookie.

The system fetches user info (id, name) and displays it on the dashboard.

Click Logout to clear the session and return to the login page.
