import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { Download as DownloadIcon, FileText, Mail, ArrowLeft, Check } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';

const Download: React.FC = () => {
  const { resumeData, coverLetter, selectedTemplate } = useResume();
  const navigate = useNavigate();

  const templates = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate
  };

  const SelectedTemplate = templates[selectedTemplate as keyof typeof templates];

  // Populate the hidden resume content when component mounts
  useEffect(() => {
    const resumeElement = document.getElementById('resume-content');
    if (resumeElement && resumeData.personalInfo.fullName) {
      // Clear existing content
      resumeElement.innerHTML = '';
      
      // Create a container div
      const container = document.createElement('div');
      container.style.fontFamily = 'system-ui, -apple-system, sans-serif';
      container.style.lineHeight = '1.6';
      container.style.color = '#333';
      container.style.maxWidth = '800px';
      container.style.margin = '0 auto';
      container.style.padding = '40px';
      container.style.backgroundColor = 'white';
      
      // Render the template content as HTML
      container.innerHTML = renderTemplateAsHTML(resumeData, selectedTemplate);
      
      resumeElement.appendChild(container);
    }
  }, [resumeData, selectedTemplate]);

  const renderTemplateAsHTML = (data: any, template: string) => {
    const { personalInfo, education, experience, skills, targetRole, aiGenerated } = data;
    
    if (template === 'modern') {
      return `
        <div style="background: linear-gradient(to right, #1e293b, #0f172a); color: white; padding: 32px; margin: -40px -40px 32px -40px;">
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
            <div>
              <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 8px;">${personalInfo.fullName}</h1>
              <h2 style="font-size: 18px; color: #cbd5e1; margin-bottom: 16px;">${targetRole}</h2>
              ${aiGenerated?.summary ? `<p style="color: #e2e8f0; line-height: 1.6;">${aiGenerated.summary}</p>` : ''}
            </div>
            <div style="font-size: 14px;">
              <div style="margin-bottom: 12px;">📧 ${personalInfo.email}</div>
              <div style="margin-bottom: 12px;">📱 ${personalInfo.phone}</div>
              <div style="margin-bottom: 12px;">📍 ${personalInfo.location}</div>
              ${personalInfo.linkedIn ? `<div style="margin-bottom: 12px;">💼 ${personalInfo.linkedIn}</div>` : ''}
              ${personalInfo.portfolio ? `<div style="margin-bottom: 12px;">🌐 ${personalInfo.portfolio}</div>` : ''}
            </div>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 32px;">
          <div>
            <h3 style="font-size: 20px; font-weight: bold; color: #1e293b; margin-bottom: 24px; padding-bottom: 8px; border-bottom: 2px solid #1e293b;">Professional Experience</h3>
            ${experience.map((exp: any, index: number) => `
              <div style="margin-bottom: 24px; position: relative; padding-left: 24px;">
                <div style="position: absolute; left: 0; top: 4px; width: 8px; height: 8px; background: #1e293b; border-radius: 50%;"></div>
                <h4 style="font-size: 16px; font-weight: 600; color: #1e293b; margin-bottom: 4px;">${exp.jobTitle}</h4>
                <div style="display: flex; justify-content: between; margin-bottom: 8px;">
                  <span style="font-weight: 500; color: #64748b;">${exp.company}</span>
                  <span style="font-size: 12px; color: #64748b; margin-left: auto;">📅 ${exp.duration}</span>
                </div>
                ${aiGenerated?.enhancedExperience?.[index]?.bulletPoints ? 
                  aiGenerated.enhancedExperience[index].bulletPoints.map((point: string) => 
                    `<div style="color: #475569; font-size: 14px; line-height: 1.6; margin-bottom: 4px; padding-left: 16px; position: relative;">
                      <span style="position: absolute; left: 0; top: 8px; width: 4px; height: 4px; background: #94a3b8; border-radius: 50%;"></span>
                      ${point}
                    </div>`
                  ).join('') : 
                  `<p style="color: #475569; font-size: 14px; line-height: 1.6;">${exp.description}</p>`
                }
              </div>
            `).join('')}
          </div>
          
          <div>
            <h3 style="font-size: 18px; font-weight: bold; color: #1e293b; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #cbd5e1;">Technical Skills</h3>
            <div style="margin-bottom: 32px;">
              ${skills.map((skill: string) => `
                <div style="background: #f1f5f9; padding: 8px 12px; border-radius: 8px; font-size: 14px; font-weight: 500; color: #475569; margin-bottom: 8px;">${skill}</div>
              `).join('')}
            </div>
            
            <h3 style="font-size: 18px; font-weight: bold; color: #1e293b; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #cbd5e1;">Education</h3>
            ${education.map((edu: any) => `
              <div style="margin-bottom: 16px;">
                <h4 style="font-weight: 600; color: #1e293b; font-size: 14px; margin-bottom: 2px;">${edu.degree}</h4>
                <p style="color: #64748b; font-size: 14px; margin-bottom: 4px;">${edu.institution}</p>
                <div style="display: flex; justify-content: between; font-size: 12px; color: #94a3b8;">
                  <span>${edu.graduationYear}</span>
                  ${edu.gpa ? `<span style="margin-left: auto;">GPA: ${edu.gpa}</span>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (template === 'minimal') {
      return `
        <div style="margin-bottom: 48px;">
          <h1 style="font-size: 32px; font-weight: 300; color: #111827; margin-bottom: 8px;">${personalInfo.fullName}</h1>
          <h2 style="font-size: 18px; color: #6b7280; margin-bottom: 24px;">${targetRole}</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 24px; font-size: 14px; color: #6b7280;">
            <span>${personalInfo.email}</span>
            <span>${personalInfo.phone}</span>
            <span>${personalInfo.location}</span>
            ${personalInfo.linkedIn ? `<span>${personalInfo.linkedIn}</span>` : ''}
            ${personalInfo.portfolio ? `<span>${personalInfo.portfolio}</span>` : ''}
          </div>
        </div>
        
        ${aiGenerated?.summary ? `
          <div style="margin-bottom: 48px;">
            <p style="color: #374151; line-height: 1.6; font-size: 16px; font-weight: 300;">${aiGenerated.summary}</p>
          </div>
        ` : ''}
        
        <div style="margin-bottom: 48px;">
          <h3 style="font-size: 16px; font-weight: 500; color: #111827; margin-bottom: 32px; letter-spacing: 0.05em;">EXPERIENCE</h3>
          ${experience.map((exp: any, index: number) => `
            <div style="margin-bottom: 32px;">
              <div style="display: flex; justify-content: between; margin-bottom: 12px;">
                <div>
                  <h4 style="font-size: 16px; font-weight: 500; color: #111827; margin-bottom: 4px;">${exp.jobTitle}</h4>
                  <p style="color: #6b7280;">${exp.company}</p>
                </div>
                <span style="font-size: 14px; color: #9ca3af;">${exp.duration}</span>
              </div>
              ${aiGenerated?.enhancedExperience?.[index]?.bulletPoints ? 
                aiGenerated.enhancedExperience[index].bulletPoints.map((point: string) => 
                  `<p style="color: #374151; font-size: 14px; line-height: 1.6; margin-bottom: 8px;">${point}</p>`
                ).join('') : 
                `<p style="color: #374151; font-size: 14px; line-height: 1.6;">${exp.description}</p>`
              }
            </div>
          `).join('')}
        </div>
        
        <div style="margin-bottom: 48px;">
          <h3 style="font-size: 16px; font-weight: 500; color: #111827; margin-bottom: 32px; letter-spacing: 0.05em;">EDUCATION</h3>
          ${education.map((edu: any) => `
            <div style="display: flex; justify-content: between; margin-bottom: 16px;">
              <div>
                <h4 style="font-size: 16px; font-weight: 500; color: #111827; margin-bottom: 4px;">${edu.degree}</h4>
                <p style="color: #6b7280;">${edu.institution}</p>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 14px; color: #9ca3af;">${edu.graduationYear}</span>
                ${edu.gpa ? `<p style="font-size: 14px; color: #9ca3af;">GPA: ${edu.gpa}</p>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
        
        <div>
          <h3 style="font-size: 16px; font-weight: 500; color: #111827; margin-bottom: 32px; letter-spacing: 0.05em;">SKILLS</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 12px;">
            ${skills.map((skill: string) => `
              <span style="color: #374151; font-size: 14px; padding: 4px 12px; background: #f3f4f6; border-radius: 20px;">${skill}</span>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      // Classic template
      return `
        <div style="text-align: center; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid #000;">
          <h1 style="font-size: 28px; font-weight: bold; color: #000; margin-bottom: 8px;">${personalInfo.fullName}</h1>
          <h2 style="font-size: 16px; color: #374151; margin-bottom: 16px;">${targetRole}</h2>
          <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; font-size: 14px; color: #6b7280;">
            <span>${personalInfo.email}</span>
            <span>•</span>
            <span>${personalInfo.phone}</span>
            <span>•</span>
            <span>${personalInfo.location}</span>
            ${personalInfo.linkedIn ? `<span>•</span><span>${personalInfo.linkedIn}</span>` : ''}
            ${personalInfo.portfolio ? `<span>•</span><span>${personalInfo.portfolio}</span>` : ''}
          </div>
        </div>
        
        ${aiGenerated?.summary ? `
          <div style="margin-bottom: 32px;">
            <h3 style="font-size: 16px; font-weight: bold; color: #000; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #d1d5db; padding-bottom: 4px;">Professional Summary</h3>
            <p style="color: #374151; line-height: 1.6;">${aiGenerated.summary}</p>
          </div>
        ` : ''}
        
        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 16px; font-weight: bold; color: #000; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #d1d5db; padding-bottom: 4px;">Professional Experience</h3>
          ${experience.map((exp: any, index: number) => `
            <div style="margin-bottom: 24px;">
              <div style="display: flex; justify-content: between; margin-bottom: 8px;">
                <div>
                  <h4 style="font-size: 16px; font-weight: 600; color: #000; margin-bottom: 2px;">${exp.jobTitle}</h4>
                  <p style="color: #374151; font-weight: 500;">${exp.company}</p>
                </div>
                <span style="font-size: 14px; color: #6b7280; font-weight: 500;">${exp.duration}</span>
              </div>
              ${aiGenerated?.enhancedExperience?.[index]?.bulletPoints ? `
                <ul style="margin-left: 16px;">
                  ${aiGenerated.enhancedExperience[index].bulletPoints.map((point: string) => 
                    `<li style="color: #374151; font-size: 14px; line-height: 1.6; margin-bottom: 4px;">${point}</li>`
                  ).join('')}
                </ul>
              ` : `
                <p style="color: #374151; font-size: 14px; line-height: 1.6; margin-left: 16px;">${exp.description}</p>
              `}
            </div>
          `).join('')}
        </div>
        
        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 16px; font-weight: bold; color: #000; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #d1d5db; padding-bottom: 4px;">Education</h3>
          ${education.map((edu: any) => `
            <div style="display: flex; justify-content: between; margin-bottom: 12px;">
              <div>
                <h4 style="font-size: 16px; font-weight: 600; color: #000; margin-bottom: 2px;">${edu.degree}</h4>
                <p style="color: #374151;">${edu.institution}</p>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 14px; color: #6b7280; font-weight: 500;">${edu.graduationYear}</span>
                ${edu.gpa ? `<p style="font-size: 14px; color: #6b7280;">GPA: ${edu.gpa}</p>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
        
        <div>
          <h3 style="font-size: 16px; font-weight: bold; color: #000; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #d1d5db; padding-bottom: 4px;">Technical Skills</h3>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
            ${skills.map((skill: string) => `
              <span style="color: #374151; font-size: 14px;">• ${skill}</span>
            `).join('')}
          </div>
        </div>
      `;
    }
  };

  const downloadResume = () => {
    const element = document.getElementById('resume-content');
    if (!element) return;

    const opt = {
      margin: 0.5,
      filename: `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const downloadCoverLetter = () => {
    const element = document.getElementById('cover-letter-content');
    if (!element) return;

    const opt = {
      margin: 1,
      filename: `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Cover_Letter.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const downloadBoth = async () => {
    downloadResume();
    if (coverLetter) {
      setTimeout(() => downloadCoverLetter(), 1000);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Your Resume is Ready!</h1>
          <p className="text-lg text-slate-600">Download your professionally generated resume and cover letter</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Resume Download */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Resume</h3>
                <p className="text-sm text-slate-600">AI-generated professional resume</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-sm text-slate-600 mb-2">Features included:</div>
              <ul className="text-sm text-slate-700 space-y-1">
                <li className="flex items-center space-x-2">
                  <Check className="w-3 h-3 text-green-500" />
                  <span>AI-enhanced professional summary</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3 h-3 text-green-500" />
                  <span>Optimized experience descriptions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3 h-3 text-green-500" />
                  <span>ATS-friendly formatting</span>
                </li>
              </ul>
            </div>

            <button
              onClick={downloadResume}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <DownloadIcon className="w-4 h-4" />
              <span>Download Resume PDF</span>
            </button>
          </div>

          {/* Cover Letter Download */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Cover Letter</h3>
                <p className="text-sm text-slate-600">Tailored to your target role</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-sm text-slate-600 mb-2">Features included:</div>
              <ul className="text-sm text-slate-700 space-y-1">
                <li className="flex items-center space-x-2">
                  <Check className="w-3 h-3 text-green-500" />
                  <span>Personalized content</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3 h-3 text-green-500" />
                  <span>Role-specific messaging</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3 h-3 text-green-500" />
                  <span>Professional formatting</span>
                </li>
              </ul>
            </div>

            <button
              onClick={downloadCoverLetter}
              disabled={!coverLetter}
              className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              <DownloadIcon className="w-4 h-4" />
              <span>{coverLetter ? 'Download Cover Letter PDF' : 'Generate Cover Letter First'}</span>
            </button>
          </div>
        </div>

        {/* Download Both */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white mb-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Complete Package</h3>
            <p className="mb-4 opacity-90">Download both your resume and cover letter together</p>
            <button
              onClick={downloadBoth}
              className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors inline-flex items-center space-x-2"
            >
              <DownloadIcon className="w-5 h-5" />
              <span>Download Complete Package</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/preview')}
            className="inline-flex items-center justify-center space-x-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Preview</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <span>Create Another Resume</span>
          </button>
        </div>

        {/* Hidden content for PDF generation */}
        <div className="hidden">
          <div id="resume-content">
            {/* Resume content will be populated by useEffect */}
          </div>
          <div id="cover-letter-content">
            {coverLetter && (
              <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', lineHeight: '1.6', color: '#333', padding: '40px', backgroundColor: 'white' }}>
                <div style={{ whiteSpace: 'pre-line' }}>{coverLetter}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;