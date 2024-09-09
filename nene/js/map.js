// 마커를 담을 배열입니다
var markers = [];

// 지도 설정
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
ps.keywordSearch("구월동 네네치킨", placesSearchCB); // 기본 검색어로 장소 검색

// 검색 결과 콜백 함수
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    // 검색된 장소를 지도에 표시
    displayPlaces(data);

    const locationStore = document.querySelector(".location_store_sec");
    const locationStoreCon = locationStore.firstElementChild;

    // 슬라이드 구성 요소 생성
    const locationStoreName = document.createElement("h2");
    locationStoreName.textContent = "구월동 근처매장";
    locationStoreCon.appendChild(locationStoreName);

    const slideContainer = document.createElement("div");
    slideContainer.classList.add("slide_container");
    locationStoreCon.appendChild(slideContainer);

    // 이전 버튼
    const previousButton = document.createElement("img");
    previousButton.setAttribute("src", "nene/img/이전버튼.png");
    previousButton.setAttribute("alt", "이전버튼");
    previousButton.classList.add("hidden");
    slideContainer.appendChild(previousButton);

    // 슬라이드 생성
    const makeSlide = document.createElement("div");
    makeSlide.classList.add("make_slide");
    slideContainer.appendChild(makeSlide);

    // 다음 버튼
    const nextButton = document.createElement("img");
    nextButton.setAttribute("src", "nene/img/다음버튼.png");
    nextButton.setAttribute("alt", "다음버튼");
    slideContainer.appendChild(nextButton);

    const locationStoreUl = document.createElement("ul");
    locationStoreUl.classList.add("location_store_ul");
    makeSlide.appendChild(locationStoreUl);

    // 검색된 데이터를 기반으로 리스트 생성
    data.forEach((place) => {
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
      locationPTag.textContent = place.place_name;
      imgFigure.appendChild(locationPTag);

      const informationPTag = document.createElement("p");
      informationPTag.textContent = place.place_name;
      aTag.appendChild(informationPTag);

      const storeNumber = document.createElement("p");
      storeNumber.textContent = place.phone;
      aTag.appendChild(storeNumber);

      const addressPTag = document.createElement("p");
      addressPTag.textContent = place.address_name;
      aTag.appendChild(addressPTag);

      locationStoreUl.appendChild(storeList);
    });

    let index = 0;
    const maxSlide = locationStoreUl.childElementCount;
    const slideView = 4;
    const maxIndex = maxSlide - slideView;

    // 슬라이드 이벤트 리스너
    previousButton.addEventListener("click", () => {
      index--;
      slideApply();
      nextButton.classList.remove("hidden");
      if (index === 0) previousButton.classList.add("hidden");
    });

    nextButton.addEventListener("click", () => {
      index++;
      slideApply();
      previousButton.classList.remove("hidden");
      if (index === maxIndex) nextButton.classList.add("hidden");
    });

    // 슬라이드 적용 함수
    function slideApply() {
      const width = window.innerWidth;
      locationStoreUl.style.transform = `translateX(-${317 * index}px)`;
      Array.from(locationStoreUl.children).forEach((child, i) => {
        if (width >= 1366) {
          child.style.opacity =
            i >= index && i < index + slideView ? "1" : "0.2";
        } else {
          child.style.opacity = i >= index && i < index + slideView ? "1" : "0";
        }
      });
    }

    slideApply(); // 초기 슬라이드 적용
  }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {
  var bounds = new kakao.maps.LatLngBounds();

  // 지도에 표시되고 있는 마커를 제거합니다
  removeMarker();

  // 검색 결과를 기반으로 마커를 생성하고 지도에 표시
  places.forEach((place, i) => {
    var placePosition = new kakao.maps.LatLng(place.y, place.x);
    var marker = addMarker(placePosition, i);
    bounds.extend(placePosition);

    // 마커와 검색 결과 항목에 마우스 오버 이벤트 추가
    kakao.maps.event.addListener(marker, "mouseover", function () {
      displayInfowindow(marker, place.place_name);
    });
    kakao.maps.event.addListener(marker, "mouseout", function () {
      infowindow.close();
    });
  });

  // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  map.setBounds(bounds);
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx) {
  var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png",
    imageSize = new kakao.maps.Size(36, 37),
    imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691),
      spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
      offset: new kakao.maps.Point(13, 37),
    },
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
    marker = new kakao.maps.Marker({
      position: position,
      image: markerImage,
    });

  marker.setMap(map);
  markers.push(marker);

  return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
  markers.forEach((marker) => marker.setMap(null));
  markers = [];
}

// 인포윈도우를 표시하는 함수입니다
function displayInfowindow(marker, title) {
  infowindow.setContent(
    '<div style="padding:5px;font-size:12px;">' + title + "</div>"
  );
  infowindow.open(map, marker);
}
