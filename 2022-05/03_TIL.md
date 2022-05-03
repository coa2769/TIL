# 05월 03일

> 블로킹vs논블로킹, 동기vs비동기

---

# 블로킹vs논블로킹, 동기 vs 비동기

# 1. 미리 알아야할 지식

- **제어권** : 자신(함수)의 코드를 실행할 권리를 뜻한다. 제어권을 가진 함수는 자신의 코드를 끝까지 실행한 후, 자신을 호출한 함수에게 돌려준다.
- **결과값을 기다린다는 것** : A함수에서 B함수를 호출할 때, A함수가 B함수의 결과값을 기다리느냐의 여부를 의미한다.

# 2. Blocking(블로킹)과 Non-blocking(논블로킹)

A함수가 B함수를 호출했을 때, **제어권을 어떻게 처리하느냐**에 따라 달라진다.

## 2.1. Blocking(블로킹)

A함수가 B함수를 호출하면서, 제어권을 A가 호출한 B함수에 **넘겨준다.**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7ba33833-287a-4144-bf59-24cb482afc42/Untitled.png)

1. A함수가 B함수를 호출하면 B에게 제어권을 넘긴다.
2. 제어권을 넘겨받은 B는 열심히 함수를 실행한다. A는 B에게 제어권을 넘겨주었기 때문에 함수 실행을 잠시 멈춘다.
3. B함수는 실행이 끝나면 자신을 호출한 A에게 제어권을 돌려준다.

## 2.2. Non-blocking(논블로킹)

A함수가 B함수를 호출해도 제어권은 **그대로 자신이 가지고 있는다.**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6663a604-0d95-4330-9d4e-968d52c05bf0/Untitled.png)

1. A함수가 B함수를 호출하면, B 함수는 실행되지만, **제어권은 A 함수가 그대로 가지고 있는다.**
2. A함수는 계속 제어권을 가지고 있기 때문에 B함수를 호출한 이후에도 자신의 코드를 계속 실행한다.

# 3. **Synchronous(동기)와 Asynchronous(비동기)**

동기와 비동기의 차이는 **호출되는 함수의 작업 완료 여부를 신경쓰는지의 여부** 의 차이이다.

## 3.1. Synchronous(동기)

함수 A가 함수 B를 호출한 뒤, **함수 B의 리턴값을 계속 확인하면서 신경쓰는 것** 이 동기이다.

## 3.2. **Asynchronous(비동기)**

함수 A가 함수 B를 호출할 때 **콜백 함수를 함께 전달**해서, 함수 B의 작업이 완료되면 함께 보낸 콜백 함수를 실행한다.

함수 A는 함수 B를 호출한 후로 **함수 B의 작업 완료 여부에는 신경쓰지 않는다.**

# **4. 블로킹과 논블로킹, 동기와 비동기 비교**

## 4.1. **Sync-Blocking**

동기를 블로킹처럼 실행.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c8684d50-0ead-44f5-93d7-aa13da4b76e0/Untitled.png)

함수 A는 함수 B의 리턴값을 필요로 한다(**동기**). 그래서 제어권을 함수 B에게 넘겨주고, 함수 B가 실행을 완료하여 리턴값과 제어권을 돌려줄때까지 기다린다(**블로킹**).

## 4.2. **Sync-Nonblocking**

동기를 논블로킹처럼 실행.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/728fd823-a576-4d87-9d9c-b348ab1aac08/Untitled.png)

A 함수는 B 함수를 호출한다. 이 때 **A 함수는 B 함수에게 제어권을 주지 않고**, 자신의 코드를 계속 실행한다(**논블로킹**).

그런데 **A 함수는 B 함수의 리턴값이 필요하기 때문**에, 중간중간 B 함수에게 함수 실행을 완료했는지 물어본다(**동기**).

## 4.3. **Async-Nonblocking**

비동기를 논블로킹처럼 실행.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5afcc7c6-3a31-443f-9a20-91b29a646953/Untitled.png)

이 때 제어권을 B 함수에 주지 않고, 자신이 계속 가지고 있는다(**논블로킹**). 따라서 B 함수를 호출한 이후에도 멈추지 않고 자신의 코드를 계속 실행한다.

그리고 B 함수를 호출할 때 **콜백함수**를 함께 준다. B 함수는 자신의 작업이 끝나면 A 함수가 준 콜백 함수를 실행한다(**비동기**).

## 4.4. **Async-blocking**

비동기를 블로킹처럼 실행.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f846b201-abfc-4979-8b50-aa7288e1ead0/Untitled.png)

A 함수는 B 함수의 리턴값에 신경쓰지 않고, 콜백함수를 보낸다(**비동기**).

그런데, B 함수의 작업에 관심없음에도 불구하고, A 함수는 B 함수에게 제어권을 넘긴다(**블로킹**).

따라서, A 함수는 자신과 관련 없는 B 함수의 작업이 끝날 때까지 기다려야 한다.

### reference

아래 내용을 그대로 가져옴.

[블로킹 Vs. 논블로킹, 동기 Vs. 비동기](https://velog.io/@nittre/블로킹-Vs.-논블로킹-동기-Vs.-비동기)