export default function formatTime(timeInMinutes: number) {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    // Pad the hours and minutes with leading zeros if needed
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
}