import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { Eye, Download, Edit, FileText, Sparkles } from 'lucide-react';
import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import axios from 'axios';

const Preview: React.FC = () => {
  const { resumeData, selectedTemplate, setSelectedTemplate, coverLetter, setCoverLetter } = useResume();
  const navigate = useNavigate();
  const [isGeneratingCover, setIsGeneratingCover] = useState(false);

  useEffect(() => {
    if (!resumeData.personalInfo.fullName) {
      navigate('/resume-form');
    }
  }, [resumeData, navigate]);

  const generateCoverLetter = async () => {
    setIsGeneratingCover(true);
    try {
      const response = await axios.post('http://localhost:5000/api/cover-letter/generate', {
        userData: resumeData
      });
      setCoverLetter(response.data.data.coverLetter);
    } catch (error) {
      console.error('Error generating cover letter:', error);
      // Fallback cover letter
      setCoverLetter(`Dear Hiring Manager,

I am writing to express my strong interest in the ${resumeData.targetRole} position at ${resumeData.targetCompany || 'your organization'}. With my background in ${resumeData.skills.slice(0, 3).join(', ')}, I am excited about the opportunity to contribute to your team.

In my previous roles, I have demonstrated expertise in ${resumeData.skills.slice(0, 2).join(' and ')}, consistently delivering high-quality results. My experience has equipped me with the skills necessary to make an immediate impact.

I would welcome the opportunity to discuss how my background can contribute to your team. Thank you for considering my application.

Sincerely,
${resumeData.personalInfo.fullName}`);
    } finally {
      setIsGeneratingCover(false);
    }
  };

  const templates = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate
  };

  const SelectedTemplate = templates[selectedTemplate as keyof typeof templates];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Preview Your Resume</h1>
          <p className="text-slate-600">Review your AI-generated resume and cover letter before downloading</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Template Selector */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Choose Template</h2>
              
              <div className="space-y-3">
                {[
                  { id: 'modern', name: 'Modern', description: 'Clean and professional' },
                  { id: 'classic', name: 'Classic', description: 'Traditional layout' },
                  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant' }
                ].map(template => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-medium text-slate-800">{template.name}</div>
                    <div className="text-sm text-slate-600">{template.description}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <button
                  onClick={generateCoverLetter}
                  disabled={isGeneratingCover}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg disabled:opacity-50 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isGeneratingCover ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Cover Letter</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <button
                  onClick={() => navigate('/resume-form')}
                  className="w-full bg-slate-100 text-slate-700 px-4 py-3 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Resume</span>
                </button>

                <button
                  onClick={() => navigate('/download')}
                  className="w-full bg-emerald-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-slate-800">Resume Preview</span>
                </div>
              </div>
              
              <div className="p-8">
                <div id="resume-content" className="max-w-none">
                  <SelectedTemplate data={resumeData} />
                </div>
              </div>
            </div>

            {/* Cover Letter Preview */}
            {coverLetter && (
              <div className="mt-8 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-slate-600" />
                    <span className="font-medium text-slate-800">Cover Letter Preview</span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div id="cover-letter-content" className="prose max-w-none">
                    <div className="whitespace-pre-line text-slate-700 leading-relaxed">
                      {coverLetter}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;