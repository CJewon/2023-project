async function menuTitle() {
  try {
    // json 사용할때 기본형태 !! *** 데이터베이스 불러오기
    const dbContainer = [];

    // 각 파일의 데이터를 비동기로 가져옵니다.
    const newMenu = await fetch("json/new.json").then((res) => res.json());
    const popularMenu = await fetch("json/popular.json").then((res) =>
      res.json()
    );
    const recommendMenu = await fetch("json/recommend.json").then((res) =>
      res.json()
    );

    // 데이터를 dbContainer에 추가합니다.
    dbContainer.push(newMenu, popularMenu, recommendMenu);

    // 데이터가 준비되었으면 콘텐츠 생성 및 메뉴 배열 함수를 호출합니다.
    await makeContent(dbContainer);
    await menuArray();
  } catch (error) {
    console.error("메뉴 데이터를 불러오는 과정에서 에러발생 : ", error);
  }

  function makeContent(dbContainer) {
    const conName = [
      "new_menu_con",
      "popular_menu_con",
      "recommended_menu_con",
    ];
    const menuConUl = document.getElementsByClassName("menu_con_ul");

    dbContainer.map((db, index) => {
      for (let i = 0; i < db.length; i++) {
        const contents = document.createElement("li");
        contents.classList.add(conName[index]);

        const divMenuTitleCon = document.createElement("div");
        divMenuTitleCon.classList.add("menu_title_con");

        const menuNaming = document.createElement("h3");

        const designImg = document.createElement("img");
        designImg.setAttribute("src", db[i].타이틀svg경로);
        designImg.setAttribute("alt", db[i].이름);
        menuNaming.appendChild(designImg);

        const menuSubNaming = document.createElement("p");
        const menuSubNamingText = document.createTextNode(db[i].서브타이틀);
        menuSubNaming.appendChild(menuSubNamingText);

        const menuExplain = document.createElement("p");
        const menuExplainText = document.createTextNode(db[i].설명);
        menuExplain.appendChild(menuExplainText);

        const menuStyleUl = document.createElement("ul");
        menuStyleUl.classList.add("menu_style_ul");
        for (let j = 0; j < db[i].뱃지.length; j++) {
          const badgeLi = document.createElement("li");
          badgeLi.classList.add("menu_style_li");
          const text = document.createTextNode(db[i].뱃지[j]);
          badgeLi.appendChild(text);
          menuStyleUl.appendChild(badgeLi);
        }

        const aButtonTag = document.createElement("a");
        aButtonTag.setAttribute("href", "#");
        const aButtonDiv = document.createElement("div");
        aButtonDiv.classList.add("button_con");
        const aButtonPTag = document.createElement("p");
        const aButtonText = document.createTextNode("바로 주문하기");
        aButtonPTag.appendChild(aButtonText);
        aButtonDiv.appendChild(aButtonPTag);
        aButtonTag.appendChild(aButtonDiv);

        const imgContainer = document.createElement("figure");
        const img = document.createElement("img");
        img.setAttribute("src", db[i].이미지);
        img.setAttribute("alt", db[i].이름);
        imgContainer.appendChild(img);

        contents.appendChild(divMenuTitleCon);
        divMenuTitleCon.appendChild(menuNaming);
        divMenuTitleCon.appendChild(menuSubNaming);
        divMenuTitleCon.appendChild(menuExplain);
        divMenuTitleCon.appendChild(menuStyleUl);
        divMenuTitleCon.appendChild(aButtonTag);
        contents.appendChild(imgContainer);
        menuConUl[index].appendChild(contents);
      }
    });
  }
}

menuTitle();
