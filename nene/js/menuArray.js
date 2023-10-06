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


const indexContainer = document.querySelectorAll('.menu-slide-index-container'); 
const indexDots = document.querySelectorAll('.index-dots'); // 10
const indexArray = []; // 2차원 배열 생성

indexContainer.forEach(function(container) {
    const row = []; // 행
    indexDots.forEach(function(dots) {
        if(container.contains(dots)) {
            row.push(dots) // 각 행에 대한 열에 push
        }
    })
    indexArray.push(row);
})

indexArray.forEach(function(row, rowIndex) {
    const rowLength = row.length;
    row.forEach(function(dot, columnIndex) {
      const leftValue = (columnIndex / (rowLength - 1) * 100) + '%';
      dot.style.left = leftValue;
    });
  });















//     for(let j = 0 ; j < indexArray[0]; j++) {
//         indexDots.style.left = (j / (indexArray[0] - 1) * 100);
//     } 




