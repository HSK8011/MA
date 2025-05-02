# Technical Context

## Technology Stack

### Frontend
- **Framework**: React with Vite
- **Language**: JavaScript (ES6+)
- **State Management**: React Context
- **Styling**: Bootstrap
- **HTTP Client**: Axios
- **Testing**: Vitest
- **Package Manager**: npm

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT
- **API Documentation**: Swagger
- **Validation**: Express-validator
- **Testing**: Jest

## Development Setup

### Prerequisites
- Node.js (Latest LTS version)
- npm (Latest stable version)
- MongoDB Atlas account
- Twitter Developer Account
- Git

### Environment Variables
```
# Backend
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=24h
EMAIL_SERVICE=your_email_service
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=your_email_from
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:5000/api
VITE_TWITTER_API_KEY=your_twitter_api_key
```

### Development Tools
- VS Code (Recommended IDE)
- MongoDB Compass (Database GUI)
- Postman (API Testing)
- Git (Version Control)

## Dependencies

### Frontend Dependencies
```json
{
  "dependencies": {
    "axios": "^1.x.x",
    "bootstrap": "^5.x.x",
    "react": "^18.x.x",
    "react-dom": "^18.x.x",
    "react-router-dom": "^6.x.x",
    "react-bootstrap": "^2.x.x",
    "react-icons": "^4.x.x",
    "react-toastify": "^9.x.x"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x.x",
    "vite": "^4.x.x",
    "vitest": "^0.x.x"
  }
}
```

### Backend Dependencies
```json
{
  "dependencies": {
    "bcryptjs": "^2.x.x",
    "cors": "^2.x.x",
    "dotenv": "^16.x.x",
    "express": "^4.x.x",
    "express-validator": "^7.x.x",
    "jsonwebtoken": "^9.x.x",
    "mongoose": "^7.x.x",
    "nodemailer": "^6.x.x",
    "swagger-ui-express": "^4.x.x",
    "yamljs": "^0.3.x"
  },
  "devDependencies": {
    "jest": "^29.x.x",
    "nodemon": "^2.x.x",
    "supertest": "^6.x.x"
  }
}
```

## API Structure

### Base URL
- Development: http://localhost:5000/api
- Production: [TBD]

### API Versioning
- All endpoints prefixed with /api/v1

### Response Format
```json
{
  "success": boolean,
  "data": object | array | null,
  "error": string | null,
  "message": string
}
```

### Error Handling
```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Error description",
  "stack": "Stack trace (development only)"
}
```

## Security Measures
1. CORS Configuration
2. Rate Limiting
3. Input Validation
4. XSS Protection
5. CSRF Protection
6. Secure Headers
7. Password Hashing
8. JWT Token Management 