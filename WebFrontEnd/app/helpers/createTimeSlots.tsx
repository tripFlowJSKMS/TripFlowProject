import moment from 'moment';


export default function createTimeSlots(startTime: string, endTime: string) {
    const slots = [];
    const format = 'HH:mm';
    let currentTime = moment(startTime, format);

    while (currentTime.format(format) <= moment(endTime, format).format(format)) {
      slots.push(currentTime.format(format));
      currentTime.add(0.5, 'hours');
    }

    return slots;
}