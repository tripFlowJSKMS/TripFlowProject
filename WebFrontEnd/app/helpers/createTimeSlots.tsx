import moment from 'moment';
import formatTime from '../helpers/formatTime';


export default function createTimeSlots(startTime: number, endTime: number) {
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