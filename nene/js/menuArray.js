// 필요한 요소 : ChildElementCount를 이용해서 menu-slide-index-container의 자식의 갯수를 불러와서 index 값을 구한다.
// menu-slide-index-container , 
// 각 index값의 거리 값을 구하기 위한 식은
// for(let i = 0; i < index; i ++) {
//      i / (index - 1) * 100
// }
//   결과값이 0 , 50%, 100% 가 나오게 해야한다
//
// left : (index - 1) / 100

// index = 0 일때 0%
// index = 1 일때 50%
// index = 2 일떄 100%

// index값이 바뀔때마다 결과값이 바뀌게 된다.

// inedxArray[0]에서 첫번째 자식에게 left : 0 , 두번째 자식에게 left : 50% , 세번째 자식에게 left : 100% 를 줘야한다


// const indexContainer = document.querySelectorAll('.menu-slide-index-container'); 
// const indexDots = document.querySelectorAll('.index-dots'); // 10
// const indexArray = []; // 2차원 배열 생성

// indexContainer.forEach(function(container) {
//     const row = []; // 행
//     indexDots.forEach(function(dots) {
//         if(container.contains(dots)) {
//             row.push(dots) // 각 행에 대한 열에 push
//         }
//     })
//     indexArray.push(row);
// })

// indexArray.forEach(function(row, rowIndex) {
//     const rowLength = row.length;
//     row.forEach(function(dot, columnIndex) {
//       const leftValue = (columnIndex / (rowLength - 1) * 100) + '%';
//       dot.style.left = leftValue;
//     });
//   });


// const menuBoard = [
//   ['레드머시기','레드저시기','레드머시꺵이'],
//   ['블루머시기','블루저시기'],
//   ['옐로우머시기']
// ]


const sectionSlider = document.getElementsByClassName('slide-section');


for(let j = 0 ; j <sectionSlider.length;j++){

  
  const menuContainer = sectionSlider[j].firstElementChild;
  const menuContainerUl = menuContainer.firstElementChild;
  const aButtonContainer = sectionSlider[j].lastElementChild.lastElementChild;
  
  
  for(let i = 0 ; i < menuContainerUl.childElementCount ; i ++) {
    const aButton = document.createElement('a');
    aButton.setAttribute('href','#');
    aButton.classList.add('index-dots');
    if(i===0) {
      aButton.classList.add('active');
    }
    
    const pTag = document.createElement('p');
    const pTagText = document.createTextNode(`${menuContainerUl.children[i].firstElementChild.firstElementChild.innerText}`);
    // console.log(pTagText);
    pTag.appendChild(pTagText);
    const divTag = document.createElement('div');
    
    divTag.classList.add('menu_slide_cir')
    
    aButton.appendChild(pTag);
    aButton.appendChild(divTag);

    aButton.style.left = `${100 / (menuContainerUl.childElementCount - 1) * i}%`;
    
    
    aButtonContainer.appendChild(aButton);




    aButton.addEventListener('click', () => {
      for(let i = 0; i < aButtonContainer.childElementCount ; i++){
        aButtonContainer.children[i].classList.remove('active');

      }










      aButton.classList.add('active');
    })
    
  }

  // <a href="#" class="index-dots active">
  //         <p>레드마블치킨</p>
  //         <div class="menu_slide_cir"></div>
  //       </a>
}


let 이전좌표 = 0;
function 차움직이기(도착지점) {
  // 출발지점에서 도착지점으로 차가 움직이게 한다.
  // 가는 도중에는 출발지점과 도착지점을 계산해
  // x축으로 +될때는 차가 오른쪽을 보는 이미지 삽입
  // x축으로 - 될때는 차가 왼쪽을 보는 이미지 삽입
  // 도착지점에 도달하면 정면을 보게 만든다.
  // 이전좌표 = 도착지점;
}












//     for(let j = 0 ; j < indexArray[0]; j++) {
//         indexDots.style.left = (j / (indexArray[0] - 1) * 100);
//     } 





