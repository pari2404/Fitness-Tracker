# API Documentation

## Base URL
```
https://api.magic-fitness.com/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

Successful responses:
```json
{
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2026-05-12T15:48:49Z"
}
```

Error responses:
```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2026-05-12T15:48:49Z"
}
```

## Endpoints

### Authentication

#### Register
```
POST /api/auth/register
```

Request:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "fitnessGoal": "Weight Loss",
  "experienceLevel": "Beginner"
}
```

Response (201):
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "fitnessGoal": "Weight Loss",
    "experienceLevel": "Beginner"
  }
}
```

#### Login
```
POST /api/auth/login
```

Request:
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

Response (200):
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": { ... }
}
```

### Workouts

#### Get All Workouts
```
GET /api/workouts?difficulty=Beginner&category=Cardio&page=1&limit=10
```

Query Parameters:
- `difficulty` (optional): Beginner, Intermediate, Advanced
- `category` (optional): Cardio, Strength, Flexibility, HIIT, Yoga, Mixed
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

Response (200):
```json
{
  "workouts": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Beginner Full Body",
      "description": "Perfect for beginners",
      "category": "Mixed",
      "difficulty": "Beginner",
      "duration": 30,
      "caloriesBurned": 150,
      "exercises": [ ... ]
    }
  ],
  "totalPages": 5,
  "currentPage": 1,
  "total": 45
}
```

#### Start Workout
```
POST /api/workouts/start
```

Request:
```json
{
  "workoutId": "507f1f77bcf86cd799439011"
}
```

Response (201):
```json
{
  "message": "Workout started",
  "workoutProgress": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439010",
    "workoutId": "507f1f77bcf86cd799439011",
    "startTime": "2026-05-12T15:48:49Z",
    "status": "In Progress"
  }
}
```

#### Complete Workout
```
POST /api/workouts/complete
```

Request:
```json
{
  "progressId": "507f1f77bcf86cd799439012",
  "caloriesBurned": 150,
  "notes": "Great workout!"
}
```

Response (200):
```json
{
  "message": "Workout completed",
  "workoutProgress": { ... }
}
```

### Habits

#### Create Habit
```
POST /api/habits/create
```

Request:
```json
{
  "name": "Morning Meditation",
  "description": "10 minutes daily meditation",
  "category": "Meditation",
  "frequency": "Daily",
  "reminderTime": "06:00",
  "color": "#3498db"
}
```

Response (201):
```json
{
  "message": "Habit created successfully",
  "habit": {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439010",
    "name": "Morning Meditation",
    "description": "10 minutes daily meditation",
    "category": "Meditation",
    "frequency": "Daily",
    "currentStreak": 0,
    "longestStreak": 0,
    "totalCompletions": 0
  }
}
```

#### Log Habit Completion
```
POST /api/habits/:id/log
```

Request:
```json
{
  "status": "Completed",
  "notes": "Felt great today"
}
```

Response (201):
```json
{
  "message": "Habit logged successfully",
  "habitLog": {
    "_id": "507f1f77bcf86cd799439014",
    "habitId": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439010",
    "date": "2026-05-12T00:00:00Z",
    "status": "Completed",
    "completedAt": "2026-05-12T15:48:49Z"
  },
  "habit": { ... }
}
```

### Diet

#### Log Meal
```
POST /api/diet/log-meal
```

Request:
```json
{
  "mealType": "Breakfast",
  "foods": [
    {
      "foodId": "507f1f77bcf86cd799439015",
      "quantity": 100,
      "unit": "g"
    }
  ],
  "notes": "Healthy breakfast",
  "time": "08:00"
}
```

Response (201):
```json
{
  "message": "Meal logged successfully",
  "meal": {
    "_id": "507f1f77bcf86cd799439016",
    "userId": "507f1f77bcf86cd799439010",
    "mealType": "Breakfast",
    "totalCalories": 350,
    "totalProtein": 20,
    "totalCarbs": 45,
    "totalFats": 12
  },
  "tracker": { ... }
}
```

#### Get Daily Summary
```
GET /api/diet/today?date=2026-05-12
```

Response (200):
```json
{
  "tracker": {
    "dailyGoal": {
      "calories": 2000,
      "protein": 150,
      "carbohydrates": 250,
      "fats": 65
    },
    "consumed": {
      "calories": 1200,
      "protein": 95,
      "carbohydrates": 130,
      "fats": 40
    },
    "meals": [ ... ]
  },
  "remaining": {
    "calories": 800,
    "protein": 55,
    "carbohydrates": 120,
    "fats": 25
  }
}
```

### Users

#### Get Profile
```
GET /api/users/profile
```

Response (200):
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439010",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "age": 28,
    "gender": "Male",
    "height": 175,
    "weight": 85,
    "fitnessGoal": "Weight Loss",
    "experienceLevel": "Beginner",
    "statistics": {
      "totalWorkouts": 10,
      "totalMinutes": 300,
      "caloriesBurned": 2500,
      "streakDays": 5
    }
  }
}
```

#### Update Profile
```
PUT /api/users/profile
```

Request:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "age": 29,
  "gender": "Male",
  "height": 175,
  "weight": 82,
  "fitnessGoal": "Muscle Gain",
  "experienceLevel": "Intermediate"
}
```

Response (200):
```json
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

## Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Rate Limiting

API endpoints are rate limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## Status Codes

- `200` - OK
- `201` - Created
- `204` - No Content
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Pagination

Paginated endpoints support:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

## Filters

Filters are query parameters that narrow results. Check individual endpoint documentation for available filters.

## Sorting

Many endpoints support sorting via `sort` parameter:
- `sort=name` (ascending)
- `sort=-name` (descending)

## Search

Search functionality uses the `search` parameter on supported endpoints.
