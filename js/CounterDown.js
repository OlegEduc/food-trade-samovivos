
export function addCounter() {


 var counterHTML;

  // получим текущее время
  const currentTime = new Date();

  // вычислим разниуц между текущим временем и началом нового года
  const diffTime = dateEnd - currentTime;

  alert(diffTime)
  if (diffTime < 0) {
    counterHTML = "";
    return counterHTML;
  }

 counterHTML = `<div id="countdown-wrapper" class="countdown-wrapper" >
        <div class="countdown-title">
            до закінчення акції:
        </div>
        <div id="countdown" class="countdown">
            <div class="time">
                <h2 class="score" id="days">00</h2>
                <small id="text-days">днів</small>
            </div>
            <div class="time">
                <h2 class="score" id="hours">00</h2>
                <small id="text-hours">годин</small>
            </div>
            <div class="time">
                <h2 class="score" id="minutes">00</h2>
                <small id="text-minutes">хвилин</small>
            </div>
            <div class="time">
                <h2 class="score" id="seconds">00</h2>
                <small id="text-seconds">секунд</small>
            </div>
        </div>
    </div> 
    `;
  return counterHTML;
}

// делаем расчеты
//  // получим текуший год
//  const currentYear = new Date().getFullYear();

// установим конечную дату и время
const dateEnd = new Date(`Jule 01 2025 00:00:00`);

setInterval(updateCounter, 1000);

export function updateCounter() {
  // получим текущее время
  const currentTime = new Date();

  if (currentTime > dateEnd) {
    return;
  }

  // вычислим разниуц между текущим временем и началом нового года
  const diffTime = dateEnd - currentTime;
 

  // скроем счетчик если акция закончилась
  if (diffTime < 0) {
    document.querySelector("#countdown-wrapper").style.display = "none";
  // } else {
  //   document.querySelector("#countdown-wrapper").style.display = "block";
  }

  return ;

  // вычислим остаток дней
  const daysLeft = Math.floor(diffTime / 1000 / 60 / 60 / 24);
  // вычислим остаток часов
  const hoursLeft = Math.floor(diffTime / 1000 / 60 / 60) % 24;
  // вычислим остаток минут
  const minutesLeft = Math.floor(diffTime / 1000 / 60) % 60;
  // вычислим остаток секунд
  const secondsLeft = Math.floor(diffTime / 1000) % 60;

  // подставляем значения в соответствующие поля
  document.querySelector("#days").innerText =
    daysLeft < 10 ? "0" + daysLeft : daysLeft;
  document.querySelector("#hours").innerText =
    hoursLeft < 10 ? "0" + hoursLeft : hoursLeft;
  document.querySelector("#minutes").innerText =
    minutesLeft < 10 ? "0" + minutesLeft : minutesLeft;
  document.querySelector("#seconds").innerText =
    secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;

  // опрепдулим подписи полей заполнения
  document.querySelector("#text-days").innerText = getTextDays(daysLeft);
  document.querySelector("#text-hours").innerText = getTextHours(hoursLeft);
  document.querySelector("#text-minutes").innerText =
    getTextMinutes(minutesLeft);
  document.querySelector("#text-seconds").innerText =
    getTextSeconds(secondsLeft);
}

export function getTextDays(countDays) {
  countDays = countDays % 100;
  if (countDays > 10 && countDays < 20) return "днів";
  if (countDays % 10 > 4 || countDays % 10 == 0) return "днів";
  if (countDays % 10 == 1) return "день";
  if (0 > countDays % 10 < 5) return "дня";
}

export function getTextHours(countHours) {
  if (countHours % 10 == 0 || countHours % 10 > 4 ) return "годин";
  if ( countHours > 10 && countHours < 20) return "годин";
  if (countHours % 10 < 2) return "година";
  if (countHours % 10 < 5) return "години";
}

export function getTextMinutes(countMinutes) {
  if (countMinutes > 10 && countMinutes < 21) return "хвилин";
  if (countMinutes % 10 > 0 && countMinutes % 10 < 2) return "хвилина";
  if (countMinutes % 10 < 5 && countMinutes % 10 > 0) return "хвилини";
  if (countMinutes % 10 == 0 || countMinutes % 10 > 4) return "хвилин";
}

export function getTextSeconds(countSeconds) {
  if (countSeconds > 4 && countSeconds < 20) return "секунд";
  if (countSeconds % 10 > 0 && countSeconds % 10 < 2) return "секунда";
  if (countSeconds % 10 > 0 && countSeconds % 10 < 5) return "секунди";
  if (countSeconds % 10 > 4 || countSeconds % 10 == 0) return "секунд";
}

export function setSizeCounter(blockOuter) {
  //вычислим ширину для счетчика в зависимости от ширины экрана
  const sizeBlock = document.querySelector(blockOuter);

  let setWidth = sizeBlock.firstElementChild.clientWidth;
  if (setWidth > 0) {
    setWidth = setWidth + "px";
    document.querySelector(".countdown-wrapper").style.width = setWidth;
    document.querySelector(".countdown").style.width = setWidth;
    document.querySelector(".countdown-title").style.width = setWidth;
  }
}
