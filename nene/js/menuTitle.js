// json 사용할때 기본형태 !! *** 데이터베이스 불러오기

let 데이터베이스;
fetch('../json/new.json')
.then(res => res.json())
.then(data => {
  데이터베이스 = data
  console.log(data[0]);
})

// ************************************

console.log()