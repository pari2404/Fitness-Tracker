# Magic Fitness Backend

Node.js/Express backend for Magic Fitness application.

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update with your configuration:

```
MONGODB_URI=mongodb://localhost:27017/magic-fitness
PORT=5000
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Workouts
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get workout details
- `POST /api/workouts/create` - Create custom workout
- `POST /api/workouts/start` - Start workout
- `POST /api/workouts/complete` - Complete workout

### Habits
- `GET /api/habits/all` - Get all user habits
- `POST /api/habits/create` - Create new habit
- `POST /api/habits/:id/log` - Log habit completion
- `GET /api/habits/:id/stats` - Get habit statistics

### Diet
- `POST /api/diet/log-meal` - Log meal
- `GET /api/diet/today` - Get daily summary
- `GET /api/diet/templates/all` - Get diet templates
- `POST /api/diet/templates/create` - Create custom template
- `GET /api/diet/analytics/nutrition` - Get nutrition analytics

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/statistics` - Get user statistics

## Database Models

- User
- Exercise
- Workout
- WorkoutProgress
- Habit
- HabitLog
- Food
- Meal
- DietTemplate
- UserDietTracker

## Middleware

- JWT Authentication (`authenticate`)
- Input Validation
- Error Handling

## Security

- Password hashing with bcryptjs
- JWT token-based authentication
- CORS enabled
- Input validation with Joi

## Testing

```bash
npm test
```
