// Helper to compute keyword overlap similarity
const computeMatchPercentage = (resumeSkills, jobRequirements) => {
  if (!resumeSkills || !jobRequirements || jobRequirements.length === 0) return 0;
  
  const resumeSkillsLower = resumeSkills.map(s => s.toLowerCase());
  const jobRequirementsLower = jobRequirements.map(s => s.toLowerCase());
  
  let matches = 0;
  jobRequirementsLower.forEach(req => {
    // Basic substring or exact match check
    if (resumeSkillsLower.some(skill => skill.includes(req) || req.includes(skill))) {
      matches++;
    }
  });
  
  // Note: For future embeddings-based upgrade (e.g. OpenAI + Pinecone),
  // we would fetch the vector for the resume and compute cosine similarity 
  // with the job requirement vectors here instead of string overlap.

  const percentage = Math.round((matches / jobRequirements.length) * 100);
  return Math.min(percentage, 100); // cap at 100%
};

module.exports = { computeMatchPercentage };
