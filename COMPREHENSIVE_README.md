# Magic Fitness

🏋️ A comprehensive fitness application combining home workouts, habit tracking, diet tracking, and personalized diet templates.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Features

### 1. Home Workouts
- 📹 No equipment required exercises
- 🎚️ Multiple difficulty levels (Beginner, Intermediate, Advanced)
- 📊 Video demonstrations and instructions
- 🎨 Customizable workout plans
- 📈 Progress tracking
- 🏆 Workout history

### 2. Habit Tracking
- ✅ Daily habit logging
- 🔥 Streak counter and longest streak
- 📊 Progress visualization
- ⏰ Habit reminders
- 📈 Completion statistics
- 🎯 Custom habit creation

### 3. Diet Tracking
- 📊 Calorie tracking
- 🥗 Macronutrient monitoring (Protein, Carbs, Fats)
- 🍔 Food database integration
- 🍽️ Meal logging
- 💧 Water intake tracking
- 📈 Daily nutrition summary

### 4. Diet Templates
- 📋 Pre-designed meal plans
- 🔧 Customizable templates
- 👨‍⚕️ Nutritionist-approved plans
- 🎯 Goal-based recommendations
- 📅 Weekly meal planning
- 🌍 Multiple cuisine types

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Icons**: React Icons
- **Notifications**: React Toastify

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Password Hashing**: bcryptjs
- **Validation**: Joi
- **CORS**: Enabled

## 📁 Project Structure

```
magic-fitness/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Exercise.js
│   │   ├── Workout.js
│   │   ├── WorkoutProgress.js
│   │   ├── Habit.js
│   │   ├── HabitLog.js
│   │   ├── Food.js
│   │   ├── Meal.js
│   │   ├── DietTemplate.js
│   │   └── UserDietTracker.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── workoutController.js
│   │   ├── habitController.js
│   │   ├── dietController.js
│   │   └── userController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── workouts.js
│   │   ├── habits.js
│   │   ├── diet.js
│   │   └── users.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── utils/
│   │   ├── fitness.js
│   │   └── helpers.js
│   ├── server.js
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── StatCard.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── WorkoutsPage.jsx
│   │   │   ├── HabitsPage.jsx
│   │   │   ├── DietPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── redux/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── workoutSlice.js
│   │   │   │   ├── habitSlice.js
│   │   │   │   └── dietSlice.js
│   │   │   └── store.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md
├── .gitignore
├── package.json
├── server.js
├── .env.example
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/PratoolGit/magic-fitness.git
   cd magic-fitness
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your configuration:
   ```
   MONGODB_URI=mongodb://localhost:27017/magic-fitness
   PORT=5000
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRE=7d
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the server**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   App will open at `http://localhost:3000`

## 📖 Usage

### User Registration
1. Click "Register" on the landing page
2. Fill in your details (name, email, password)
3. Select fitness goal and experience level
4. Submit to create account

### Starting a Workout
1. Go to Workouts section
2. Filter by difficulty or category
3. Click "Start Workout"
4. Complete exercises and log completion

### Creating Habits
1. Go to Habits section
2. Click "New Habit"
3. Set habit details (name, category, frequency)
4. Log daily to build streaks

### Tracking Diet
1. Go to Diet section
2. Log meals for the day
3. View calorie and macro summaries
4. Browse and apply diet templates

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - User login
POST   /api/auth/logout            - User logout
GET    /api/auth/me                - Get current user
POST   /api/auth/change-password   - Change password
```

### Workouts
```
GET    /api/workouts              - Get all workouts
GET    /api/workouts/:id          - Get workout details
POST   /api/workouts/create       - Create custom workout
PUT    /api/workouts/:id          - Update workout
POST   /api/workouts/start        - Start workout
POST   /api/workouts/complete     - Complete workout
GET    /api/workouts/history/all  - Get workout history
```

### Habits
```
POST   /api/habits/create         - Create habit
GET    /api/habits/all            - Get user habits
GET    /api/habits/:id            - Get habit details
PUT    /api/habits/:id            - Update habit
POST   /api/habits/:id/log        - Log habit completion
GET    /api/habits/:id/logs       - Get habit logs
GET    /api/habits/:id/stats      - Get habit statistics
DELETE /api/habits/:id            - Delete habit
```

### Diet
```
POST   /api/diet/log-meal                     - Log meal
GET    /api/diet/today                        - Get daily summary
GET    /api/diet/templates/all                - Get templates
GET    /api/diet/templates/:id                - Get template details
POST   /api/diet/templates/create             - Create custom template
GET    /api/diet/user-templates/all           - Get user templates
POST   /api/diet/calorie-goal                 - Update calorie goal
GET    /api/diet/analytics/nutrition          - Get nutrition analytics
POST   /api/diet/water/log                    - Log water intake
```

### Users
```
GET    /api/users/profile         - Get user profile
PUT    /api/users/profile         - Update profile
PUT    /api/users/preferences     - Update preferences
GET    /api/users/statistics      - Get user statistics
PUT    /api/users/profile-image   - Update profile image
```

## 💾 Database Models

### User
- Personal information (name, email, age, gender)
- Body metrics (height, weight)
- Fitness preferences (goal, experience level)
- Settings and statistics

### Workout & Exercise
- Exercise library with descriptions
- Workout plans with exercises
- Difficulty levels and categories
- Duration and calories burned

### Habits
- Custom habit creation
- Streak tracking
- Completion logs
- Statistics

### Diet
- Food database
- Meal logging
- Diet templates
- Daily nutrition tracking

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- CORS protection
- Input validation
- Protected routes
- Secure token storage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Pratool Official**
- GitHub: [@PratoolGit](https://github.com/PratoolGit)
- Email: raypratoolofficial@gmail.com

## 🙏 Acknowledgments

- Inspired by popular fitness apps
- Community feedback and suggestions
- Open source libraries and frameworks

## 📞 Support

For support, email raypratoolofficial@gmail.com or open an issue on GitHub.

---

**Made with ❤️ by Magic Fitness Team**
