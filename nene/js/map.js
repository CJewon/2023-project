// 마커를 담을 배열입니다
var markers = [];

var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.566826, 27.9786567), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

// 키워드로 장소를 검색합니다

ps.keywordSearch("구월동 네네치킨", placesSearchCB); // 구월동 네네치킨이라는 검색어를 기본값으로 설정하고 검색한다.

function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    //         // 정상적으로 검색이 완료됐으면
    //         // 검색 목록과 마커를 표출합니다
    displayPlaces(data);

    const locationStore = document.querySelector(".location_store_sec");
    const locationStoreCon = locationStore.firstElementChild;

    const locationStoreName = document.createElement("h2");
    const locationSotreNameText = document.createTextNode("구월동 근처매장");
    locationStoreName.appendChild(locationSotreNameText);
    locationStoreCon.appendChild(locationStoreName);

    const slideContainer = document.createElement("div");
    slideContainer.classList.add("slide_container");
    locationStoreCon.appendChild(slideContainer);

    const previousButton = document.createElement("img");
    previousButton.setAttribute("src", "nene/img/이전버튼.png");
    previousButton.setAttribute("alt", "이전버튼");
    slideContainer.appendChild(previousButton);
    previousButton.classList.add("hidden");

    const makeSlide = document.createElement("div");
    makeSlide.classList.add("make_slide");
    slideContainer.appendChild(makeSlide);

    const nextButton = document.createElement("img");
    nextButton.setAttribute("src", "nene/img/다음버튼.png");
    nextButton.setAttribute("alt", "다음버튼");
    slideContainer.appendChild(nextButton);

    const locationStoreUl = document.createElement("ul");
    locationStoreUl.classList.add("location_store_ul");
    makeSlide.appendChild(locationStoreUl);

    for (let i = 0; i < data.length; i++) {
      const storeList = document.createElement("li");
      storeList.classList.add("location_store_li");
      const aTag = document.createElement("a");
      aTag.setAttribute("href", "#");
      storeList.appendChild(aTag);

      const divImg = document.createElement("div");
      divImg.classList.add("nene_store_img");
      aTag.appendChild(divImg);
      const imgFigure = document.createElement("figure");
      divImg.appendChild(imgFigure);

      const neneImg = document.createElement("img");
      neneImg.setAttribute("src", "nene/img/neneLogo.png");
      neneImg.setAttribute("alt", "네네로고");

      imgFigure.appendChild(neneImg);
      const locationPTag = document.createElement("p");
      const locationPTagText = document.createTextNode(data[i].place_name);

      locationPTag.appendChild(locationPTagText);
      imgFigure.appendChild(locationPTag);

      const informationPTag = document.createElement("p");
      const informationPTagText = document.createTextNode(data[i].place_name);

      informationPTag.appendChild(informationPTagText);
      aTag.appendChild(informationPTag);

      const storeNumber = document.createElement("p");
      const storeNumberPTag = document.createTextNode(data[i].phone);

      storeNumber.appendChild(storeNumberPTag);
      aTag.appendChild(storeNumber);

      const addressPTag = document.createElement("p");
      const addressPTagText = document.createTextNode(data[i].address_name);

      addressPTag.appendChild(addressPTagText);
      aTag.appendChild(addressPTagText);

      locationStoreUl.appendChild(storeList);
    }

    //         searchResult = data;

    const slideState = true;
    const slideLength = data.length;

    let index = 0;
    const maxSlide = locationStoreUl.childElementCount;
    const slideView = 4;
    const maxIndex = maxSlide - slideView;

    // 이전버튼에 이벤트리스너 추가

    previousButton.addEventListener("click", previousButtonEvent);

    //위치적용
    // 만약 index가 0에 도달했다?
    // 이전버튼 숨겨

    // 다음버튼에 이벤트리스너 추가

    nextButton.addEventListener("click", nextButtonEvent);

    slideApply();
    function previousButtonEvent() {
      index--;
      slideApply();
      nextButton.classList.remove("hidden");
      if (index === 0) {
        previousButton.classList.add("hidden");
      }
    }
    function nextButtonEvent() {
      index++;
      slideApply(); // 위치적용
      previousButton.classList.remove("hidden");
      if (index === maxIndex) {
        nextButton.classList.add("hidden");
      }
    }

    function slideApply() {
      locationStoreUl.style.transform = `translateX(-${317 * index}px)`;
      for (let i = 0; i < locationStoreUl.childElementCount; i++) {
        locationStoreUl.children[i].style.opacity = `0.2`;
      }

      for (let i = index; i < index + 4; i++) {
        locationStoreUl.children[i].style.opacity = `1`;
      }
    }
  }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {
  var listEl = document.getElementById("placesList"),
    menuEl = document.getElementById("menu_wrap"),
    fragment = document.createDocumentFragment(),
    bounds = new kakao.maps.LatLngBounds(),
    listStr = "";

  // 검색 결과 목록에 추가된 항목들을 제거합니다
  removeAllChildNods(listEl);

  // 지도에 표시되고 있는 마커를 제거합니다
  removeMarker();

  for (var i = 0; i < places.length; i++) {
    // 마커를 생성하고 지도에 표시합니다
    var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
      marker = addMarker(placePosition, i),
      itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    bounds.extend(placePosition);

    // 마커와 검색결과 항목에 mouseover 했을때
    // 해당 장소에 인포윈도우에 장소명을 표시합니다
    // mouseout 했을 때는 인포윈도우를 닫습니다
    (function (marker, title) {
      kakao.maps.event.addListener(marker, "mouseover", function () {
        displayInfowindow(marker, title);
      });

      kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });

      itemEl.onmouseover = function () {
        displayInfowindow(marker, title);
      };

      itemEl.onmouseout = function () {
        infowindow.close();
      };
    })(marker, places[i].place_name);

    fragment.appendChild(itemEl);
  }

  // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
  listEl.appendChild(fragment);
  menuEl.scrollTop = 0;

  // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {
  var el = document.createElement("li"),
    itemStr =
      '<span class="markerbg marker_' +
      (index + 1) +
      '"></span>' +
      '<div class="info">' +
      "   <h5>" +
      places.place_name +
      "</h5>";

  if (places.road_address_name) {
    itemStr +=
      "    <span>" +
      places.road_address_name +
      "</span>" +
      '   <span class="jibun gray">' +
      places.address_name +
      "</span>";
  } else {
    itemStr += "    <span>" + places.address_name + "</span>";
  }

  itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

  el.innerHTML = itemStr;
  el.className = "item";

  return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
  var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
    imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
    imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    },
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
    marker = new kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage,
    });

  marker.setMap(map); // 지도 위에 마커를 표출합니다
  markers.push(marker); // 배열에 생성된 마커를 추가합니다

  return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
}

function createSlide() {
  const moveSlide = document.querySelector(".slide_container");
  console.log(moveSlide);
}

// 1.
