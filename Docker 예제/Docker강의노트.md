# Docker강의노트



## Container

- 한개의 image로 여러개의 Container를 생성할 수 있다.
- 한개의 image에서 생성된 각각의 Container는 독립적으로 구동한다.
  - 프로세스, 파일 시스템, 네트워크 까지 모두 다른 Container과 독립적으로 구동한다.
    - 그러므로 각 Container의 ip는 다르다.
  - 하나의 Container에서 이루어진 파일 시스템 수정은 다른 Conainer들에게 영향을 주지 않는다.
  - 그러므로 Container를 삭제하면 해당 Container 내부에서 수정되었던 내용들도 삭제 되므로 주의해야 한다.

## Volume

host의 특정 폴더나 파일을 Container의 폴더나 파일에 바인딩하고 싶을 때 사용된다.

- host에서 해당 파일을 수정하면 Container에 수정된 내용이 적용된다.

- -v 옵션을 붙여줘서 적용할 수 있다.

```
docker container run -d --name mynginx3 -p 8083:80 -v /home/ibmclud/workspace:/usr/share/nginx/html nginx:alpine
```


---
### reference

[도커와 쿠버네티스, 두 마리 토끼를 잡자!](https://www.youtube.com/watch?v=Ajno86DrZv8&ab_channel=IBMKoreaTV)
