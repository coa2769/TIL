# 02월 01일

> 공부했던 HTML 내용 정리

## 스크립팅 요소

### <script>

JavaScript 코드 또는 파일을 HTML 문서에 작성하거나, 연결할 때 사용한다.

[: 스크립트 요소 - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/script)

```html
<script src="js/app.js"></script>

<script>
  // JavaScript 코드
  console.log('JavaScript 코드를 실행했습니다.');
  console.log(document.characterSet);
  console.log(document.doctype);
</script>
```

### <noscript>

사용자의 웹 브라우저 환경에서 스크립트를 지원되지 않거나, 스크립트가 꺼져있는 경우, 문서에 표시될 문구를 삽입한다.

```html
<noscript>
  <p>JavaScript를 지원하지 않습니다.</p>
</noscript>
```

### <canvas>

JavaScript를 사용하여 그래픽(비트맵)을 그릴 때 사용한다.

`<canvas>` 요소로부터 2D 또는 WebGL 컨텍스트 객체를 추출해 그래픽을 그릴 수 있다.

[: 그래픽 캔버스 요소 - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/canvas)

```html
<canvas width="800" height="600"></canvas>

<script>
  // canvas 드로잉
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  ctx.translate(200, 40);
  ctx.beginPath();
  ctx.moveTo(180, 175);
  ctx.fillStyle = '#ff0';
  ctx.arc(180, 175, 60, Math.PI * -0.35, Math.PI * -1.05, true);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(190, 190);
  ctx.fillStyle = '#ff0';
  ctx.arc(190, 190, 100, Math.PI * -0.35, Math.PI * 0.95);
  ctx.fill();
</script>
```

https://developer.mozilla.org/ko/docs/Web/HTML/Element/dialog)