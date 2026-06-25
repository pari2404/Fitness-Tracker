# Magic Fitness Frontend

React-based frontend for Magic Fitness application.

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the App

### Development
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Production Build
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── PrivateRoute.jsx
│   └── StatCard.jsx
├── pages/
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── WorkoutsPage.jsx
│   ├── HabitsPage.jsx
│   ├── DietPage.jsx
│   └── ProfilePage.jsx
├── redux/
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── workoutSlice.js
│   │   ├── habitSlice.js
│   │   └── dietSlice.js
│   └── store.js
├── services/
│   └── api.js
└── App.jsx
```

## Technologies

- React 18
- Redux Toolkit
- Tailwind CSS
- React Router v6
- Axios
- React Icons
- React Toastify

## Features

- User authentication
- Workout tracking
- Habit tracking with streaks
- Diet tracking with macronutrients
- Responsive design
- Dark mode support (can be added)

## API Integration

The app uses Axios for API calls. All requests automatically include JWT tokens from localStorage.

## State Management

Redux Toolkit is used for global state management with slices for:
- Authentication
- Workouts
- Habits
- Diet

## Styling

Tailwind CSS is used for styling with custom configuration for brand colors.
