window.addEventListener('mousewheel', (e) => {

    if (e.wheelDelta > 0) {
        if (window.scrollY === 0 ) {
            e.preventDefault();
        }
    } else {
        //마우스휠 아래로

        if (window.scrollY === 0 ) {
            e.preventDefault();

        }
    }
    console.log(e);
    console.log(innerHeight);





}, { passive: false })