import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, FileText, Download, Zap } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Resume Generation</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Create Professional<br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Generated Resumes
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your career story into compelling resumes and cover letters using advanced AI technology. 
            Stand out from the crowd with personalized, professional documents.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/resume-form"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200"
            >
              <span>Start Creating</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <button className="inline-flex items-center justify-center space-x-2 bg-white text-slate-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200">
              <FileText className="w-5 h-5" />
              <span>View Examples</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our AI-powered platform provides all the tools you need to create professional resumes and cover letters that get noticed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'AI Content Generation',
                description: 'Advanced AI analyzes your experience and generates compelling professional summaries and bullet points tailored to your target role.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: FileText,
                title: 'Professional Templates',
                description: 'Choose from multiple professionally designed resume templates that are optimized for ATS systems and hiring managers.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: Download,
                title: 'Export to PDF',
                description: 'Download your resume and cover letter as high-quality PDF files ready for job applications and printing.',
                color: 'from-emerald-500 to-teal-500'
              }
            ].map(({ icon: Icon, title, description, color }, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${color} mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{title}</h3>
                <p className="text-slate-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              <span>Coming Soon</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Exciting Features on the Horizon
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We're constantly improving to make your job search even more successful. Here's what's coming next.
                icon: '📄',
                status: 'Coming Soon'
              },
              {
                title: 'Advanced AI Content Suggestions',
                description: 'Smarter AI that provides industry-specific recommendations and optimizations',
                icon: '🤖',
                status: 'In Development'
              },
              {
                title: 'Cover Letter Templates',
                description: 'Professional cover letter templates that match your resume design',
                icon: '✉️',
                status: 'Coming Soon'
              },
              {
                title: 'Multi-language Support',
                description: 'Create resumes in multiple languages to expand your job search globally',
                icon: '🌍',
                status: 'Planned'
              },
              {
                title: 'Integration with Job Boards',
                description: 'Direct integration with popular job platforms for seamless applications',
                icon: '🔗',
                status: 'Planned'
              },
              {
                title: 'Enhanced Export Options',
                description: 'Export to Word, HTML, and other formats with advanced customization',
                icon: '📤',
                status: 'In Development'
              },
              {
                title: 'User Accounts & Document Saving',
                description: 'Save your resumes, track applications, and manage multiple versions',
                icon: '👤',
                status: 'Coming Soon'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">{feature.description}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  feature.status === 'In Development' 
                    ? 'bg-blue-100 text-blue-700' 
                    : feature.status === 'Coming Soon'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {feature.status}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">Want to be notified when these features launch?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of professionals who have successfully landed their dream jobs with AI-generated resumes.
          </p>
          <Link
            to="/resume-form"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200"
          >
            <Zap className="w-5 h-5" />
            <span>Get Started Now</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;