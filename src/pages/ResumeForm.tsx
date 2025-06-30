import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2, User, GraduationCap, Briefcase, Code, Target, Loader } from 'lucide-react';
import axios from 'axios';

const ResumeForm: React.FC = () => {
  const { updateResumeData } = useResume();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedIn: '',
        portfolio: ''
      },
      education: [{ degree: '', institution: '', graduationYear: '', gpa: '' }],
      experience: [{ jobTitle: '', company: '', duration: '', description: '' }],
      skills: [''],
      targetRole: '',
      targetCompany: ''
    }
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education'
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experience'
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: 'skills'
  });

  const onSubmit = async (data: any) => {
    setIsGenerating(true);
    try {
      // Clean up data
      const cleanData = {
        ...data,
        skills: data.skills.filter((skill: string) => skill.trim() !== ''),
        education: data.education.map((edu: any, index: number) => ({ ...edu, id: `edu-${index}` })),
        experience: data.experience.map((exp: any, index: number) => ({ ...exp, id: `exp-${index}` }))
      };

      // Generate AI content
      const response = await axios.post('http://localhost:5000/api/resume/generate', cleanData);
      
      updateResumeData(response.data.data);
      navigate('/preview');
    } catch (error) {
      console.error('Error generating resume:', error);
      // Still navigate on error with fallback data
      const cleanData = {
        ...data,
        skills: data.skills.filter((skill: string) => skill.trim() !== ''),
        education: data.education.map((edu: any, index: number) => ({ ...edu, id: `edu-${index}` })),
        experience: data.experience.map((exp: any, index: number) => ({ ...exp, id: `exp-${index}` }))
      };
      updateResumeData(cleanData);
      navigate('/preview');
    } finally {
      setIsGenerating(false);
    }
  };

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Education', icon: GraduationCap },
    { id: 3, title: 'Experience', icon: Briefcase },
    { id: 4, title: 'Skills & Target', icon: Code }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map(({ id, title, icon: Icon }) => (
              <div key={id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                  currentStep >= id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-slate-300 text-slate-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 font-medium ${currentStep >= id ? 'text-blue-600' : 'text-slate-400'}`}>
                  {title}
                </span>
                {id < steps.length && (
                  <div className={`w-16 h-0.5 mx-4 ${currentStep > id ? 'bg-blue-600' : 'bg-slate-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          {currentStep === 1 && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Personal Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                  <input
                    {...register('personalInfo.fullName', { required: 'Full name is required' })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="John Doe"
                  />
                  {errors.personalInfo?.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                  <input
                    {...register('personalInfo.email', { 
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                    })}
                    type="email"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="john@example.com"
                  />
                  {errors.personalInfo?.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone *</label>
                  <input
                    {...register('personalInfo.phone', { required: 'Phone number is required' })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.personalInfo?.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Location *</label>
                  <input
                    {...register('personalInfo.location', { required: 'Location is required' })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="San Francisco, CA"
                  />
                  {errors.personalInfo?.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.location.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">LinkedIn Profile</label>
                  <input
                    {...register('personalInfo.linkedIn')}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Portfolio/Website</label>
                  <input
                    {...register('personalInfo.portfolio')}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="johndoe.dev"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Education */}
          {currentStep === 2 && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">Education</h2>
                </div>
                <button
                  type="button"
                  onClick={() => appendEducation({ degree: '', institution: '', graduationYear: '', gpa: '' })}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Education</span>
                </button>
              </div>

              {educationFields.map((field, index) => (
                <div key={field.id} className="border border-slate-200 rounded-lg p-6 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-slate-800">Education {index + 1}</h3>
                    {educationFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Degree *</label>
                      <input
                        {...register(`education.${index}.degree`, { required: 'Degree is required' })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Bachelor of Science in Computer Science"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Institution *</label>
                      <input
                        {...register(`education.${index}.institution`, { required: 'Institution is required' })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="University of California, Berkeley"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Graduation Year *</label>
                      <input
                        {...register(`education.${index}.graduationYear`, { required: 'Graduation year is required' })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="2024"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">GPA (Optional)</label>
                      <input
                        {...register(`education.${index}.gpa`)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="3.8"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Experience */}
          {currentStep === 3 && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">Work Experience</h2>
                </div>
                <button
                  type="button"
                  onClick={() => appendExperience({ jobTitle: '', company: '', duration: '', description: '' })}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Experience</span>
                </button>
              </div>

              {experienceFields.map((field, index) => (
                <div key={field.id} className="border border-slate-200 rounded-lg p-6 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-slate-800">Experience {index + 1}</h3>
                    {experienceFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Job Title *</label>
                      <input
                        {...register(`experience.${index}.jobTitle`, { required: 'Job title is required' })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Frontend Developer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Company *</label>
                      <input
                        {...register(`experience.${index}.company`, { required: 'Company is required' })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Tech Corp Inc."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Duration *</label>
                      <input
                        {...register(`experience.${index}.duration`, { required: 'Duration is required' })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Jan 2022 - Present"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Description *</label>
                    <textarea
                      {...register(`experience.${index}.description`, { required: 'Description is required' })}
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Describe your key responsibilities and achievements..."
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills & Target Role */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Code className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Skills</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => appendSkill('')}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Skill</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {skillFields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-2">
                      <input
                        {...register(`skills.${index}`)}
                        className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="React.js"
                      />
                      {skillFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">Target Role</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Target Job Role *</label>
                    <input
                      {...register('targetRole', { required: 'Target role is required' })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Frontend Developer"
                    />
                    {errors.targetRole && (
                      <p className="text-red-500 text-sm mt-1">{errors.targetRole.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Target Company (Optional)</label>
                    <input
                      {...register('targetCompany')}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Google"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentStep === 1 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
              disabled={currentStep === 1}
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isGenerating}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Generating Resume...</span>
                  </>
                ) : (
                  <span>Generate Resume</span>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeForm;