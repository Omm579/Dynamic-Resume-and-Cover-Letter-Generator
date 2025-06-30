import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  portfolio?: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  graduationYear: string;
  gpa?: string;
}

interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  duration: string;
  description: string;
  bulletPoints?: string[];
}

interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  targetRole: string;
  targetCompany?: string;
  aiGenerated?: any;
}

interface ResumeContextType {
  resumeData: ResumeData;
  updateResumeData: (data: Partial<ResumeData>) => void;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  coverLetter: string;
  setCoverLetter: (letter: string) => void;
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    portfolio: ''
  },
  education: [],
  experience: [],
  skills: [],
  targetRole: '',
  targetCompany: ''
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [coverLetter, setCoverLetter] = useState('');

  const updateResumeData = (data: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...data }));
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      updateResumeData,
      selectedTemplate,
      setSelectedTemplate,
      coverLetter,
      setCoverLetter
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};