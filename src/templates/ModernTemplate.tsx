import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar } from 'lucide-react';

interface TemplateProps {
  data: any;
}

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, targetRole, aiGenerated } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName}</h1>
            <h2 className="text-xl text-slate-300 mb-4">{targetRole}</h2>
            {aiGenerated?.summary && (
              <p className="text-slate-200 leading-relaxed">{aiGenerated.summary}</p>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="text-sm">{personalInfo.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-slate-400" />
              <span className="text-sm">{personalInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="text-sm">{personalInfo.location}</span>
            </div>
            {personalInfo.linkedIn && (
              <div className="flex items-center space-x-3">
                <Linkedin className="w-4 h-4 text-slate-400" />
                <span className="text-sm">{personalInfo.linkedIn}</span>
              </div>
            )}
            {personalInfo.portfolio && (
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-slate-400" />
                <span className="text-sm">{personalInfo.portfolio}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 p-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Experience */}
          <section>
            <h3 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b-2 border-slate-800">
              Professional Experience
            </h3>
            <div className="space-y-6">
              {experience.map((exp: any, index: number) => (
                <div key={index} className="relative pl-6">
                  <div className="absolute left-0 top-1 w-2 h-2 bg-slate-800 rounded-full"></div>
                  <div className="absolute left-1 top-3 w-0.5 h-full bg-slate-300"></div>
                  
                  <div className="mb-2">
                    <h4 className="text-lg font-semibold text-slate-800">{exp.jobTitle}</h4>
                    <div className="flex items-center justify-between text-slate-600 mb-2">
                      <span className="font-medium">{exp.company}</span>
                      <span className="text-sm flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {exp.duration}
                      </span>
                    </div>
                  </div>
                  
                  {aiGenerated?.enhancedExperience?.[index]?.bulletPoints ? (
                    <ul className="space-y-1">
                      {aiGenerated.enhancedExperience[index].bulletPoints.map((point: string, pointIndex: number) => (
                        <li key={pointIndex} className="text-slate-700 text-sm leading-relaxed pl-4 relative">
                          <span className="absolute left-0 top-2 w-1 h-1 bg-slate-400 rounded-full"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-700 text-sm leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Skills */}
          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-300">
              Technical Skills
            </h3>
            <div className="space-y-2">
              {skills.map((skill: string, index: number) => (
                <div key={index} className="bg-slate-100 px-3 py-2 rounded-lg text-sm font-medium text-slate-700">
                  {skill}
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-300">
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu: any, index: number) => (
                <div key={index}>
                  <h4 className="font-semibold text-slate-800 text-sm">{edu.degree}</h4>
                  <p className="text-slate-600 text-sm">{edu.institution}</p>
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>{edu.graduationYear}</span>
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;