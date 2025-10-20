# 🚀 Marathi AI Story Generator

A beautiful full-stack web application that generates magical Marathi stories with AI-powered visuals using Google AI Studio.

## ✨ Features

- 📖 **AI-Powered Story Generation**: Create beautiful Marathi stories using Google AI Studio
- 🎨 **Dynamic Image Generation**: AI-generated images that match your story
- 🌟 **Beautiful UI**: Modern, animated interface with Tailwind CSS and Framer Motion
- 🌙 **Dark/Light Mode**: Toggle between themes
- 📱 **Responsive Design**: Works perfectly on all devices
- 📄 **PDF Export**: Download your stories as PDF files
- ⚡ **Fast & Smooth**: Optimized performance with loading animations

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icons
- **jsPDF** - PDF generation
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Google AI Studio** - AI text and image generation
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Google AI Studio API Key** (Get it from [Google AI Studio](https://makersuite.google.com/))

## 🚀 Quick Start

### 1. Clone or Navigate to Project

```bash
cd marathi_api
```

### 2. Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env
```

### 3. Configure Environment Variables

Open `backend\.env` and add your Google AI Studio API key:

```env
GOOGLE_API_KEY=your_google_ai_studio_api_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 4. Setup Frontend

```bash
# Navigate to frontend folder (from project root)
cd frontend

# Install dependencies
npm install
```

### 5. Run the Application

#### Start Backend Server
```bash
# In backend folder
cd backend
npm run dev
```

#### Start Frontend Development Server
```bash
# In frontend folder (open new terminal)
cd frontend
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 📖 How to Use

1. **Enter Your Story Idea**: Type a story prompt in Marathi or English
2. **Generate Story**: Click "कथा तयार करा" to create your story
3. **View Results**: See your generated Marathi story with beautiful images
4. **Download PDF**: Save your story as a PDF file
5. **Regenerate**: Create new versions of your story
6. **Dark Mode**: Toggle between light and dark themes

## 🔧 Development

### Backend Scripts
```bash
npm start       # Production server
npm run dev     # Development with nodemon
```

### Frontend Scripts
```bash
npm run dev     # Development server
npm run build   # Production build
npm run preview # Preview production build
npm run lint    # ESLint check
```

## 🌐 API Endpoints

### POST `/api/story`
Generate a Marathi story from a prompt.

**Request:**
```json
{
  "prompt": "एका लहान मुलीने तिच्या गावाला वाचवलेली गोष्ट"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "story": "Generated Marathi story...",
    "scenes": "Scene descriptions for images...",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### POST `/api/image`
Generate images based on story scenes.

**Request:**
```json
{
  "scenes": "Scene 1: Description...",
  "storyTitle": "Story Title"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "images": ["image_url_1", "image_url_2", "image_url_3"],
    "scenes": "Scene descriptions...",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🎨 Customization

### Adding New Themes
Edit `frontend/tailwind.config.js` to add custom colors and themes.

### Modifying Story Prompts
Update the story generation prompt in `backend/controllers/storyController.js`.

### Adding New Languages
Extend the AI prompts and UI text for additional languages.

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy build folder to Vercel
```

### Backend (Render/Railway)
```bash
cd backend
# Deploy to Render or Railway
# Set environment variables in deployment platform
```

## 🐛 Troubleshooting

### Common Issues

1. **Google AI Studio API Key Error**
   - Make sure your API key is correct in `.env`
   - Check if your API has quota remaining

2. **CORS Issues**
   - Ensure `FRONTEND_URL` is set correctly in backend `.env`

3. **Port Already in Use**
   - Change port in backend `.env` file
   - Update Vite proxy in `frontend/vite.config.js`

4. **PDF Generation Issues**
   - Note: Devanagari text in PDF has limited support
   - Consider using alternative PDF libraries for better Marathi support

### Getting Help

- Check the browser console for frontend errors
- Check the terminal for backend server logs
- Ensure all dependencies are installed correctly

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please create an issue in the repository.

---

**Made with ❤️ for the Marathi community**