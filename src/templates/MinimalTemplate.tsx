import React from 'react';

interface TemplateProps {
  data: any;
}

const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, targetRole, aiGenerated } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <h2 className="text-xl text-gray-600 mb-6">{targetRole}</h2>
        
        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {aiGenerated?.summary && (
        <section className="mb-12">
          <p className="text-gray-700 leading-relaxed text-lg font-light">{aiGenerated.summary}</p>
        </section>
      )}

      {/* Experience */}
      <section className="mb-12">
        <h3 className="text-lg font-medium text-gray-900 mb-8 tracking-wide">EXPERIENCE</h3>
        <div className="space-y-8">
          {experience.map((exp: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-baseline mb-3">
                <div>
                  <h4 className="text-base font-medium text-gray-900">{exp.jobTitle}</h4>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500">{exp.duration}</span>
              </div>
              
              {aiGenerated?.enhancedExperience?.[index]?.bulletPoints ? (
                <div className="space-y-2">
                  {aiGenerated.enhancedExperience[index].bulletPoints.map((point: string, pointIndex: number) => (
                    <p key={pointIndex} className="text-gray-700 text-sm leading-relaxed">
                      {point}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h3 className="text-lg font-medium text-gray-900 mb-8 tracking-wide">EDUCATION</h3>
        <div className="space-y-4">
          {education.map((edu: any, index: number) => (
            <div key={index} className="flex justify-between items-baseline">
              <div>
                <h4 className="text-base font-medium text-gray-900">{edu.degree}</h4>
                <p className="text-gray-600">{edu.institution}</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500">{edu.graduationYear}</span>
                {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-8 tracking-wide">SKILLS</h3>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill: string, index: number) => (
            <span key={index} className="text-gray-700 text-sm px-3 py-1 bg-gray-100 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MinimalTemplate;