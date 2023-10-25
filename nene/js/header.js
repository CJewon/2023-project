// footer 컨텐츠가 화면에 나올때(footer.getboundingClientRect().top === 0) header를 display: none 처리해준다
// footer 컨텐츠가 화면에 보이지 않을때(footer.getboundingClientRect().bottom === 0) header를 원래대로 되돌아온다.
// scroll했을때 footer.getBoundingRect().top , bottom 값을 갱신해주고 갱신한 값으로 작동하게 해야한다.
// 이를 위한 방법은 class를 add, remove 해주는 방법을 사용하면 될것이다.

// 밑에 있는 코드는 header.js에 작성이 아닌 onepage.js에 추가해야하는 코드








