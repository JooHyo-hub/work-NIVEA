$(document).ready(function(){
    //--액티브 네비게이션 이벤트
    function toggleNav() {
        const $navWrap = $('.nav_active_wrap');
        const $headerIcons = $('.header_Icon_Wrap span');
        const $submenu = $('.active_submenu');
    
        if ($navWrap.css('right') === '0px') {
            $navWrap.css('right', '-400px');
            $headerIcons.removeClass('x'); // 원래 모양으로 복원
            $submenu.slideUp();
        }
        else {
            $navWrap.css('display', 'block'); // 먼저 display를 block으로 설정
            setTimeout(() => {
                $navWrap.css('right', '0px'); // 슬라이드 애니메이션 시작
            }, 10); // 약간의 지연 후 애니메이션 시작
            $headerIcons.addClass('x'); // X 모양으로 변경
        }
    }
    
    function initializeNav() {
        const $navWrap = $('.nav_active_wrap');
    
        $navWrap.css({
            'position': 'fixed',
            'top': '0',
            'right': '-400px', // 슬라이드 효과를 위해 초기 위치 설정
            'transition': 'right 0.5s ease' // 애니메이션 효과
        });
    
        // 이벤트 바인딩 (이벤트 위임 사용)
        $('.header_Icon_Wrap').off('click').on('click', toggleNav);
        $('.close_icon_wrap').off('click').on('click', () => {
            $navWrap.css('right', '-400px');
            $('.header_Icon_Wrap span').removeClass('x'); // 원래 모양으로 복원
        });
    }
    
    $(window).on('resize', function() {
        if ($(window).width() <= 980) {
            initializeNav();
        }
        else {
            $('.nav_active_wrap').css('right', '-400px').css('display', 'none');
            $('.header_Icon_Wrap').off('click'); // 클릭 이벤트 제거
            $('.close_icon_wrap').off('click'); // 클릭 이벤트 제거
        }
    });

    //초기 실행
    if ($(window).width() <= 980) {
        initializeNav();
    }
    
    // 서브메뉴 드롭다운 이벤트
    $('.active_mainmenu').click(function() {
        const $submenu = $(this).siblings('.active_submenu');
    
        if ($submenu.is(':visible')) {
            $submenu.slideUp();
        }
        else {
            $('.active_submenu:visible').slideUp(); // 다른 메뉴가 보이면 닫기
            $submenu.slideDown(); // 클릭한 메뉴의 서브메뉴 슬라이드 다운
        }
    });

    //로그인 아이콘 링크 삭제
    function updateLoginLink() {
        if ($(window).width() <= 980) {
            $('.header_Icon_Wrap .login_Icon a').attr('href', '#');
        }
        else {
            // 원래 링크로 복원 (필요 시)
            $('.header_Icon_Wrap .login_Icon a').attr('href', 'login.html');
        }
    }

    // 초기 실행
    updateLoginLink();

    // 리사이즈 이벤트에 바인딩
    $(window).on('resize', function() {
        updateLoginLink();
    });



    //--네비게이션 이벤트
    let $nav = $("nav");
    let $mainmenu = $(".mainmenu li>a");
    let $submenu = $(".submenu");

    $mainmenu.mouseenter(function(){
        $submenu.stop().slideDown(300);
    });
    $nav.mouseleave(function(){
        $submenu.slideUp(300);
    });
});