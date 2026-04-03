export const BIRTH_DATE = '2026-01-13';

export function formatMilestoneDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export function getMilestoneAge(dateStr: string, birthDateStr: string = BIRTH_DATE) {
  const birth = new Date(birthDateStr);
  const milestone = new Date(dateStr);
  
  const diffMs = milestone.getTime() - birth.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Newborn';
  if (diffDays < 0) return 'Pre-birth';
  if (diffDays < 7) return `${diffDays} days old`;
  
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} old`;
  
  // Calculate months properly
  let months = (milestone.getFullYear() - birth.getFullYear()) * 12 + (milestone.getMonth() - birth.getMonth());
  if (milestone.getDate() < birth.getDate()) {
    months--;
  }
  
  if (months < 1) {
     // If it's more than 4 weeks but less than a full month, still use weeks or days? 
     // Usually 4 weeks is a month in baby terms, but let's be precise.
     return `${diffWeeks} weeks old`;
  }
  
  if (months < 24) {
    return `${months} month${months > 1 ? 's' : ''} old`;
  }
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''} old`;
  return `${years} year${years > 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''} old`;
}
