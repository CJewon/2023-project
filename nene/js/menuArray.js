function menuArray() {
  const sectionSlider = document.getElementsByClassName("slide-section");

  for (let j = 0; j < sectionSlider.length; j++) {
    const menuContainer = sectionSlider[j].firstElementChild;
    const menuContainerUl = menuContainer.firstElementChild;
    const aButtonContainer = sectionSlider[j].lastElementChild.lastElementChild;

    const neneCar = sectionSlider[j].querySelector(".nene_char");

    let index = 0;

    let 네네카이전좌표 = 0;

    function 슬라이드위치업데이트() {
      menuContainerUl.style.transform = `translateX(-${100 * index}vw)`;
    }

    function 차움직이기(도착지점) {
      console.log(neneCar);
      neneCar.style.left = `${도착지점}%`;

      if (네네카이전좌표 < 도착지점) {
        neneCar.setAttribute("src", "./nene/img/rightnenecar.png");
      } else {
        neneCar.setAttribute("src", "./nene/img/leftnenecar.png");
        // 왼쪽방향 이미지로 교체
      }

      setTimeout(() => {
        // 이동 끝난 후 정면으로 교체
        neneCar.setAttribute("src", "./nene/img/네네캐릭터.png");
      }, 1000);
      네네카이전좌표 = 도착지점;
    }

    let slideState = true;

    function slideControl() {
      if (slideState) {
        slideState === false;
        // 해당 슬라이드 위치로 이동하기
        slideState === true;
      }
    }

    // 슬라이드 버튼 만들기
    for (let i = 0; i < menuContainerUl.childElementCount; i++) {
      const aButton = document.createElement("a");
      aButton.setAttribute("href", "#");
      aButton.classList.add("index-dots");
      if (i === 0) {
        aButton.classList.add("active");
      }

      const pTag = document.createElement("p");
      const pTagText = document.createTextNode(
        `${menuContainerUl.children[i]
          .querySelector("h3")
          .firstElementChild.getAttribute("alt")}`
      );
      // console.log(pTagText);
      pTag.appendChild(pTagText);
      const divTag = document.createElement("div");

      divTag.classList.add("menu_slide_cir");

      aButton.appendChild(pTag);
      aButton.appendChild(divTag);

      const thisButtonPos = (100 / (menuContainerUl.childElementCount - 1)) * i;
      aButton.style.left = `${thisButtonPos}%`;

      aButtonContainer.appendChild(aButton);

      // 슬라이드 버튼을 클릭했을때 해당위치로 이미지 이동하기 및 인터랙션 발생
      aButton.addEventListener("click", (e) => {
        e.preventDefault();
        for (let i = 0; i < aButtonContainer.childElementCount; i++) {
          aButtonContainer.children[i].classList.remove("active");
        }
        차움직이기(thisButtonPos);
        aButton.classList.add("active");
        index = i;
        console.log(`${j}컨테이너의 인덱스 : ${i}`);
        슬라이드위치업데이트();
      });
    }
  }

  let 테스트이전위치 = 0;
  function 테스트이동(도착위치) {
    carTest.style.left = `${도착위치}%`;

    if (테스트이전위치 < 도착위치) {
      carTest.setAttribute("src", "../img/rightnenecar.png");
    } else {
      carTest.setAttribute("src", "../img/leftnenecar.png");
      // 왼쪽방향 이미지로 교체
    }

    setTimeout(() => {
      // 이동 끝난 후 정면으로 교체
      carTest.setAttribute("src", "../img/네네캐릭터.png");
    }, 1000);
    테스트이전위치 = 도착위치;
  }
}
