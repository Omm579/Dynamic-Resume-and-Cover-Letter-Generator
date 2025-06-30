import React from 'react';

interface TemplateProps {
  data: any;
}

const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, targetRole, aiGenerated } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-black">
        <h1 className="text-3xl font-bold text-black mb-2">{personalInfo.fullName}</h1>
        <h2 className="text-lg text-gray-700 mb-4">{targetRole}</h2>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedIn && (
            <>
              <span>•</span>
              <span>{personalInfo.linkedIn}</span>
            </>
          )}
          {personalInfo.portfolio && (
            <>
              <span>•</span>
              <span>{personalInfo.portfolio}</span>
            </>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {aiGenerated?.summary && (
        <section className="mb-8">
          <h3 className="text-lg font-bold text-black mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Professional Summary
          </h3>
          <p className="text-gray-700 leading-relaxed">{aiGenerated.summary}</p>
        </section>
      )}

      {/* Professional Experience */}
      <section className="mb-8">
        <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-b border-gray-300 pb-1">
          Professional Experience
        </h3>
        <div className="space-y-6">
          {experience.map((exp: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-base font-semibold text-black">{exp.jobTitle}</h4>
                  <p className="text-gray-700 font-medium">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-600 font-medium">{exp.duration}</span>
              </div>
              
              {aiGenerated?.enhancedExperience?.[index]?.bulletPoints ? (
                <ul className="ml-4 space-y-1">
                  {aiGenerated.enhancedExperience[index].bulletPoints.map((point: string, pointIndex: number) => (
                    <li key={pointIndex} className="text-gray-700 text-sm leading-relaxed list-disc">
                      {point}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 text-sm leading-relaxed ml-4">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-b border-gray-300 pb-1">
          Education
        </h3>
        <div className="space-y-3">
          {education.map((edu: any, index: number) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h4 className="text-base font-semibold text-black">{edu.degree}</h4>
                <p className="text-gray-700">{edu.institution}</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-600 font-medium">{edu.graduationYear}</span>
                {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Skills */}
      <section>
        <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-b border-gray-300 pb-1">
          Technical Skills
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {skills.map((skill: string, index: number) => (
            <span key={index} className="text-gray-700 text-sm">
              • {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ClassicTemplate;