menuTitle()
async function menuTitle(){// json 사용할때 기본형태 !! *** 데이터베이스 불러오기
  let dbContainer = [];
  fetch('json/new.json')
  .then(res => res.json())
  .then(data => {
    dbContainer.push(data);
    fetch('json/popular.json')
    .then(res => res.json())
    .then(data => {
      dbContainer.push(data);
      fetch('json/recommend.json')
      .then(res => res.json())
      .then(data => {
        dbContainer.push(data);
        함수();
        async function 함수(){
          await makeContent();
          await menuArray();
        }
      })
    })
  })

function makeContent(){

  const conName = ['new_menu_con','popular_menu_con','recommended_menu_con']
  const menuConUl = document.getElementsByClassName('menu_con_ul');
 
  dbContainer.map((db, index)=>{
    
      for(let i = 0; i < db.length; i++) {
        
        //   <li class="recommended_menu_con">
        const contents = document.createElement('li');
        
        contents.classList.add(conName[index]);
        
        //           <div class="menu_title_con">
        const divMenuTitleCon = document.createElement('div');
        divMenuTitleCon.classList.add('menu_title_con');
                    // <h3>db.이름</h3>
          const menuNaming = document.createElement('h3');

            const designImg = document.createElement("img");
            designImg.setAttribute("src", db[i].타이틀svg경로)
            designImg.setAttribute('alt', db[i].이름)
            menuNaming.appendChild(designImg);        
        //             <p>핫하고 달콤한 소스와<br>홍, 청고추의 매력적인 치킨!</p>
        const menuSubNaming = document.createElement('p');
        const menuSubNamingText = document.createTextNode(db[i].서브타이틀);
        menuSubNaming.appendChild(menuSubNamingText);
        //             <p>네네에서 준비한 네네만의 매운맛! 핫블링치킨</p>
        const menuExplain = document.createElement('p');
        const menuExplainText = document.createTextNode(db[i].설명);
        menuExplain.appendChild(menuExplainText);
        //             <ul class="menu_style_ul">
        //               <li class="menu_style_li">마일드</li>
        //               <li class="menu_style_li">순살</li>
        //               <li class="menu_style_li">추천 메뉴</li>
        //               <li class="menu_style_li">매콤달콤</li>
        //             </ul>
        const menuStyleUl = document.createElement('ul')
        menuStyleUl.classList.add('menu_style_ul');
        for(let j = 0 ; j < db[i].뱃지.length ; j ++) {
          const badgeLi = document.createElement('li')
          badgeLi.classList.add('menu_style_li');
          const text = document.createTextNode(db[i].뱃지[j]);
          menuStyleUl.appendChild(badgeLi);
          badgeLi.appendChild(text);
        }
        //             <a href="#">
        //               <div class="button_con">
        //                 <p>바로 주문하기</p>
        //               </div>
        //             </a>
        const aButtonTag = document.createElement('a');
        aButtonTag.setAttribute('href', '#')
        const aButtonDiv = document.createElement('div');
        aButtonDiv.classList.add('button_con')
        const aButtonPTag = document.createElement('p')
        const aButtonText = document.createTextNode('바로 주문하기')
        aButtonTag.appendChild(aButtonDiv);
        aButtonDiv.appendChild(aButtonPTag);
        aButtonPTag.appendChild(aButtonText);        
        //           </div>

        //           <figure>
        //             <img src="../img/핫블링치킨.png" alt="핫블링치킨">
        //           </figure>
        const imgContainer = document.createElement('figure');
        const img = document.createElement('img');
        img.setAttribute("src", db[i].이미지)
        img.setAttribute('alt', db[i].이름)
        imgContainer.appendChild(img);
        // console.log(imgContainer)
        //         </li>
        contents.appendChild(divMenuTitleCon);
        divMenuTitleCon.appendChild(menuNaming);
        divMenuTitleCon.appendChild(menuSubNaming);
        divMenuTitleCon.appendChild(menuExplain);
        divMenuTitleCon.appendChild(menuStyleUl);
        divMenuTitleCon.appendChild(aButtonTag);
        contents.appendChild(imgContainer);
        menuConUl[index].appendChild(contents);
      }
    })
  }}