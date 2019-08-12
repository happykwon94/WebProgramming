// onload funtion
window.onload = function() {
  cycle();
  reload_Review();
  initialize()
}

// -------------------------- ImageSlide -------------------------------------
var slideIndex = 0;

function cycle() {
  plusSlides(1);
  setTimeout(cycle, 5000);
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// dropdown
function clickDropdownList(target) {
  smoothScroll(target);
  document.getElementById("check").checked = false;
}

// Menu bar onclick scroll
window.smoothScroll = function(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = -64;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 12);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

// modal
function openModal() {
  document.getElementById('myModal').style.display = "block";
}

function closeModal() {
  document.getElementById('myModal').style.display = "none";
}

var modalIndex = 0;

function plusDivs(n) {
  var x = document.getElementsByClassName("modal-image");
  if (x[(modalIndex+n)%x.length].classList.contains("modal-show") === false) {
    plusDivs((n+1)%x.length);
  }
  else {
    showDivs(modalIndex += n);
  }
}

function minusDivs(n) {
  var x = document.getElementsByClassName("modal-image");
  if (x[(modalIndex+n) % x.length].classList.contains("modal-show") === false) {
    minusDivs((n-1)%x.length);
  }
  else {
    showDivs(modalIndex += n);
  }
}

function currentDiv(n) {
  showDivs(modalIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("modal-image");
  if (n >= x.length) {modalIndex %= x.length}
  if (n < 0) {
    modalIndex += x.length;
    modalIndex %= x.length;
  }
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  x[modalIndex].style.display = "block";
}

function removeModalImage(n) {
  var x = document.getElementsByClassName("modal-image");
  x[n].classList.remove("modal-show");
}

// ----------------------------- review ----------------------------------
// 서버로 데이터를 보내서 저장하고 업데이트시 다시 불러온다.
function append_Review(){
  // php로 보내서 처리
  var writer = document.getElementById("writer");
  var comment = document.getElementById("comment");

  if(writer.value.trim() == "" || comment.value.trim() == ""){
    alert("잘못된 입력입니다.");
  }
  else {
    $.post("TP_php.php", {
      user: writer.value,
      comment: comment.value
    }, function(data){
      if(data*1 != 0){
        alert("저장이 완료되었습니다.");
        reload_Review();
        writer.innerHTML = "";
        comment.innerHTML = "";
      }
      else{
        alert("저장에 실패하였습니다.");
      }
    });
  }
}

function reload_Review(){
  //기존 값 초기화
  var myNode = document.getElementById("reviewNote-append-ta");
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }

  $.post("TP_php_reload_Review.php",{
  },function(data){
      if(data == ""){
        var my_tbody = document.getElementById("reviewNote-append-ta");
        var row1 = my_tbody.insertRow(my_tbody.rows.length);
        var cell1 = row1.insertCell(0);
        cell1.innerHTML = "리뷰가 없습니다.";
      }
      else{
        // 배열 형태로 글 삽입
        var splitData = data.split('|');

        for(var i = 0; i < splitData.length-1; i = i+2){
          var my_tbody = document.getElementById("reviewNote-append-ta");
          var row1 = my_tbody.insertRow(my_tbody.rows.length);
          var cell1 = row1.insertCell(0);
          var cell2 = row1.insertCell(1);

          cell1.innerHTML = "<img src=images/Notice_Icon.png width=40px height=40px><br>" + splitData[i];
          cell1.style.width = "200px";
          cell1.style.borderTopLeftRadius = "1em";

          cell2.innerHTML = splitData[i+1];
          cell2.style.width = "600px";
          cell2.style.textAlign = "left";
          cell2.style.borderTopRightRadius = "1em";
      }
    }
  });
}

//  --------------------------------------- 위치 소개 ---------------------------------------------
// google map
function initialize() {

  var mapLocation = new google.maps.LatLng(36.362550, 127.349828); // 지도에서 가운데로 위치할 위도와 경도
  var markLocation = new google.maps.LatLng(36.362550, 127.349828); // 마커가 위치할 위도와 경도
  //청춘 우동 까스

  var mapLocation1 = new google.maps.LatLng(36.361969, 127.352967); // 지도에서 가운데로 위치할 위도와 경도
  var markLocation1 = new google.maps.LatLng(36.361969, 127.352967); // 마커가 위치할 위도와 경도
  // 누오보 나폴리

  var mapLocation2 = new google.maps.LatLng(36.363166, 127.344010); // 지도에서 가운데로 위치할 위도와 경도
  var markLocation2 = new google.maps.LatLng(36.363166, 127.344010); // 마커가 위치할 위도와 경도
  // 훈불

  var mapLocation3 = new google.maps.LatLng(36.361285, 127.348290); // 지도에서 가운데로 위치할 위도와 경도
  var markLocation3 = new google.maps.LatLng(36.361285, 127.348290); // 마커가 위치할 위도와 경도
  // 시멘트

  var mapLocation4 = new google.maps.LatLng(36.363116, 127.348446); // 지도에서 가운데로 위치할 위도와 경도
  var markLocation4 = new google.maps.LatLng(36.363116, 127.348446); // 마커가 위치할 위도와 경도
  // 코니스

  var mapOptions = {
    center: mapLocation, // 지도에서 가운데로 위치할 위도와 경도(변수)
         mapTypeId: google.maps.MapTypeId.ROADMAP,
         zoom: 18, // 지도 zoom단계
       };

       var mapOptions1 = {
         center: mapLocation1, // 지도에서 가운데로 위치할 위도와 경도(변수)
         mapTypeId: google.maps.MapTypeId.ROADMAP,
         zoom: 18, // 지도 zoom단계
       };

       var mapOptions2 = {
         center: mapLocation2, // 지도에서 가운데로 위치할 위도와 경도(변수)
         mapTypeId: google.maps.MapTypeId.ROADMAP,
         zoom: 18, // 지도 zoom단계
       };

       var mapOptions3 = {
         center: mapLocation3, // 지도에서 가운데로 위치할 위도와 경도(변수)
         mapTypeId: google.maps.MapTypeId.ROADMAP,
         zoom: 18, // 지도 zoom단계
       };

       var mapOptions4 = {
         center: mapLocation4, // 지도에서 가운데로 위치할 위도와 경도(변수)
         mapTypeId: google.maps.MapTypeId.ROADMAP,
         zoom: 18, // 지도 zoom단계
       };

       var map = new google.maps.Map(document.getElementById("map_1_1"), mapOptions); // id: map_1_1, body에 있는 div태그의 id와 같아야 함
       var map1 = new google.maps.Map(document.getElementById("map_1_2"), mapOptions1); // id: map_1_1, body에 있는 div태그의 id와 같아야 함
       var map2 = new google.maps.Map(document.getElementById("map_1_3"), mapOptions2); // id: map_1_1, body에 있는 div태그의 id와 같아야 함
       var map3 = new google.maps.Map(document.getElementById("map_2_1"), mapOptions3); // id: map_1_1, body에 있는 div태그의 id와 같아야 함
       var map4 = new google.maps.Map(document.getElementById("map_2_2"), mapOptions4); // id: map_1_1, body에 있는 div태그의 id와 같아야 함

       var size_x = 15; // 마커로 사용할 이미지의 가로 크기
       var size_y = 20; // 마커로 사용할 이미지의 세로 크기

       // 마커로 사용할 이미지 주소
       var image = new google.maps.MarkerImage('images/marker11.png',
                           new google.maps.Size(size_x, size_y),
                           new google.maps.Point(0, 0),
                           new google.maps.Point(0, 0),
                           new google.maps.Size(size_x, size_y));

       var marker, marker1, marker2, marker3, marker4, marker5;

       marker = new google.maps.Marker({
              position: markLocation, // 마커가 위치할 위도와 경도(변수)
              map: map,
              icon: image, // 마커로 사용할 이미지(변수)
              title: '청춘우동까스' // 마커에 마우스 포인트를 갖다댔을 때 뜨는 타이틀
       });
       marker.setVisible(true);

       marker1 = new google.maps.Marker({
              position: markLocation1, // 마커가 위치할 위도와 경도(변수)
              map: map1,
              icon: image, // 마커로 사용할 이미지(변수)
              title: '누오보 나폴리' // 마커에 마우스 포인트를 갖다댔을 때 뜨는 타이틀
       });
      marker1.setVisible(true);

       marker2 = new google.maps.Marker({
              position: markLocation2, // 마커가 위치할 위도와 경도(변수)
              map: map2,
              icon: image, // 마커로 사용할 이미지(변수)
              title: '훈불' // 마커에 마우스 포인트를 갖다댔을 때 뜨는 타이틀
       });
      marker2.setVisible(true);

       marker3 = new google.maps.Marker({
              position: markLocation3, // 마커가 위치할 위도와 경도(변수)
              map: map3,
              icon: image, // 마커로 사용할 이미지(변수)
              title: '시멘트' // 마커에 마우스 포인트를 갖다댔을 때 뜨는 타이틀
       });
      marker3.setVisible(true);

       marker4 = new google.maps.Marker({
              position: markLocation4, // 마커가 위치할 위도와 경도(변수)
              map: map4,
              icon: image, // 마커로 사용할 이미지(변수)
              title: '코니스' // 마커에 마우스 포인트를 갖다댔을 때 뜨는 타이틀
       });
      marker4.setVisible(true);
}
