export default function formatDate(year: number, month: number, date: number): string {
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDate = String(date).padStart(2, "0");
    const formattedDateStr = `${year}-${formattedMonth}-${formattedDate}`;
    return formattedDateStr;
}
  