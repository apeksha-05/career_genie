/**
 * Mock Analysis Service
 * Simulates analyzing resume text to extract strengths, weaknesses, and suggestions.
 */
exports.analyzeResume = async (text) => {
  // Simulate network/processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const textLower = text.toLowerCase();
  
  let score = 50;
  const strengths = [];
  const weaknesses = [];
  const suggestions = [];

  // Very basic keyword matching for demonstration
  if (textLower.includes('react') || textLower.includes('node') || textLower.includes('javascript')) {
    strengths.push('Strong modern web development stack');
    score += 15;
  } else {
    weaknesses.push('Missing core frontend/backend keywords (React, Node)');
    suggestions.push('Include specific web technologies you are familiar with');
  }

  if (textLower.includes('database') || textLower.includes('sql') || textLower.includes('mongo')) {
    strengths.push('Database experience highlighted');
    score += 10;
  } else {
    suggestions.push('Add database systems (SQL/NoSQL) you have worked with');
  }

  if (textLower.includes('aws') || textLower.includes('cloud') || textLower.includes('docker')) {
    strengths.push('Cloud and containerization skills present');
    score += 15;
  } else {
    weaknesses.push('Lacks cloud computing experience');
    suggestions.push('Mention deployment platforms like AWS, Heroku, or Vercel');
  }

  if (textLower.includes('achieved') || textLower.includes('improved') || textLower.includes('increased')) {
    score += 10;
  } else {
    suggestions.push('Use action verbs (e.g., achieved, improved) to describe impact');
  }

  // Cap score at 100
  score = Math.min(score, 100);

  return {
    score,
    strengths,
    weaknesses,
    suggestions
  };
};
