import Events from "events";
import moment from "moment";
import "moment-precise-range-plugin";

const dateString = process.argv[2];
const regExp = /^([01]\d|2[0-3])-([0-2]\d|3[01])-(0\d|1[0-2])-\d\d\d\d$/;

if (!regExp.test(dateString)) {
  console.log(
    'Неверный формат времени. Введите желаемое время в формате "чч-дд-мм-гггг"'
  );
} else {
  const [hour, day, month, year] = dateString.split("-");
  const myDate = moment(`${year} ${month} ${day} ${hour}`, "YYYY MM DD hh");

  const showRemainingTime = (timerDoneDate) => {
    const dateNow = moment();
    const diff = moment.preciseDiff(dateNow, timerDoneDate);

    console.clear();
    if (!diff || myDate - dateNow < 0) {
      emitter.emit("timerDone", timer);
    } else {
      console.log(diff);
    }
  };

  const timer = setInterval(() => {
    emitter.emit("timerTick", myDate);
  }, 1000);

  const stopTimer = (timerID) => {
    clearInterval(timerID);
    console.log("Время вышло");
  };

  const emitter = new Events();

  emitter.on("timerTick", showRemainingTime);
  emitter.on("timerDone", stopTimer);
}
