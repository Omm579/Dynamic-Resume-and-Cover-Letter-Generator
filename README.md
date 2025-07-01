# Dynamic Resume & Cover Letter Generator

An AI-powered web application that helps users create professional resumes and cover letters tailored to their target roles. Built with React, TypeScript, and OpenAI's GPT technology.

## 🚀 Features

- **AI-Powered Content Generation**: Automatically generates professional summaries and enhanced job descriptions using OpenAI's GPT models
- **Multiple Resume Templates**: Choose from Modern, Classic, and Minimal designs
- **Cover Letter Generation**: Create personalized cover letters based on your resume data
- **PDF Export**: Download both resume and cover letter as high-quality PDF files
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Step-by-Step Form**: Intuitive multi-step form for easy data entry
- **Real-time Preview**: See your resume update in real-time as you make changes

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Hook Form** for form management
- **Lucide React** for icons
- **html2pdf.js** for PDF generation

### Backend
- **Node.js** with Express
- **OpenAI API** for AI content generation
- **CORS** for cross-origin requests

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (version 16 or higher)
- npm or yarn package manager
- OpenAI API key (optional - app works with fallback content)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dynamic-resume-generator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
```

**Note**: The OpenAI API key is optional. If not provided, the application will use fallback content.

### 4. Start the Application

The application runs both frontend and backend concurrently:

```bash
npm run dev
```

This will start:
- Frontend development server on `http://localhost:5174`
- Backend API server on `http://localhost:5000`

### Alternative: Run Separately

If you prefer to run frontend and backend separately:

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

## 📖 Usage

### Creating a Resume

1. **Personal Information**: Enter your basic contact details
2. **Education**: Add your educational background
3. **Experience**: Input your work experience and job descriptions
4. **Skills & Target Role**: List your skills and specify your target job role

### AI Enhancement

The application automatically enhances your content by:
- Generating professional summaries
- Improving job description bullet points
- Optimizing content for ATS (Applicant Tracking Systems)

### Templates

Choose from three professionally designed templates:
- **Modern**: Clean design with gradient header and timeline layout
- **Classic**: Traditional format with serif fonts and formal styling
- **Minimal**: Simple, elegant design with plenty of white space

### Exporting

- Download individual PDF files for resume and cover letter
- Use the "Complete Package" option to download both files together

## 🏗️ Project Structure

```
dynamic-resume-generator/
├── src/
│   ├── components/          # Reusable React components
│   │   └── Navbar.tsx
│   ├── context/            # React context for state management
│   │   └── ResumeContext.tsx
│   ├── pages/              # Main application pages
│   │   ├── Home.tsx
│   │   ├── ResumeForm.tsx
│   │   ├── Preview.tsx
│   │   └── Download.tsx
│   ├── templates/          # Resume template components
│   │   ├── ClassicTemplate.tsx
│   │   ├── ModernTemplate.tsx
│   │   └── MinimalTemplate.tsx
│   └── App.tsx
├── server/
│   ├── routes/             # API route handlers
│   │   ├── resumeRoutes.js
│   │   └── coverLetterRoutes.js
│   ├── services/           # Business logic
│   │   └── openaiService.js
│   └── server.js           # Express server setup
└── package.json
```

## 🔧 API Endpoints

### Resume Generation
```
POST /api/resume/generate
```
Generates AI-enhanced resume content based on user input.

### Cover Letter Generation
```
POST /api/cover-letter/generate
```
Creates a personalized cover letter based on resume data.

### Health Check
```
GET /api/health
```
Returns server status and timestamp.

## 🎨 Customization

### Adding New Templates

1. Create a new template component in `src/templates/`
2. Follow the existing template structure
3. Add the template to the templates object in `Preview.tsx`
4. Update the template selector in the preview page

### Styling

The application uses Tailwind CSS for styling. Key design principles:
- Consistent 8px spacing system
- Professional color palette
- Responsive design with mobile-first approach
- Smooth transitions and hover effects

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI content generation | No* |
| `PORT` | Backend server port (default: 5000) | No |

*The application provides fallback content if OpenAI API key is not provided.

## 🚀 Deployment

### Frontend (Netlify/Vercel)

1. Build the frontend:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting platform

### Backend (Heroku/Railway)

1. Ensure your backend can run independently
2. Set environment variables on your hosting platform
3. Deploy the server code

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

**Vite command not found**
- Ensure you're using Node.js version 16 or higher
- Delete `node_modules` and `package-lock.json`, then run `npm install`

**OpenAI API errors**
- Check your API key is valid and has sufficient credits
- The app will use fallback content if the API is unavailable

**PDF generation issues**
- Ensure all required content is filled in the form
- Try refreshing the page and regenerating the resume

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information about the problem

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- React team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- All contributors who help improve this project