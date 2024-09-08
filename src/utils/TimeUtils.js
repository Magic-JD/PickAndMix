export function getYourPuzzleId() {
    const startDate = new Date('2024-09-04');
    startDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    const differenceInMillis = currentDate - startDate;
    const differenceInDays = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));
    return differenceInDays;
}

export function calculateTime(time) {
    let seconds = Math.trunc(time / 1000);
      if (seconds < 60){
          return `${seconds}s`
      }
    let minutes = Math.trunc(seconds / 60);
    let remainingSeconds = seconds % 60;
      if (minutes < 60){
    return `${minutes}m ${remainingSeconds}s`;
      }
    let hours = Math.trunc(minutes / 60)
    let remainingMinutes = seconds % 60;
    return `${hours}h ${remainingMinutes}m ${remainingSeconds}s`;
  };
