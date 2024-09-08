export function getYourPuzzleId() {
  const startDate = new Date("2024-09-04");
  startDate.setHours(0, 0, 0, 0);
  const currentDate = new Date();
  const differenceInMillis = currentDate - startDate;
  const differenceInDays = Math.floor(
    differenceInMillis / (1000 * 60 * 60 * 24),
  );
  return differenceInDays;
}

export function calculateTime(t, time) {
  let seconds = Math.trunc(time / 1000);
  if (seconds < 60) {
    return `${seconds}${t("second-short")}`;
  }
  let minutes = Math.trunc(seconds / 60);
  let remainingSeconds = seconds % 60;
  if (minutes < 60) {
    return `${minutes}${t("minute-short")} ${remainingSeconds}${t("second-short")}`;
  }
  let hours = Math.trunc(minutes / 60);
  let remainingMinutes = minutes % 60;
  return `${hours}${t("hour-short")} ${remainingMinutes}${t("minute-short")} ${remainingSeconds}${t("second-short")}`;
}

export function getTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  return midnight - now;
}
