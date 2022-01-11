window.onload = function () {
  let civilNum = null;

  while (true) {
    const firstNum = prompt("주민등록번호 앞자리를 입력해주세요");
    if (firstNum.length != 6) {
      alert("앞자리 6자리를 입력해주세요");
      continue;
    }
    civilNum = firstNum;
    break;
  }

  while(true){
    const lastNum = prompt("주민등록번호 뒷자리를 입력해주세요");
    if (lastNum.length != 7) {
      alert("뒷자리 7자리를 입력해주세요");
      continue;
    }
    civilNum = civilNum.concat(lastNum);
    break;
  }

  let civilCheck = 0;

  for (let i = 0; i < 12; i++)
    civilCheck += Number(civilNum.charAt(i)) * ((i % 8) + 2);

  civilCheck %= 11;
  civilCheck = 11 - civilCheck;
  if (civilCheck >= 10) civilCheck %= 10;

  if (civilCheck == civilNum.charAt(civilNum.length - 1)) {
    document.getElementById("result").innerHTML = "유효한 주민등록번호 입니다";
    alert("유효한 주민등록번호 입니다.");
  } else {
    document.getElementById("result").innerHTML =
      "유효하지 않은 주민등록번호입니다";
    alert("유효하지 않은 주민등록번호 입니다.");
  }
};
