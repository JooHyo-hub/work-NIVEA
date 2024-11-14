$(document).ready(function(){

    //상품 상세 정보 토글
    let $toggleBox = $(".toggle_box");

    $toggleBox.click(function(){
        $(this).find(".explanation").toggle();
    });

    //상품 수량 버튼 기능
    let countBtn = document.querySelector('.count_btn');
    let addIcon = document.querySelector('.add_icon');
    let exceptIcon = document.querySelector('.except_icon');

    addIcon.addEventListener('click', function() { //수량 증가
        let currentCount = parseInt(countBtn.textContent);  //수량 텍스트를 가져와 숫자로 변환

        if (currentCount < 20) {
            countBtn.textContent = currentCount + 1;
        }
    });

    exceptIcon.addEventListener('click', function() { // 수량 감소
        let currentCount = parseInt(countBtn.textContent);

        if (currentCount > 1) {
            countBtn.textContent = currentCount - 1;
        }
    });

    //관심 예상 상품 영역
    //클릭 이벤트
    let listWrap = document.querySelector('.user_favorit_list_wrap');
    let favoritLists = document.querySelectorAll('.favorit_list');
    let preBtn = document.querySelector('.pre_btn');
    let nextBtn = document.querySelector('.next_btn');

    let currentIndex = 0;
    let itemWidth = favoritLists[0].offsetWidth; // 첫 번째 아이템의 너비

    let startX; // 드래그 시작 X 좌표
    let isDragging = false; // 드래그 상태 플래그

    function updateListPosition() {
        listWrap.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    }

    nextBtn.addEventListener('click', function() {
        if (currentIndex < 2) {
            currentIndex++; // 인덱스를 증가
            updateListPosition(); // 위치 업데이트
        }
    });

    preBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--; // 인덱스를 감소
            updateListPosition(); // 위치 업데이트
        }
    });

    //마우스 드래그 이벤트
    listWrap.addEventListener('mousedown', function(e) {
        startX = e.pageX; // 드래그 시작 위치 저장
        isDragging = true; // 드래그 상태 설정
        listWrap.style.transition = 'none'; // 전환 효과 제거
    });

    listWrap.addEventListener('mousemove', function(e) {
        if (!isDragging) return; // 드래그 중이 아닐 경우 종료

        const xDiff = e.pageX - startX; // 드래그한 거리 계산

        if (xDiff < -50 && currentIndex < 2) {
            // 왼쪽으로 드래그
            currentIndex++;
            updateListPosition();
            isDragging = false; // 드래그 종료
        }
        else if (xDiff > 50 && currentIndex > 0) {
            // 오른쪽으로 드래그
            currentIndex--;
            updateListPosition();
            isDragging = false; // 드래그 종료
        }
    });

    listWrap.addEventListener('mouseup', function() {
        isDragging = false; // 드래그 종료
        listWrap.style.transition = 'transform 0.5s ease'; // 다시 전환 효과 추가
    });

    listWrap.addEventListener('mouseleave', function() {
        isDragging = false; // 드래그 종료
        listWrap.style.transition = 'transform 0.5s ease'; // 다시 전환 효과 추가
    });
});