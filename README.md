# Magic Fitness

A comprehensive fitness app that combines home workout exercises, habit tracking, diet tracking, and personalized diet templates.

## Features

### 1. Home Workouts
- No equipment required exercises
- Multiple difficulty levels (Beginner, Intermediate, Advanced)
- Video demonstrations and instructions
- Customizable workout plans
- Progress tracking

### 2. Habit Tracking
- Daily habit logging
- Streak counter
- Progress visualization
- Habit reminders
- Custom habit creation

### 3. Diet Tracking
- Calorie tracking
- Macronutrient monitoring (Protein, Carbs, Fats)
- Food database integration
- Meal logging
- Daily nutrition summary

### 4. Diet Templates
- Pre-designed meal plans
- Customizable templates
- Nutritionist-approved plans
- Goal-based recommendations
- Weekly meal planning

## Tech Stack

- **Frontend**: React.js, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Mobile**: React Native (Future)

## Installation

### Backend Setup
```bash
git clone https://github.com/PratoolGit/magic-fitness.git
cd magic-fitness
npm install
cp .env.example .env
# Update .env with your configuration
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Directory Structure

```
magic-fitness/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── utils/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── styles/
│   └── public/
├── database/
│   └── schemas/
├── assets/
└── docs/
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Workouts
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get workout details
- `POST /api/workouts/start` - Start workout
- `POST /api/workouts/complete` - Complete workout

### Habits
- `GET /api/habits` - Get user habits
- `POST /api/habits` - Create habit
- `PUT /api/habits/:id` - Update habit
- `POST /api/habits/:id/log` - Log habit completion

### Diet
- `GET /api/diet/today` - Get today's diet
- `POST /api/diet/log-meal` - Log meal
- `GET /api/diet/templates` - Get diet templates
- `POST /api/diet/templates/create` - Create custom template
- `POST /api/diet/analytics` - Get nutrition analytics

## License

MIT License
