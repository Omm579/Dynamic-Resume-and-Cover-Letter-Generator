import express from 'express';
import { generateResumeContent } from '../services/openaiService.js';

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const userData = req.body;
    
    // Validate required fields
    if (!userData.personalInfo || !userData.targetRole) {
      return res.status(400).json({ 
        error: 'Missing required fields: personalInfo and targetRole' 
      });
    }

    const aiContent = await generateResumeContent(userData);
    
    res.json({
      success: true,
      data: {
        ...userData,
        aiGenerated: aiContent
      }
    });
  } catch (error) {
    console.error('Resume generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate resume content',
      details: error.message 
    });
  }
});

export default router;