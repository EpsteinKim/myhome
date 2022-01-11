window.onload = function () {
  function printTime() {
    const date = new Date();
    const hh = date.getHours();
    const mm = date.getMinutes();
    const ss = date.getSeconds();
    document.getElementById("time").innerHTML = `${hh} : ${mm} : ${ss}`;
  }

  printTime();

  let timeId = setInterval(printTime, 1000);

  document.getElementById("timeStart").onclick = function () {
    if (timeId == null) timeId = setInterval(printTime, 1000);
  };
  document.getElementById("timeStop").onclick = function () {
    clearInterval(timeId);
    timeId = null;
  };
};
