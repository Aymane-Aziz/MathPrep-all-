# Math World Application

A comprehensive math learning platform for children with interactive games, progress tracking, and achievements.

## Getting Started

Follow these steps to set up and run the Math World application on your local machine.

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- MongoDB Atlas account (connection string is already provided)

### Environment Setup

1. Create a `.env.local` file in the root directory with the following variables:

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://Aymane_Aziz:aymaneAziz1909@room.jr8hd.mongodb.net/mathworld
JWT_SECRET=your_secure_random_string_here
\`\`\`

You can generate a secure JWT_SECRET using:
\`\`\`bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

### Installation

1. Install the required dependencies:

\`\`\`bash
npm install mongodb bcryptjs jose
\`\`\`

2. Run the development server:

\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Test Accounts

The application comes with two pre-seeded test accounts that you can use:

#### Test User 1
- **Email**: test@example.com
- **Password**: password123
- **Features**: Has some progress in addition and subtraction topics, played addition-race game, and unlocked the "Math Beginner" achievement.

#### Test User 2
- **Email**: student@example.com
- **Password**: password456
- **Features**: New account with no progress or achievements.

### Seeding the Database

To reset the database and populate it with test data:

\`\`\`bash
npx ts-node scripts/seed-db.ts
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/reset-password` - Request password reset

### Progress
- `GET /api/progress` - Get user's overall progress
- `PUT /api/progress/topics/:topicId` - Update progress for a specific topic
- `PUT /api/progress/games/:gameId` - Update progress for a specific game

### Achievements
- `GET /api/achievements` - Get all achievements and unlock status
- `POST /api/achievements/:achievementId/unlock` - Unlock a specific achievement

## Project Structure

- `/app` - Next.js App Router pages and API routes
- `/components` - Reusable React components
- `/contexts` - React context providers
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and API clients
- `/scripts` - Database seeding and other scripts

## Development Notes

- The application uses Next.js App Router for both frontend and API routes
- MongoDB is used as the database with direct connection (no ORM)
- Authentication is handled with JWT tokens
- The frontend communicates with the backend through the API utility in `lib/api.ts`
