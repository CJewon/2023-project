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
  const menuContainerLi = menuContainerUl.children;
  
  for(let j = 0 ; j <menuContainerLi.firstElementChild.length; j++ ){

    // const makeDiv = document.createElement('div');
    // makeDiv.classList.add('menu_title_con')
    
  }
  // menuContainerLi.appendchild(makeDiv);
  
  console.log(menuContainerLi.firstElementChild.length)

   
  
}