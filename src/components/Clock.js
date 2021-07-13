import { $ } from "../utils/dom.js"

export default function Clock() {
  const getTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const monthWithZero = month < 10 ? `0${month}` : `${month}`;
    const date = now.getDate();
    const dateWithZero = date < 10 ? `0${date}` : `${date}`;
    const hours = now.getHours();
    const hoursWithZero = hours < 10 ? `0${hours}` : `${hours}`;
    const minutes = now.getMinutes();
    const minutesWithZero = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = now.getSeconds();
    const secondsWithZero = seconds < 10 ? `0${seconds}` : `${seconds}`;

    $(".js-clock").querySelector("h1").innerText = `${year}-${monthWithZero}-${dateWithZero} ${hoursWithZero}:${minutesWithZero}:${secondsWithZero}`;
  }

  getTime();
  setInterval(getTime, 1000);
}
