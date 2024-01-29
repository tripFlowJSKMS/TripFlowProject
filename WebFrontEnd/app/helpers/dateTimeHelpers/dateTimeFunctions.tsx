import moment from 'moment';

// Create an array of time options in a 30-minute interval
export function createTimeIntervals(): { [timeString: string]: number } {
    const timeOptions : { [timeString: string]: number } = {};
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const timeInMinutes = timeToMinutes(timeString);
        timeOptions[timeString] = timeInMinutes;
      }
    }
    return timeOptions;
}

// Converts time from HH:MM to minutes
export function timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

// Converts time from mnutes to HH:MM
export function formatTime(timeInMinutes: number) {
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;
  // Pad the hours and minutes with leading zeros if needed
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}

export function formatDuration(duration: number) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
}

export function formatDate(year: number, month: number, date: number): string {
  const formattedMonth = String(month).padStart(2, "0");
  const formattedDate = String(date).padStart(2, "0");
  const formattedDateStr = `${year}-${formattedMonth}-${formattedDate}`;
  return formattedDateStr;
}

export function createTimeSlots(startTime: number, endTime: number) {
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);
    const slots = [];
    const format = 'HH:mm';
    let currentTime = moment(formattedStartTime, format);

    while (currentTime.format(format) <= moment(formattedEndTime, format).format(format)) {
      slots.push(currentTime.format(format));
      currentTime.add(0.5, 'hours');
    }

    return slots;
}

export function getDateRangeArray(startDate: string, endDate: string): string[] {
  console.log("Get Date Range Array");
  let dateArray: string[] = [];
  let currentDate = new Date(startDate);
  let end = new Date(endDate);

  while (currentDate <= end) {
    const currDateString: string = currentDate.toISOString().split('T')[0];
    dateArray.push(currDateString);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  console.log("GDR returned");

  return dateArray;
};