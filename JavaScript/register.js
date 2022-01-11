const form = document.regform;
let RNN_availity = false;
autoCompleteOff();
zipSet();

function sendit() {
  const userid = form.userid;
  const userpw = form.userpw;
  const userpw_re = form.userpw_re;
  const name = form.name;
  const hp = form.hp;
  const email = form.email;
  const hobby = form.hobby;
  const ssn1 = form.ssn1;
  const ssn2 = form.ssn2;
  const zipcode = form.zipcode;
  const address1 = form.address1;
  const address2 = form.address2;
  const address3 = form.address3;
  const zipBtn = form.zipBtn;

  const expUserId = /^[A-Za-z0-9]+$/;
  const expUserPw = /^[A-Za-z\!-9]+$/;
  const expNameText = /^[가-힣]+$/;
  const expHp = /^\d{3}-\d{3,4}-\d{4}$/;
  const expEmail = /^[A-Za-z0-9\.\-]+@[A-Za-z]+\.[a-z]+$/;
  const expOnlyNum = /^[0-9]+$/;

  if (userid.value.length < 4) {
    alert("아이디는 4글자 이상 20자 이하로 입력해주세요");
    userid.focus();
    return false;
  }
  if (!expUserId.test(userid.value)) {
    alert("대소문자와 숫자만 사용할 수 있습니다");
    userid.focus();
    return false;
  }
  if (userpw.value.length < 4) {
    alert("비밀번호는 4글자 이상 20자 이하로 입력해주세요");
    userpw.focus();
    return false;
  }
  if (!expUserPw.test(userpw.value)) {
    alert("비밀번호는 대소문자와 숫자, 특수문자만을 포함합니다");
    userpw.focus();
    return false;
  }
  if (userpw_re.value != userpw.value) {
    alert("비밀번호가 일치하지 않습니다");
    userpw_re.focus();
    return false;
  }
  if (name.value == "") {
    alert("이름을 입력해주세요");
    name.focus();
    return false;
  }
  if (!expNameText.test(name.value)) {
    alert("한글로만 이름을 입력해주세요");
    name.focus();
    return false;
  }
  if (hp.value == "") {
    alert("전화번호를 입력해주세요");
    hp.focus();
    return false;
  }
  if (!expHp.test(hp.value)) {
    alert("하이픈을 포함하여 형식에 맞게 입력해주세요");
    hp.focus();
    return false;
  }
  if (email.value == "") {
    alert("이메일을 입력해주세요");
    email.focus();
    return false;
  }
  if (!expEmail.test(email.value)) {
    alert("형식에 맞게 이메일을 입력해주세요");
    email.focus();
    return false;
  }
  let count = 0;
  for (let i in hobby) if (hobby[i].checked) count++;

  if (count == 0) {
    alert("취미는 1개이상 선택해야 합니다.");
    return false;
  }
  if (ssn1.value == "" || ssn1.value.length != 6) {
    alert("주민등록번호 앞자리를 입력해주세요");
    ssn1.focus();
    return false;
  }
  if (!expOnlyNum.test(ssn1.value)) {
    alert("주민등록번호 앞자리를 숫자로만 입력해주세요");
    ssn1.focus();
    return false;
  }
  if (ssn2.value == "" || ssn2.value.length != 7) {
    alert("주민등록번호 뒷자리를 입력해주세요");
    ssn2.focus();
    return false;
  }
  if (!expOnlyNum.test(ssn2.value)) {
    alert("주민등록번호 뒷자리를 숫자로만 입력해주세요");
    ssn2.focus();
    return false;
  }
  if (zipcode.value == "") {
    alert("우편번호를 검색해주세요");
    return false;
  }
  if (address2.value == "") {
    alert("세부주소를 입력해주세요");
    address2.focus();
    return false;
  }
  if (!RNN_availity) {
    alert("주민등록번호가 유효하지 않습니다");
    ssn1.focus();
    return false;
  }

  alert(
    "형식에 맞게 모든 걸 입력하셨습니다\n당신의 정보는 이제 제껍니다.\n다음창으로 넘어가지 않게 설정해두었습니다."
  );
  return false;
}

function moveFocus() {
  const ssn1 = form.ssn1;
  const ssn2 = form.ssn2;
  if (ssn1.value.length == 6) {
    ssn2.focus();
  }
  isPerson();
}

function isPerson() {
  RNN_availity = false;

  document.getElementById("birth").children[0].value = "";
  document.getElementById("birth").children[1].value = "";
  document.getElementById("birth").children[2].value = "";
  document.getElementById("RNN_check").innerHTML = "무효";

  if (form.ssn1.value.length == 6 && form.ssn2.value.length == 7) {
    const ssn = form.ssn1.value.concat(form.ssn2.value); // 그 자체로 문자열

    let checkSum = 0;

    for (let i = 0; i < 12; i++)
      checkSum += Number(ssn.charAt(i)) * ((i % 8) + 2);

    checkSum %= 11;
    checkSum = 11 - checkSum;
    if (checkSum >= 10) checkSum %= 10;

    if (checkSum == ssn.charAt(ssn.length - 1)) {
      document.getElementById("RNN_check").innerHTML = "유효";
      RNN_availity = true;
      inputBirth();
    }
  }
}

function autoCompleteOff() {
  const input = document.getElementsByTagName("input");
  for (let i in input) input[i].autocomplete = "off";
}

function zipSet() {
  const zipcode = form.zipcode;
  const address1 = form.address1;
  const address3 = form.address3;
  const zipBtn = form.zipBtn;
  const arr = [zipcode, address1, address3];

  for (let i in arr) {
    arr[i].placeholder = "우편번호 찾기로 입력";
    arr[i].onclick = zipBtn.onclick;
  }
}

function inputBirth() {
  const birth = document.getElementById("birth").children;
  const ssn1 = form.ssn1;
  const ssn2 = form.ssn2;
  const year = birth[0];
  const month = birth[1];
  const day = birth[2];
  console.log(birth);
  let yearValue;
  if (ssn2.value.substr(0, 1) == 1 || ssn2.value.substr(0, 1) == 2)
    yearValue = "19";
  else yearValue = "20";
  year.value = yearValue.concat(ssn1.value.substr(0, 2));
  month.value = Number(ssn1.value.substr(2, 2));
  day.value = Number(ssn1.value.substr(4, 2));
}
