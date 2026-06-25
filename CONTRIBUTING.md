# Contributing to Magic Fitness

Thank you for your interest in contributing to Magic Fitness! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/magic-fitness.git`
3. Add upstream remote: `git remote add upstream https://github.com/PratoolGit/magic-fitness.git`
4. Create a feature branch: `git checkout -b feature/your-feature`

## Development Setup

### Backend
```bash
cd magic-fitness
npm install
cp .env.example .env
# Update .env with your configuration
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Code Style

- Use 2 spaces for indentation
- Use meaningful variable and function names
- Write descriptive commit messages
- Comment complex logic
- Follow existing code patterns

## Commit Messages

Format: `[Type] Description`

Types:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code refactoring
- `test:` Testing
- `chore:` Maintenance

Example:
```
feat: Add water intake tracking to diet page
fix: Resolve habit streak calculation issue
docs: Update API documentation
```

## Pull Request Process

1. Ensure your code follows the style guide
2. Update documentation if needed
3. Test your changes thoroughly
4. Push to your fork
5. Submit a pull request with clear description
6. Wait for review and address feedback

## Areas for Contribution

### High Priority
- [ ] Mobile responsive design improvements
- [ ] Performance optimization
- [ ] Additional workout exercises
- [ ] More diet templates
- [ ] User analytics dashboard
- [ ] Social sharing features

### Medium Priority
- [ ] Dark mode support
- [ ] Multiple language support
- [ ] Advanced filtering options
- [ ] Export data features
- [ ] Notification system

### Nice to Have
- [ ] Gamification elements
- [ ] Community features
- [ ] Advanced charts and analytics
- [ ] AI-powered recommendations
- [ ] Mobile app (React Native)

## Reporting Issues

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (browser, OS, etc.)

## Questions?

Feel free to ask questions by:
- Opening a discussion
- Creating an issue
- Contacting maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to Magic Fitness!
