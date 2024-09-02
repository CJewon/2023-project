const sections = document.querySelectorAll("body>section");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
let index = 0; // 현재페이지
let moveState = false;
let num = true;

window.addEventListener(
  "mousewheel",
  (e) => {
    e.preventDefault();
    // addEventListener가 실행이 될때, moveState가 true가 되고, true가 되면서 스크롤이 시작이 된다. 근데 이것을 setTimeOut으로 통제를 한다.
    if (!moveState) {
      moveState = true;
      setTimeout(() => {
        moveState = false;
      }, 500);

      // console.log(sections.length);
      if (window.scrollY < sections.length * window.innerHeight) {
        e.preventDefault();
        if (e.deltaY > 0) {
          index++;
          // 아래로 스크롤하는 경우
          window.scrollTo({
            top: index * window.innerHeight,
            left: 0,
            behavior: "smooth",
          });
          if (index > sections.length) {
            index = sections.length;
          }
        } else if (e.deltaY < 0) {
          // 위로 스크롤하는 경우
          index--;
          window.scrollTo({
            top: index * window.innerHeight,
            left: 0,
            behavior: "smooth",
          });
          if (index < 0) {
            index = 0;
          }
          
        }
      } else if ((window.scrollY = sections.length * window.innerHeight)) {
        if (e.deltaY > 0) {
          // 아래로 스크롤하는 경우
          window.scrollTo({
            top: index * window.innerHeight + footer.clientHeight,
            left: 0,
            behavior: "smooth",
          });
          // header.classList.add('active');
          console.log(header);
        } else if (e.deltaY < 0) {
          // 위로 스크롤하는 경우
          index--;
          window.scrollTo({
            top: index * window.innerHeight,
            left: 0,
            behavior: "smooth",
          });
          console.log(header);
        }
      }
      headerState();
    }
  },
  { passive: false }
);

// window.scrollY = (sections.length-1) * window.innerHeight 인 상황에서, e.deltaY > 0 일때 footer.clinetHeight 만큼 내려가고, e.deltaY < 0 일때 index --; 를하고 index*window.innerHeight 만큼 올라가게 한다.
// index의 범위는 음수보다 크고 sections.length까지 올라오게 만든다.

function headerState() {
  if (index > sections.length - 1) {
    header.style.transform = `translateY(-${100}%)`;
  } else {
    header.style.transform = `translateY(${0}%)`;
  }
}
