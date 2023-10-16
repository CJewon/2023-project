//  1. scroll이 실행될때마다 애니메이션이 실행이 되어야한다.(가속도, 애니메이션이 실행되는 시간)
//  2. 스크롤 이벤트리스너가 실행이 되고 있으면 실행되는동안에는 스크롤 이벤트리스너가 실행이 되어서는 안된다.
//  3. footer.getBoundingRect().top - innerHeight값이 0보다 작거나 같을때? window.scrollY 값이 innerHeight가 아닌 footer.clientHeight 만큼 증감소하게 해준다.
//  4. footer.getBoundingRect(). - innerHeight값이 0일때 window.scrollY 값이 innerHeight가 아닌 footer.clientHeight 만큼 증감소하게 해준다.
//  5. 만약 위와 같은 방법으로 코딩을 한다면 footer.getBoundingRect().top - innerHeight === 0 일때 두개의 이벤트 리스너가 겹칠수도 있다. 이에 대한 해결방법은 ????
//  
//
//
//
//
//
//  마지막 footer은 길이가 다르므로 footer 길이만큼 한번의 스크롤을 통해 footer를 다 보여주게하고, header가 사라지게 만든다.

window.addEventListener('mousewheel', (e) => {
    if (e.deltaY > 0) {
        // 아래로 스크롤하는 경우
        window.scrollBy(0, innerHeight);
    } else if (e.deltaY < 0) {
        // 위로 스크롤하는 경우
        window.scrollBy(0, -innerHeight);
    }

})