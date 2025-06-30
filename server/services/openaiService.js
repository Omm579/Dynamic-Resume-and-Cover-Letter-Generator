import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'demo-key'
});

export const generateResumeContent = async (userData) => {
  try {
    const prompt = `
    Generate professional resume content for the following candidate:
    
    Name: ${userData.personalInfo.fullName}
    Target Role: ${userData.targetRole}
    Skills: ${userData.skills.join(', ')}
    Education: ${userData.education.map(edu => `${edu.degree} from ${edu.institution}`).join(', ')}
    Experience: ${userData.experience.map(exp => `${exp.jobTitle} at ${exp.company} (${exp.duration})`).join(', ')}
    
    Please provide:
    1. A compelling professional summary (2-3 sentences)
    2. Enhanced bullet points for each work experience that highlight achievements and impact
    3. Relevant skills organization and prioritization
    
    Format the response as JSON with keys: summary, enhancedExperience (array), skillsRecommendations
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000
    });

    const response = completion.choices[0].message.content;
    
    try {
      return JSON.parse(response);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return {
        summary: "Dynamic professional with proven expertise in modern technologies and a track record of delivering high-quality solutions that drive business success.",
        enhancedExperience: userData.experience.map(exp => ({
          ...exp,
          bulletPoints: [
            "Led key initiatives that improved team productivity and project outcomes",
            "Collaborated with cross-functional teams to deliver innovative solutions",
            "Implemented best practices resulting in enhanced system performance"
          ]
        })),
        skillsRecommendations: userData.skills
      };
    }
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Check if it's a rate limit error and provide specific guidance
    if (error.status === 429) {
      console.warn('⚠️  OpenAI API quota exceeded. Please check your billing at https://platform.openai.com/account/billing');
      console.warn('⚠️  Using fallback content for now. The application will continue to work with pre-generated content.');
    }
    
    // Return enhanced fallback content
    return {
      summary: `Passionate and results-driven ${userData.targetRole || 'professional'} with expertise in ${userData.skills.slice(0, 3).join(', ')} and a commitment to excellence in every project.`,
      enhancedExperience: userData.experience.map(exp => ({
        ...exp,
        bulletPoints: [
          `Successfully delivered ${exp.jobTitle.toLowerCase()} projects on time and within budget`,
          "Collaborated effectively with diverse teams to achieve common goals",
          "Continuously improved processes and implemented innovative solutions",
          "Mentored team members and contributed to knowledge sharing initiatives"
        ]
      })),
      skillsRecommendations: userData.skills
    };
  }
};

export const generateCoverLetter = async (userData, jobDescription = '') => {
  try {
    const prompt = `
    Write a professional cover letter for:
    
    Candidate: ${userData.personalInfo.fullName}
    Target Role: ${userData.targetRole}
    Company: ${userData.targetCompany || 'the organization'}
    Skills: ${userData.skills.join(', ')}
    Key Experience: ${userData.experience.slice(0, 2).map(exp => `${exp.jobTitle} at ${exp.company}`).join(', ')}
    
    ${jobDescription ? `Job Description Context: ${jobDescription}` : ''}
    
    Create a compelling 3-paragraph cover letter that:
    1. Opens with enthusiasm and mentions the specific role
    2. Highlights relevant experience and achievements
    3. Closes with a strong call to action
    
    Keep it professional, engaging, and under 300 words.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 500
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Check if it's a rate limit error and provide specific guidance
    if (error.status === 429) {
      console.warn('⚠️  OpenAI API quota exceeded. Please check your billing at https://platform.openai.com/account/billing');
      console.warn('⚠️  Using fallback content for now. The application will continue to work with pre-generated content.');
    }
    
    // Return enhanced fallback cover letter
    const topSkills = userData.skills.slice(0, 3).join(', ');
    const recentExperience = userData.experience[0];
    
    return `Dear Hiring Manager,

I am writing to express my strong interest in the ${userData.targetRole} position at ${userData.targetCompany || 'your organization'}. With my comprehensive background in ${topSkills}, I am excited about the opportunity to contribute to your team's continued success and growth.

${recentExperience ? `In my recent role as ${recentExperience.jobTitle} at ${recentExperience.company}, I have` : 'Throughout my career, I have'} demonstrated expertise in ${userData.skills.slice(0, 2).join(' and ')}, consistently delivering high-quality results that exceed expectations. My experience has equipped me with both the technical skills and collaborative mindset necessary to make an immediate positive impact in this role.

I would welcome the opportunity to discuss how my background, enthusiasm, and commitment to excellence can contribute to your team's objectives. Thank you for considering my application, and I look forward to hearing from you soon.

Sincerely,
${userData.personalInfo.fullName}`;
  }
};