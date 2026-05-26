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
  const milestone = new Date(dateStr);
  const today = new Date();
  
  milestone.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffMs = milestone.getTime() - today.getTime();
  
  if (diffMs === 0) {
    return 'Today';
  }
  
  if (diffMs < 0) {
    // Past milestone: "X Months X Days ago"
    let months = (today.getFullYear() - milestone.getFullYear()) * 12 + (today.getMonth() - milestone.getMonth());
    let days = today.getDate() - milestone.getDate();
    
    if (days < 0) {
      months--;
      // Days in the previous month of today
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    
    if (months > 0) {
      const monthStr = `${months} Month${months !== 1 ? 's' : ''}`;
      const dayStr = days > 0 ? ` ${days} Day${days !== 1 ? 's' : ''}` : '';
      return `${monthStr}${dayStr} ago`;
    } else {
      return `${days} Day${days !== 1 ? 's' : ''} ago`;
    }
  } else {
    // Future milestone: "X Year" or "X Years"
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const years = Math.floor(diffDays / 365.25);
    const displayYears = Math.max(1, years);
    return `${displayYears} Year${displayYears !== 1 ? 's' : ''}`;
  }
}
