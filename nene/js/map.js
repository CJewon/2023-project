// 마커를 담을 배열입니다
var markers = [];

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 27.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();  

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

// 키워드로 장소를 검색합니다
ps.keywordSearch( "구월동 네네치킨", placesSearchCB); 
// searchPlaces();

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    // ps.keywordSearch( "구월동 네네치킨", placesSearchCB); 
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
// 검색이 완료되면 데이터를 이용하여 각종 정보를 웹사이트에 표시합니다.
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);
        console.log(data);
        
        const locationStore = document.querySelector(".location_store_sec")
        const locationStoreCon = locationStore.firstElementChild;
        const locationStoreUl = document.createElement('ul');
        locationStoreUl.classList.add('location_store_ul')
        locationStoreCon.appendChild(locationStoreUl);

        for(let i = 0; i < data.length; i++) {
            const storeList = document.createElement("li") 
            storeList.classList.add('location_store_li')
            const aTag = document.createElement('a')
            aTag.setAttribute("href", "#");
            storeList.appendChild(aTag)
            
            const divImg = document.createElement('div')
            divImg.classList.add('nene_store_img')
            aTag.appendChild(divImg)
            const imgFigure = document.createElement('figure');
            divImg.appendChild(imgFigure);

            const neneImg = document.createElement('img')
            neneImg.setAttribute("src", "nene/img/neneLogo.png")
            neneImg.setAttribute("alt", "네네로고")

            imgFigure.appendChild(neneImg);
            const locationPTag = document.createElement('p')
            const locationPTagText = document.createTextNode(data[i].place_name)
            
            locationPTag.appendChild(locationPTagText)
            imgFigure.appendChild(locationPTag);

            const informationPTag = document.createElement('p')
            const informationPTagText = document.createTextNode(data[i].place_name);
            
            informationPTag.appendChild(informationPTagText);
            aTag.appendChild(informationPTag)

            const storeNumber = document.createElement('p')
            const storeNumberPTag = document.createTextNode(data[i].phone)

            storeNumber.appendChild(storeNumberPTag)
            aTag.appendChild(storeNumber)

            const addressPTag = document.createElement('p')
            const addressPTagText = document.createTextNode(data[i].address_name);

            addressPTag.appendChild(addressPTagText)
            aTag.appendChild(addressPTagText)


            locationStoreUl.appendChild(storeList);
        }
        console.log(locationStore)

        
        
        

        // 페이지 번호를 표출합니다
        // displayPagination(pagination);

    // } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

    //     alert('검색 결과가 존재하지 않습니다.');
    //     return;

    // } else if (status === kakao.maps.services.Status.ERROR) {

    //     alert('검색 결과 중 오류가 발생했습니다.');
    //     return;

    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'), 
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';
    
    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    for ( var i=0; i<places.length; i++ ) {

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
        (function(marker, title) {
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });

            itemEl.onmouseover =  function () {
                displayInfowindow(marker, title);
            };

            itemEl.onmouseout =  function () {
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

    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>'; 
    }
                 
      itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}


 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}

