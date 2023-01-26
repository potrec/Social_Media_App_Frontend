export function getTimeDifference(date: string): string {
  const currentTime = new Date();
  const dataTime = new Date(date);
  const timeDifference = currentTime.getTime() - dataTime.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (seconds < 60) {
    return 'just now';
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 3) {
    return `${days} days ago`;
  } else {
    return dataTime.toLocaleDateString();
  }
}