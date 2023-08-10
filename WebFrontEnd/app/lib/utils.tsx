import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function numberToTime(num: number) {
  if (num < 0) {
    return null;
  }
  let numInOneDay = num;
  if (num >= 1440) {
    numInOneDay = num % 1440;
  }
  const rawHours = Math.floor(numInOneDay / 60);
  const minutes = numInOneDay % 60;
  let hours = rawHours;
  let suffix = "AM";
  if (hours >= 12) {
    suffix = "PM";
    hours -= 12;
  }
  if (hours === 0) {
    hours = 12;
  }
  return `${hours}:${minutes.toString().padStart(2, "0")} ${suffix}`;
}

export async function register(username, startingTime, endingTime) {
  const response = await axios.post("http://localhost:3000/api/register", {username, startingTime, endingTime});
  console.log(response);
}