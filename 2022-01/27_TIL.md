# 01월 27일

> 공부했던 HTML 내용 정리

## 컨테이너 요소

> 아무런 의미를 가지지 않으면서 HTML 요소를 묶는다. 그러므로 적절한 시맨틱 요소가 없을 때 사용한다. CSS로 꾸미기 전에는 콘텐츠나 레이아웃에 어떠한 영향도 주지 않는다.

### <div>

Division 요소. 블록(block) 컨테이너 이다.

```html
<article lang="en-US">
  <h2>My use of language and my cats</h2>
  <p>My cat’s behavior hasn’t changed much since her absence, except
  that she plays her new physique to the neighbors regularly, in an
  attempt to get pets.</p>
  <div lang="en-GB">
    <p>My other cat, colored black and white, is a sweetie. He followed
    us to the pool today, walking down the pavement with us. Yesterday
    he apparently visited our neighbours. I wonder if he recognizes that
    their flat is a mirror image of ours.</p>
    <p>Hm, I just noticed that in the last paragraph I used British
    English. But I’m supposed to write in American English. So I
    shouldn’t say "pavement" or "flat" or "color"...</p>
  </div>
  <p>I should say "sidewalk" and "apartment" and "color"!</p>
</article>
```

### <span>

인라인(inline) 컨테이너 이다.

- 인라인 요소들(a, strong, em, b, i 등)을 감쌀 때 사용된다.
- 블록 요소들(h1~h6, p, blockquote, section 등)을 감쌀 수 없다.

```html
<h2>
  SIX
  <span>C</span>
  <span>O</span>
  <span>L</span>
  <span>O</span>
  <span>R</span>
  <span>S</span>
</h2>
```



## 텍스트 레벨 요소

> 주로 사용되는 텍스트 시멘틱을 정리 했다. 그 외에는 아래의 url에서 확인 가능하다.

[HTML](https://html.spec.whatwg.org/multipage/text-level-semantics.html#textlevel-semantics)

### <sup>

위첨자. 기준선 위에 존재한다.

약어, 각주로 주로 사용된다.

```html
각주 <sup><a id="footnote-o-1" href="#footnote-1" title="각주(脚註, 영어: note)">[1]</a></sup>

<div class="footnote">
    <p>
        <a id="footnote-1" href="#footnote-o-1">[1]</a> 각주(脚註, 영어: note)는 본문에 대한 참조 문헌이나 본문의 낱말, 문장 등의 뜻을 알기 쉽게 풀이하는 덧붙이는 글이다.
    </p>
</div>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3c6a8fce-7084-46f6-9d70-9d097bddc92d/Untitled.png)

### <sub>

아래첨자. 기준선 아래에 존재한다.

수학 화학식에서 사용된다.

```html
H<sub>2</sub>SO<sub>4</sub>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/42388ceb-05c5-4f35-a4c0-6d98d0538c74/Untitled.png)

### <mark>

현재 맥락에 관련이 깊거나 중요해서 표시 또는 하이라이트하는 부분을 나타낸다.

검색 등의 목적에 사용된 글자를 하이라이팅 할 때 사용한다.

```html
<article>
    <h3>2장. - 최적의 각도를 찾아라</h3>
    <!-- 이미지:  -->
    <img src="images/pyramid.png" alt="파라미드(최적의 각도를 찾아라)">
    <p>
        내용은 다음과 같습니다. -고대 이집트인들은 시키드(seked)라는 특별한 각도를 사용했다. -시키드는 현대 <mark>삼각함수</mark>의 코탄젠트(cotangent)와 그 값이 같다. <mark>삼각함수</mark>와 코탄젠트라는 단어에 멈칫했을 수도 있지만, 이것을...
    </p>
    <span class="article-share">공유 <data value="0">0</data> </span>&middot;
    <span class="article-comments">댓글 <data value="0">0</data> </span> &middot;
    <cite> <time datetime="2018-02-22">Feb 22. 2018</time> by sortie</cite>
</article>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ff6fd2e0-0c96-4a2c-9943-55b377d2760d/Untitled.png)

### <abbr>

축약(addrebiation)어에 대한 설명을 적어준다.

```html
<article class="news-item">
    <h2>일본만 팔던 <abbr title="맥도날드"></abbr> 맥날 초콜릿 파이.. 오늘부터 한국서 판매</h2>
    <p>
        뉴스팀 입력
        <tiem datetime="2017-08-14T10:18">2017.08.14 10:18</tiem>
        <span class="article-comments">댓글 <data value="0">0개</data> </span>
    </p>
    <img src="images/macdonald.jpg" alt="맥도날드 초콜릿 파이">
</article>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5f0429c3-53e8-461b-8a1c-836a7a0ffdd6/Untitled.png)

### <time>

기계가 이해할 수 있는 형태로 날짜나 시간을 나타내는 요소이다.

```html
<time datetime="2018-02-22">Feb 22. 2018</time>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/05cae95c-bf4a-4bca-a736-26f5d71b0522/Untitled.png)

### <s>

이제 관계 없거나 더 이상 정확하지 않는 부분을 나타내는 텍스트에 사용되는 요소이다.

글자에 취소선(글자를 가로지르는 선)을 그린다.

```html
<ul>
    <li>
        <img src="images/cable-holder.jpg">
        <h3>
            <span class="sub-headline">마그네틱 자석 선정리 케이블홀더</span> [슈퍼특가] 자석식 선정리기 케이블 홀더
        </h3>
        <p>
            <span class="hidden-text">원래 가격</span><s>11,900원</s>
            <em>50%</em> <span class="hidden-text">할인</span> 5,900원
        </p>
        <p>
            <time datetime="2018-03-02">오늘마감</time> <data value="7">7개</data> 구매
        </p>
    </li>
</ul>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1aac54b6-0019-4806-b910-79149e75340f/Untitled.png)