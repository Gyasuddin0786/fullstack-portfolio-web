# Developer Portfolio Web App

A complete full-stack portfolio application built with React, TailwindCSS, Node.js, Express, and MongoDB.

## Features

### Public Portfolio
- **Responsive Design**: Modern glassmorphism UI with dark/light mode
- **Hero Section**: Personal introduction with avatar and social links
- **About Section**: Bio and personal information
- **Skills Section**: Technology expertise showcase
- **Projects Section**: Dynamic project cards with filtering and search
- **Contact Form**: Email integration with message storage
- **Smooth Animations**: Framer Motion powered transitions

### Admin Dashboard
- **JWT Authentication**: Secure login system
- **Project Management**: Full CRUD operations for projects
- **Profile Management**: Update personal information and social links
- **Image Upload**: AWS S3 with Cloudinary fallback
- **Featured Projects**: Highlight important work
- **Responsive Admin Panel**: Mobile-friendly dashboard

### Technical Features
- **Modern Stack**: React 19, Node.js, Express, MongoDB
- **Security**: JWT auth, bcrypt, helmet, CORS, rate limiting
- **Image Handling**: Pre-signed URLs for secure uploads
- **Email System**: Nodemailer integration for contact form
- **Search & Filter**: Full-text search and technology filtering
- **SEO Friendly**: Proper meta tags and semantic HTML

## Tech Stack

### Frontend
- **React 19** with Vite
- **TailwindCSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Framer Motion** for animations
- **React Hot Toast** for notifications
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Nodemailer** for email
- **AWS SDK** for S3 uploads
- **Cloudinary** as upload fallback
- **Express Validator** for input validation
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **Express Rate Limit** for API protection

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- AWS S3 bucket (optional)
- Cloudinary account (optional)
- SMTP email service (Gmail recommended)

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your credentials:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d

   # SMTP Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   FROM_EMAIL=your-email@gmail.com
   FROM_NAME=Portfolio Contact

   # AWS S3 Configuration
   AWS_ACCESS_KEY_ID=your-aws-access-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret-key
   AWS_REGION=us-east-1
   AWS_BUCKET_NAME=your-bucket-name

   # Cloudinary Configuration (fallback)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Frontend URL
   CLIENT_URL=http://localhost:3000
   ```

4. **Seed Database**
   ```bash
   npm run seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Usage

### Default Admin Credentials
After running the seed script:
- **Email**: admin@portfolio.com
- **Password**: password123

### API Endpoints

#### Authentication
- `POST /api/v1/auth/login` - Admin login
- `POST /api/v1/auth/logout` - Admin logout
- `GET /api/v1/auth/me` - Get current user

#### Projects
- `GET /api/v1/projects` - Get all projects (with search/filter)
- `GET /api/v1/projects/:id` - Get single project
- `POST /api/v1/projects` - Create project (admin)
- `PUT /api/v1/projects/:id` - Update project (admin)
- `DELETE /api/v1/projects/:id` - Delete project (admin)

#### Profile
- `GET /api/v1/profile` - Get public profile
- `PUT /api/v1/profile` - Update profile (admin)

#### Upload
- `POST /api/v1/uploads/presign` - Generate upload URL (admin)

#### Contact
- `POST /api/v1/contact` - Send contact message

### Project Structure

```
portfolio-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── admin/      # Admin-specific components
│   │   │   ├── layout/     # Layout components
│   │   │   └── ui/         # UI components
│   │   ├── context/        # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   │   └── admin/      # Admin pages
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── scripts/            # Utility scripts
│   ├── utils/              # Helper functions
│   └── package.json
└── README.md
```

## Deployment

### Backend Deployment (Railway/Heroku)
1. Set environment variables in your hosting platform
2. Deploy the `server` directory
3. Run the seed script in production

### Frontend Deployment (Vercel/Netlify)
1. Set `VITE_API_URL` to your backend URL
2. Deploy the `client` directory
3. Configure build command: `npm run build`

### Database
- Use MongoDB Atlas for production
- Ensure IP whitelist includes your hosting platform

### File Storage
- Configure AWS S3 for production image uploads
- Set proper CORS policies for your domain

## Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevent brute force attacks
- **Input Validation**: Server-side validation with express-validator
- **CORS Protection**: Configured for specific origins
- **Security Headers**: Helmet.js for security headers
- **Environment Variables**: Sensitive data protection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email your-email@example.com or create an issue in the repository.