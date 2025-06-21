 # 🍕 Pizza Dashboard

**Your Name**: Rohit Kumar

## Project Overview

A modern, full-stack web application built with Next.js that provides a comprehensive pizza order management system. The application features secure Google OAuth authentication, responsive design, and an intuitive dashboard for tracking and managing pizza orders in real-time.



## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (version 18 or higher)
- pnpm (version 8 or higher)
- Google Cloud Console account (for OAuth credentials)

## Setup Instructions

### 1. Clone the Repository

git clone <your-repository-url>cd pizza-dashboard


### 2. Install Dependencies

pnpm install


### 3. Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. Google OAuth Setup



1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create a new OAuth 2.0 Client ID
5. Set the authorized redirect URI to: `http://localhost:3000/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your `.env.local` file

### 5. Generate NextAuth Secret

Generate a secure random string for your NextAuth secret:

```bash
openssl rand -base64 32
```



### 6. Run the Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Deployement on vercel
Import the project to from github to vercel and add .env var -- next once you get the domain update the exsisting  URL in both .env as well as google cloud 

## Assumptions and Challenges

### Assumptions Made

1. Mock Data: The application currently uses mock data for orders and statistics. In a production environment, this would be replaced with a real database.
2. Single User The current implementation assumes a single restaurant owner/staff member using the dashboard.
3. Google OAuth: Authentication is limited to Google OAuth only, though the structure allows for easy addition of other providers.

### Challenges Faced
No challenges faced as such for  this particular version but 
1. Real-time Updates: Implementing real-time order updates would require WebSocket connections or server-sent events.
2. Data Persistence: Current implementation uses client-side state; a production version would need a proper database.
3. Order Management: Advanced features like order editing, bulk operations, and inventory management would require additional development.

## Third-Party Libraries Used

### Core Dependencies
- **@auth/core**: Authentication core library
- **next-auth**: Complete authentication solution for Next.js
- **@hookform/resolvers**: Form validation resolvers
- **react-hook-form**: Performant forms with easy validation
- **zod**: TypeScript-first schema validation

### UI Components and Styling
- **@radix-ui/react-***: Comprehensive set of accessible UI primitives
- **tailwindcss-animate**: Animation utilities for Tailwind CSS
- **lucide-react**: Beautiful & consistent icon toolkit

Thank You
