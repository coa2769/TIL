# Container 명령어
- container 실행
    ```powershell
        docker start [container 이름]
    ```
- container에 쉘 접속
    ```bash
        docker exec -it some-mysql bash
    ```
---
# Docker의 mysql container 명령어

[docker mysql 공식문서](https://hub.docker.com/_/mysql)
[docker 공식 문서](https://docs.docker.com/)

- mysql image를 빌드하여 container 생성 & 실행
    ```powershell
        docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d -p 3306:3306 mysql
    ```
- container에서 mysql 접속
    ```powershell
        mysql -h localhost -u root -p
    ```

---
# Docker의 mariadb container 명령어

[docker image의 tag에 대한 포스트](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=alice_k106&logNo=220462660147)
[docker mariadb 공식문서](https://hub.docker.com/_/mariadb)

### 버전에서 rc 란?
최종 릴리즈 혹은 출시 후보. 
정식 출시전 마지막 베타를 보통 RC라고 지칭한다.
[오픈 소스 버전에서 Beta, RC, Nighty란?](https://web-front-end.tistory.com/24)

### docker mariadb 버전에서 focal란?
우분투 20.04 LTS 코드테임이 focal fossa이다. 해당 버전의 우분투를 사용했다는 뜻인지는 모르겠지만 이를 인용한 것 같다.
뜻은 '중심의' '초점의'라는 뜻이다.
[우분투 릴리즈별 코드명](https://wiki.ubuntu-kr.org/index.php/%EC%9A%B0%EB%B6%84%ED%88%AC_%EB%A6%B4%EB%A6%AC%EC%A6%88%EB%B3%84_%EC%BD%94%EB%93%9C%EB%AA%85)

- 공식 사이트에서 mariadb 다운로드
 : 설치한 버전 : 10.7.3 (2022-03-05 당시 가장 최근에 사용되는 안정화 버전)
```
    docker pull mariadb:10.7.3
```

- mariadb image를 빌드하여 container 생성 & 실행
```
    docker run --detach --name some-mariadb --env MARIADB_ROOT_PASSWORD=qwe123 --p 3306:3306 mariadb:10.7.3


    docker run --detach --name [생성할 container 이름] --env MARIADB_ROOT_PASSWORD=[root 비밀번호] --p 3306:3306 [image 이름]
```

- container에서 mariadb 접속
: mariadb는 mysql과 명령어가 같다.
    ```powershell
        mariadb -h localhost -u root -p
    ```

---
# DB의 명령어
- table 출력
    ```powershell
        DESC [테이블 명];
    ```
- 현재 사용할 DB 선택 
    ```sql
        USE [DB 이름]
    ```
- 현재 DB에 있는 TABLE들
    ```sql
        SHOW TABLES;
    ```


# 트러블 슈팅
# 4. 그 외 트러블 슈팅

- node.js에서 import 사용하는 방법
    
    [Node.js 에서 import/export 사용하기](https://velog.io/@ohzzi/Node.js-%EC%97%90%EC%84%9C-importexport-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
    
- nvm use 명령어에서 status 1 에러 날때
    
    [[Error] nvm use 입력 시 exit status 1 오류](https://velog.io/@jiyeah3108/Error-nvm-use-exit-status-1)
    
- ES6에서는 바로 사용할 수 없는 __dirname 사용법
    
    [[Tip] ReferenceError: __dirname is not defined](https://codenbike.tistory.com/221)
    
- typedi 모듈 사용하는 방법
    
    [[Javascript] 의존성주입: TypeDI](https://m.blog.naver.com/sssang97/222037090129)
    
- mariadb 사용자 생성(연결할 때 root로 접근이 안되는 듯 하다)
    
    [](https://www.codingfactory.net/11336)
    
- mariadb 에 접속할 때 주의 할 점
    - 해당 user가 접근하려는 DB에 권한이 있는지 확인한다.
    - 해당 user로 다른 client 또는 terminal에서 접속하고 있는지 확인한다.(중복 접속 안됨)