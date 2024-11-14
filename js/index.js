$(document).ready(function(){
    //--슬라이드 이벤트
    let currentIndex = 0; // 현재 슬라이드 인덱스
    let slides = document.querySelector('.slide_Wrap');
    let totalSlides = document.querySelectorAll('.slide_Img_Wrap').length;
    let paginationElements = document.querySelectorAll('.pagenat_element');
    let slideInterval; // 슬라이드 자동 전환을 위한 변수

    //슬라이드 이동을 위한 값 저장 함수
    function showSlide(index) {
        const offset = -index * (100 / totalSlides);    //슬라이드 이동 크기
        slides.style.transform = `translateX(${offset}%)`;  //슬라이드 이동 값
        updatePagination(index);    //해당 함수에 매개변수로 리턴
    }

    //슬라이드 이동 값 만큼(리턴을 받은 값), 페이지네이션 컬러 변경 함수
    function updatePagination(index) {
        paginationElements.forEach((element, i) => {
            element.classList.remove('color'); // 기존 색상 제거
            if (i === index) {
                element.classList.add('color'); // 현재 슬라이드에 맞는 색상 추가
            }
        });
    }

    //다음 슬라이드 재생 구현
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides; // 마지막 슬라이드에서 다시 처음으로 순환
        showSlide(currentIndex);    //해당 함수에 매개변수로 리턴
    }

    //이전 슬라이드 재생 구현
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // 이전 슬라이드로 이동
        showSlide(currentIndex);    //해당 함수에 매개변수로 리턴
    }

    //다음 슬라이드 무한반복 구현
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // 5초마다 슬라이드 전환
    }

    //슬라이드 자동 전환 멈춤 구현
    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // 페이지네이션 클릭 이벤트 추가
    paginationElements.forEach((element, index) => {
        element.addEventListener('click', () => {
            currentIndex = index; // 클릭한 페이지네이션의 인덱스를 현재 인덱스로 설정
            showSlide(currentIndex);
        });
    });

    slides.addEventListener('mouseenter', stopSlideShow);
    slides.addEventListener('mouseleave', startSlideShow);

    // 다음 슬라이드 무한반복 호출
    startSlideShow();

    // 초기 슬라이드 표시 호출
    showSlide(currentIndex);

});

