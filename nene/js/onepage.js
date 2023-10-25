//  1. scroll이 실행될때마다 애니메이션이 실행이 되어야한다.(가속도, 애니메이션이 실행되는 시간)
//  2. 스크롤 이벤트리스너가 실행이 되고 있으면 실행되는동안에는 스크롤 이벤트리스너가 연속적으로 실행이 되어서는 안된다. ***
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

const sections = document.querySelectorAll('body>section');
const header = document.querySelector('header');
const footer = document.querySelector('footer');
let index=0; // 현재페이지
let moveState = false;
// console.log(header);


window.addEventListener('mousewheel', (e) => {
    e.preventDefault();
    // addEventListener가 실행이 될때, moveState가 true가 되고, true가 되면서 스크롤이 시작이 된다. 근데 이것을 setTimeOut으로 통제를 한다.
    if(!moveState){

        moveState=true;
        setTimeout(() => {
            moveState=false;
        }, 500);
        
        
        
        // console.log(sections.length);
        if(window.scrollY < (sections.length)*window.innerHeight){   
            e.preventDefault();
            
            if (e.deltaY > 0) {
                index++;
                // 아래로 스크롤하는 경우
                window.scrollTo({top:index*window.innerHeight,left:0,behavior:"smooth"});
                if(index > sections.length) {
                    index = sections.length;
                }
                
            } else if (e.deltaY < 0) {
                // 위로 스크롤하는 경우
                index--;
                window.scrollTo({top:index*window.innerHeight,left:0,behavior:"smooth"});
                if (index < 0) {
                    index = 0;
                }
            }
        } else if (window.scrollY > (sections.length)*window.innerHeight) {
            
            
            if (e.deltaY > 0) {
                // 아래로 스크롤하는 경우
                window.scrollTo({top: index*window.innerHeight + footer.clientHeight,left:0,behavior:"smooth"});
                
            } else if (e.deltaY < 0) {
                // 위로 스크롤하는 경우
                window.scrollTo({top: index*window.innerHeight,left:0,behavior:"smooth"});
                header.classList.remove('active');
            }
            
        } else if (window.scrollY = (sections.length)*window.innerHeight) {
            if (e.deltaY > 0) {
                // 아래로 스크롤하는 경우
                window.scrollTo({top: index*window.innerHeight + footer.clientHeight,left:0,behavior:"smooth"});
                header.classList.add('active');
                
            } else if (e.deltaY < 0) {
                // 위로 스크롤하는 경우
                index--;
                window.scrollTo({top: index*window.innerHeight,left:0,behavior:"smooth"});
                
            }
        }
        }
        
        
        
        
        // console.log('indexText : ' + Math.floor(window.scrollY / window.innerHeight))
        // console.log(window.scrollY)
        // console.log((sections.length-1)*window.innerHeight)
        
        
        
        // console.log(index);
        

        
        
    },{passive: false})
    
    // window.scrollY = (sections.length-1) * window.innerHeight 인 상황에서, e.deltaY > 0 일때 footer.clinetHeight 만큼 내려가고, e.deltaY < 0 일때 index --; 를하고 index*window.innerHeight 만큼 올라가게 한다.
    // index의 범위는 음수보다 크고 sections.length까지 올라오게 만든다.