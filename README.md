# Resume and Cover Letter AI

A modern, AI-powered web application that helps users create professional resumes and cover letters with intelligent suggestions and formatting.

🔗 **Live Demo**: [https://resume-and-cover-letter-ai.netlify.app/](https://resume-and-cover-letter-ai.netlify.app/)

## ✨ Features

- **AI-Powered Content Generation**: Intelligent suggestions for resume content and cover letter writing
- **Professional Templates**: Multiple professionally designed templates to choose from
- **Real-time Preview**: See your changes instantly as you build your resume or cover letter
- **Export Options**: Download your documents in various formats (PDF, Word, etc.)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Fast Performance**: Built with React and Vite for optimal loading speeds

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Code Quality**: ESLint with TypeScript support
- **Deployment**: Netlify

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resume-and-cover-letter-ai
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Application pages
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript type definitions
│   ├── styles/             # Global styles and Tailwind config
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── dist/                   # Production build output
└── package.json           # Project dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by:
- Modifying `tailwind.config.js` for theme customization
- Adding custom CSS in `src/index.css`
- Using Tailwind utility classes in components

### Adding Features
The modular architecture makes it easy to add new features:
1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Implement custom hooks in `src/hooks/`
4. Add utility functions in `src/utils/`

## 🚀 Deployment

The application is automatically deployed to Netlify. For manual deployment:

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your preferred hosting service.

### Netlify Deployment
This project is configured for seamless Netlify deployment:
- Automatic deployments from your git repository
- Build command: `npm run build`
- Publish directory: `dist`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and add tests if applicable
4. Run linting: `npm run lint`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

### Code Style

- Use TypeScript for type safety
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Maintain consistent code formatting with ESLint

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🐛 Bug Reports & Feature Requests

If you encounter any bugs or have feature requests, please create an issue on GitHub with:
- A clear description of the bug/feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review existing issues for solutions

## 🎯 Roadmap

- [ ] Additional resume templates
- [ ] Advanced AI content suggestions
- [ ] Cover letter templates
- [ ] Multi-language support
- [ ] Integration with job boards
- [ ] Enhanced export options
- [ ] User accounts and document saving

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**