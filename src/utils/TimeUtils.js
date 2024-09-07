export function getYourPuzzleId() {
    const startDate = new Date('2024-09-04');
    startDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    const differenceInMillis = currentDate - startDate;
    const differenceInDays = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));
    return differenceInDays;
}
