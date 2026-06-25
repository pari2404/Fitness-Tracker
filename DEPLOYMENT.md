# Deployment Guide

## Magic Fitness Deployment

### Prerequisites
- Node.js and npm
- MongoDB Atlas account or MongoDB server
- Heroku account (for backend)
- Vercel or Netlify account (for frontend)

## Backend Deployment (Heroku)

### 1. Create Heroku App
```bash
heroku login
heroku create your-app-name
```

### 2. Set Environment Variables
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production
```

### 3. Deploy Backend
```bash
git push heroku main
```

### 4. Monitor Logs
```bash
heroku logs --tail
```

## Frontend Deployment (Vercel)

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Deploy Frontend
```bash
cd frontend
vercel
```

### 3. Set Environment Variables in Vercel Dashboard
```
REACT_APP_API_URL=https://your-backend-heroku-url.herokuapp.com/api
```

## Frontend Deployment (Netlify)

### 1. Build Frontend
```bash
cd frontend
npm run build
```

### 2. Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### 3. Set Environment Variables in Netlify Dashboard
```
REACT_APP_API_URL=https://your-backend-url/api
```

## MongoDB Setup

### Using MongoDB Atlas
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Add to environment variables

## Production Checklist

- [ ] Set all environment variables
- [ ] Enable HTTPS
- [ ] Set up SSL certificates
- [ ] Configure CORS properly
- [ ] Set up database backups
- [ ] Configure error logging (Sentry)
- [ ] Set up monitoring (New Relic, DataDog)
- [ ] Test all API endpoints
- [ ] Test user authentication
- [ ] Optimize images
- [ ] Minify and bundle code
- [ ] Set up CI/CD pipeline

## CI/CD Setup (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy backend
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: |
          git remote add heroku https://git.heroku.com/your-app.git
          git push heroku main
      
      - name: Deploy frontend
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: |
          cd frontend
          vercel --prod --token=$VERCEL_TOKEN
```

## Performance Optimization

### Backend
- Enable gzip compression
- Implement caching
- Use CDN for static assets
- Optimize database queries
- Implement rate limiting

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- CSS minification
- JavaScript minification
- Browser caching

## Security

- Always use HTTPS
- Set secure CORS headers
- Validate all inputs
- Use environment variables for secrets
- Implement rate limiting
- Set up DDoS protection
- Regular security audits

## Monitoring & Logging

- Set up application monitoring
- Configure error tracking
- Monitor API performance
- Track user analytics
- Log all errors and warnings

## Support

For deployment issues, check documentation:
- [Heroku Docs](https://devcenter.heroku.com)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
