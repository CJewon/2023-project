// json 사용할때 기본형태 !! *** 데이터베이스 불러오기

let 데이터베이스;
fetch('../json/new.json')
.then(res => res.json())
.then(data => {
  데이터베이스 = data
  console.log(data[0]);
})

// ************************************

// const sectionSlider = document.getElementsByClassName('slide-section');

for(let i = 0; i < sectionSlider.length; i++) {
  const menuContainer = sectionSlider[i].firstElementChild;
  const menuContainerUl = menuContainer.firstElementChild;
  const menuCOntainerLi = menuContainerUl.children;

  //  for(let j = 0 ; j < menuContainerUl.childElementCount; j++) {
  //   const menuContainerLi = menuContainerUl[j].children;
  //  }

   console.log(menuCOntainerLi)
  
}