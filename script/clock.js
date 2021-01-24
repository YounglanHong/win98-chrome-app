const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthWithZero = month < 10 ? `0${month}` : `${month}`;
  const date = now.getDate();
  const dateWithZero = date < 10 ? `0${date}` : `${date}`;
  const hours = now.getHours();
  const hoursWithZero = hours < 10 ? `0${hours}` : `${hours}`;
  const minutes = now.getMinutes();
  const minutesWithZero = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const seconds = now.getSeconds();
  const secondsWithZero = seconds < 10 ? `0${seconds}` : `${seconds}`;
  clockTitle.innerText = `${year}-${monthWithZero}-${dateWithZero} ${hoursWithZero}:${minutesWithZero}:${secondsWithZero}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();
