const axios = require('axios');

exports.parseResume = async (filePath) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt: `Extract key details from the following resume: ${filePath}`,
      max_tokens: 1000,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error('AI API error:', error);
    throw new Error('Error parsing resume');
  }
};

exports.scoreJobs = async (skills, jobs) => {
  try {
    const jobDescriptions = jobs.map(job => `${job.title} at ${job.company} requires: ${job.skills.join(', ')}`).join('\n');

    const prompt = `
      Given the following skills: ${skills.join(', ')}, score the relevance of each job from 1 to 100 based on matching skills:
      ${jobDescriptions}
    `;

    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt,
      max_tokens: 100,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    // Parse AI response into structured data
    const scores = response.data.choices[0].text.trim().split('\n').map(Number);
    return scores;
  } catch (error) {
    console.error('AI scoring error:', error);
    throw new Error('Error scoring jobs');
  }
};
