# 01월 28일

> 공부했던 HTML 내용 정리

## 그룹핑 요소

> 요소를 그룹할 때 사용한다.

[HTML](https://html.spec.whatwg.org/multipage/grouping-content.html)

### <address>

사용자 or 조직에 대한 정보를 나타낼 때 사용한다.

```html
<address>
  서울특별시 강남구 삼성로 648 SM ENTERTAINMENT
  Communication Center 대표전화 <a href="tel+82262409800">02 6240 9800</a>
  대표 : 한세민, 남소영 사업자번호 <a href="<https://goo.gl/XqFuCC>" target="_blank">114 81 63109</a>
  
  <small>Copyright© &copy; 2013 SM ENTERTAINMENT Co., Ltd. ©All rights reserved.</small>  
</address>
```

### <pre>

텍스트의 공백 요소등을 그대로 보존하여 출력한다.

컴퓨터 코드, 출력, 키보드 블록을 나타내기 위해 pre요소를 code, smap, kbs 요소와 함께 사용할 수 있다.

- 사용 예

  - 이메일, 빈 줄이 표시된 단락, 글 머리표가 붙은 불로 표시된 목록 등

  - 컴포터 코드 표시 목적으로 사용.

    ```html
    <!-- JavaScript 컴퓨터 프로그래밍 코드 -->
    <p>다음은 패널(Panel) 생성자 함수(Constructor Function) 입니다.</p>
    
    <pre>
      function Panel(element, canClose, closeHandler) {
        this.element = element;
        this.canClose = canClose;
        this.closeHandler = function () { if (closeHandler) closeHandler() };
      }
    </pre>
    ```

  - ASCII 아트 표시

    ```html
    <pre>
        ____  ∧ ∧
        |＼ /(´～`)＼&lt;변화구
        |　|￣￣￣￣￣|
        |　|＝みかん＝|
         ＼|＿＿＿＿＿|
    
    </pre>
    ```

## 임베디드 요소

> HTML 문서에 끼워 넣는 이미지, 비디오, 오디오, 웹사이트, 이미지맵 같은 콘텐츠 요소이다.

### <img>

HTML 문서에 이미지를  포함한다. ([링크](https://www.notion.so/HTML-3a52dbdf55b84925aa9f3fa2dbc948e8))

- 속성
  - *src   - 이미지 파일 경로 설정*
  - *alt   - 이미지 대체 텍스트 설정*
  - *width  - 이미지 너비 설정*
  - *height - 이미지 높이 설정*
  - *usemap - 이미지 맵 연결 설정*

### *<source>*

<picture>, <audio>, <video> 에 미디어 쿼리 조건에 따라 다른 미디어 소스가 출력되도록 지정하기 위해 사용한다.

### *<picture>*

다양한 스크린 환경에 맞는 적합한 이미지를 제공하기 위해 사용된다.

0개 이상의 <source> 와 1개 이상의 <img>를 포함하는 컨테이너 요소이다.

```html
<picture>
	  <source srcset="media/image/kitten-large.png" type="image/png" media="(min-width:900px)">
	  <source srcset="media/image/kitten-medium.png" type="image/png" media="(min-width:600px)">
	  <img src="media/image/kitten-small.png" alt="웃는 고양이">
</picture>
```

- 속성
  - *media - media query를 사용할 수 있다.*
  - *type - source가 출력하는 미디어의 타입*
- <source> 요소를 사용할 수 없을 경우, <img> 요소가 화면에 표시.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4f1bf82f-ab43-4b1c-81e0-d7b569345d94/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e6f2dcd1-6c38-47a7-abcc-95e9cbefc6cd/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f4a4441a-23b0-47d1-849a-80a6121fc74d/Untitled.png)

### *<video>*

HTML문서에 동영상 콘텐츠를 포함하기 위해 사용된다.

src속성이나 <source>로 지정한 여러 개의 동영상  중 미디어 커리에 맞는 동영상 **하나**를 출력한다.

```html
<!-- video + source + track -->
<video src="media/video/holzweiler-short.mp4" poster="media/video//holzweiler-short_cover.png" controls muted='true' loop="true">
    <p>
        HTML5 <code>video</code> 요소를 지원하지 않는 구형 웹 브라우저를 사용 중입니다.
        <a href="<http://outdatedbrowser.com/ko>">최신형 브라우저로 업데이트로</a> 하세요.
    </p>
