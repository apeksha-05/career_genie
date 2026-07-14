const { computeMatchPercentage } = require('../../utils/matchScoring');

describe('computeMatchPercentage', () => {
  it('should return 0 if resume skills are empty', () => {
    expect(computeMatchPercentage([], ['JavaScript', 'React'])).toBe(0);
  });

  it('should return 0 if job requirements are empty', () => {
    expect(computeMatchPercentage(['JavaScript', 'React'], [])).toBe(0);
  });

  it('should return 100 if all requirements match', () => {
    const resumeSkills = ['JavaScript', 'React', 'Node.js'];
    const jobRequirements = ['JavaScript', 'Node.js'];
    expect(computeMatchPercentage(resumeSkills, jobRequirements)).toBe(100);
  });

  it('should compute partial match correctly', () => {
    const resumeSkills = ['JavaScript', 'CSS'];
    const jobRequirements = ['JavaScript', 'React', 'Node.js', 'CSS'];
    // 2 out of 4 matches = 50%
    expect(computeMatchPercentage(resumeSkills, jobRequirements)).toBe(50);
  });

  it('should be case-insensitive', () => {
    const resumeSkills = ['javascript', 'REACT'];
    const jobRequirements = ['JavaScript', 'React'];
    expect(computeMatchPercentage(resumeSkills, jobRequirements)).toBe(100);
  });

  it('should match substrings', () => {
    const resumeSkills = ['JavaScript Developer'];
    const jobRequirements = ['JavaScript'];
    expect(computeMatchPercentage(resumeSkills, jobRequirements)).toBe(100);
  });

  it('should match when requirement is a substring of skill', () => {
    const resumeSkills = ['ReactJS'];
    const jobRequirements = ['React'];
    expect(computeMatchPercentage(resumeSkills, jobRequirements)).toBe(100);
  });
});
