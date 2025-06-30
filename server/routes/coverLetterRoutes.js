import express from 'express';
import { generateCoverLetter } from '../services/openaiService.js';

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const { userData, jobDescription } = req.body;
    
    if (!userData.personalInfo || !userData.targetRole) {
      return res.status(400).json({ 
        error: 'Missing required fields: personalInfo and targetRole' 
      });
    }

    const coverLetter = await generateCoverLetter(userData, jobDescription);
    
    res.json({
      success: true,
      data: {
        coverLetter,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Cover letter generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate cover letter',
      details: error.message 
    });
  }
});

export default router;