</video>
```

- 속성
  - *src    - 비디오 파일 경로*
  - *poster  - 포스터 이미지 경로*
  - *preload  - auto(기본 값) 브라우저를 미리 읽어와서 사용자 경험 향상(메타데이터 / 비디오 다운로드)에 관한 설정 [none, metadata, auto]*
  - *controls - 재생 컨트롤 표시 설정*
  - *autoplay - 자동 재생 설정*
  - *loop   - 반복 설정*
  - *muted   - 음소거 설정*

### *<audio>*

HTML문서에 동영상 콘텐츠를 포함하기 위해 사용되는 또다른 요소이다.

src속성이나 <source> 요소을 이용해 **여러개**의 동영상 소스를 출력할 수 있다.

```html
<!-- audio -->
<figure style="margin: 0;">
    <img src="media/audio/tobu-Itro_Cloud9--cover.jpg" alt="Cloud9 - Tobu & Itro" width="300" height="300">

    <figcaption>
        <audio src="media/audio/tobu-Itro_Cloud9.mp3" controls>
            <p>
                HTML5 <code>video</code> 요소를 지원하지 않는 구형 웹 브라우저를 사용 중입니다.
                <a href="<http://outdatedbrowser.com/ko>">최신형 브라우저로 업데이트로</a> 하세요.
            </p>
        </audio>
    </figcaption>

</figure>
```

- 속성
  - *src    - 오디오 파일 경로*
  - *volume  - 볼륨 조절(0.0 ~ 1.0)*
  - *muted   - 음소거 설정*
  - *poster  - 포스터 이미지 경로*
  - *preload  - 사용자 경험 향상(메타데이터 / 비디오 다운로드)에 관한 설정 [none, metadata, auto]*
  - *controls - 재생 컨트롤 표시 설정*
  - *autoplay - 자동 재생 설정*
  - *loop   - 반복 설정*

### *<track>*

비디오/오디오 재생 시, 자막을 표시한다.

default 속성을 설정하지 않을 경우, 자막 사용 안한다.

```html
<video src="media/video/The temperature of dating.mp4" controls>
  <!-- track은 서버를 구동하여 자막을 서버에서 제공받아야한다. -->
  <track kind="subtitles" src="media/video/vtt/The temperature of dating.ko.vtt" srclang="ko" label="한국어" default>
  <track kind="subtitles" src="media/video/vtt/The temperature of dating.en.vtt" srclang="en" label="영어">
  <track kind="subtitles" src="media/video/vtt/The temperature of dating.ja.vtt" srclang="ko" label="일본어">
</video>
```

### *<iframe>*

인라인 프레임(Inline Frame)으로 다른 HTML 페이지를 현재 문서에 포함하는 요소이다.

```html
<iframe width="560" height="315" src="<https://www.youtube.com/embed/0wlXaHmmOVc?rel=0&amp;showinfo=0>" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<iframe src="<https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12643.636820892792!2d127.01610674058901!3d37.60429582641849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbc91e5ca4f03%3A0x18820a16e406c8ea!2z7ISc7Jq47Yq567OE7IucIOyEseu2geq1rCDquLjsnYwx64-ZIDUzMC0zNg!5e0!3m2!1sko!2skr!4v1520001155674>"
    width="600" height="450" style="border: 0" allowfullscreen></iframe>
```

- 속성
  - *src       - 프레임 소스 설정*
  - *width      - 프레임 너비 설정*
  - *height      - 프레임 높이 설정*
  - *allowfullscreen - 프레임 전체화면 설정*

### *<map>*

이미지 맵(클릭 가능한 링크 영역)을 정의하기 위해 <area>와 함께 사용한다.

```html
<img src="media/image/food-in-korea-of-republic.jpg" alt="우리나라 길거리 음식 도감" usemap="#products-map">
<map name="products-map">
    <area
    shape="circle"
    coords="0,0,100"
    hreflang="en-GB"
    href="another.html"
    alt="Another Page"
    target="_blank">
</map>
```

### *<area>*

이미지의 핫스팟 지역 정의, 하이퍼링크 설정할 수 있다.

<map> 내부에서만 사용이 가능하다.

- 속성
  - *shape   - 핫스팟 모양 설정*
  - *coords  - 모양의 좌표 값 설정*
  - *href   - 하이퍼링크 주소 설정*
  - *target  - 새 창(탭) 열림 설정*
  - *alt    - 대체 텍스트 설정*
  - *hreflang - 연결된 페이지의 언어 속성 설정*
  - *download - canvas 데이터 다운로드 설정*

### *<svg>*

svg 형식으로 된 벡터 그래픽을 기술하기 위해 이용된다.

XML 마크업 언어로 작성하여 다양한 그림을 그릴 수 있다.

```html
<img src="media/image/bang-olufsen.svg" alt="SVG File">

<svg width="150" height="150" viewBox="0 0 150 150">
  <circle r="50" cx="75" cy="75" fill="#333" stroke="#900" stroke-width="4" />
</svg>
```