function createSlide(slider, slideSpeed, viewContentsCount, flexGap) {


    let index = 0 + viewContentsCount;
    let moveCheck = true;
    const gap = viewContentsCount === 1 ? 0 : flexGap;
    const contents = [];


    slider.style.position = 'relative';
    for (let i = 0; i < slider.childElementCount; i++) {
        contents[i] = slider.children[i];
        contents[i].classList.add('content');
    }
    // const sliderView = makeNode('div', 'slider-view');
    const sliderView = document.createElement('div');
    sliderView.classList.add('slider-view');

    const contentsWrapper = makeNode('div', 'contents-wrapper');
    const buttons = makeNode('div', 'buttons');
    const slidePrev = makeNode('button', 'slide-prev');
    const slideNext = makeNode('button', 'slide-next');
    slidePrev.addEventListener('click', prev)

    function prev() {
        if (moveCheck) {
            moveCheck = false;

            index--;

            위치적용(slideSpeed);
            setTimeout(() => {
                if (index < viewContentsCount) {
                    index = contents.length + viewContentsCount - 1;
                    위치적용(0);
                }
                moveCheck = true;
            }, slideSpeed);
        }

    }

    slideNext.addEventListener('click', next)

    function next() {
        if (moveCheck) {
            moveCheck = false;
            index++;
            위치적용(slideSpeed);
            setTimeout(() => {
                if (index > contents.length + viewContentsCount - 1) {
                    index = viewContentsCount;
                    위치적용(0)
                }
                moveCheck = true;
            }, slideSpeed);
        }
    }


    // setInterval(() => {
    //     next();
    // }, 5000);


    slider.appendChild(sliderView);
    sliderView.appendChild(contentsWrapper);

    for (let i = 0; i < contents.length; i++) {
        contentsWrapper.appendChild(contents[i]);
    }

    slider.appendChild(buttons);
    // buttons.appendChild(slidePrev);
    // buttons.appendChild(slideNext);
    slidePrev.innerText = "이전";
    slideNext.innerText = "다음";

    const dotButtons = makeNode('div', 'dot-buttons');

    //닷 버튼들 추가하기.
    for (let i = 0; i < contents.length; i++) {
        //4번 만들어서 각각 넣어야하기때문에 const dot 선언은 반복문 내부에서 해야한다.
        const dot = makeNode('div', 'dot');
        dotButtons.appendChild(dot);

        dot.addEventListener('click', () => {
            index = i + viewContentsCount;
            위치적용(slideSpeed);
        })
    }
    slider.appendChild(dotButtons);
    let sliderWidth = slider.clientWidth;
    const sliderHeight = slider.clientHeight;


    let contentWidth;
    사이즈지정();

    window.addEventListener('resize', 사이즈지정);

    function 사이즈지정() {
        sliderWidth = slider.clientWidth;
        contentWidth = (sliderWidth / viewContentsCount) - gap * (viewContentsCount - 1) / viewContentsCount;

        for (let i = 0; i < contentsWrapper.childElementCount; i++) {
            contentsWrapper.children[i].style.width = `${contentWidth}px`
            contentsWrapper.children[i].style.height = `${sliderHeight}px`
        }
        위치적용();
    }

    contentsWrapper.style.gap = `${gap}px`

    for (let i = contents.length - 1; i > contents.length - 1 - viewContentsCount; i--) {
        const cloneBack = contents[i].cloneNode(true);
        contentsWrapper.insertBefore(cloneBack, contentsWrapper.firstElementChild);
    }

    for (let i = 0; i < viewContentsCount; i++) {
        const clonePront = contents[i].cloneNode(true);
        contentsWrapper.appendChild(clonePront);
    }


    위치적용();





    function makeNode(tagName, className) {
        const node = document.createElement(tagName);
        node.classList.add(className);

        return node;
    }

    // function 위치적용(time) {

    //     //원래는 0~3까지
    //     //앞뒤로 1개가 늘어나면서 총 인덱스는 0~5까지가 되었고
    //     //실제 슬라이더의 인덱스는 1~4까지가 되었다.

    //     //dotButtons[4] 는 0~3까지의 범위를 가진다.
    //     //index : 5
    //     //viewCount : 1
    //     //index-viewCount = 4
    //     for (let i = 0; i < dotButtons.childElementCount; i++) {
    //         dotButtons.children[i].classList.remove('active');
    //     }
    //     if (index < viewContentsCount) {
    //         dotButtons.lastElementChild.classList.add('active');

    //     } else if (index > contents.length + viewContentsCount - 1) {
    //         dotButtons.firstElementChild.classList.add('active');
    //     }
    //     else {
    //         dotButtons.children[index - viewContentsCount].classList.add('active');
    //     }

    //     contentsWrapper.style.transform = `translateX(-${index * (contentWidth + gap)}px)`
    //     contentsWrapper.style.transition = `${time}ms`;
    //     console.log(time);
    // }

    // window.addEventListener('mousewheel', (e) => {
    //     console.log(e.deltaY);
    //     if (e.deltaY > 0) {
    //         next();
    //     } else {
    //         prev();
    //     }
    // })

}