# Docker의 mysql container 명령어

[docker mysql 공식문서](https://hub.docker.com/_/mysql)
[docker 공식 문서](https://docs.docker.com/)

- mysql image를 빌드하여 container 생성 & 실행
    ```powershell
        docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d -p 3306:3306 mysql
    ```
- mysql container 실행
    ```powershell
        docker start some-mysql
    ```

- maysql container에 쉘 접속
    ```powershell
        docker exec -it some-mysql bash
    ```
- container에서 mysql 접속
    ```powershell
        mysql -h localhost -u root -p
    ```
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

# Docker의 mariadb container 명령어

[docker image의 tag에 대한 포스트](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=alice_k106&logNo=220462660147)
[docker mariadb 공식문서](https://hub.docker.com/_/mariadb)

## 버전에서 rc 란?
최종 릴리즈 혹은 출시 후보. 
정식 출시전 마지막 베타를 보통 RC라고 지칭한다.
[오픈 소스 버전에서 Beta, RC, Nighty란?](https://web-front-end.tistory.com/24)

## docker mariadb 버전에서 focal란?
우분투 20.04 LTS 코드테임이 focal fossa이다. 해당 버전의 우분투를 사용했다는 뜻인지는 모르겠지만 이를 인용한 것 같다.
뜻은 '중심의' '초점의'라는 뜻이다.
[우분투 릴리즈별 코드명](https://wiki.ubuntu-kr.org/index.php/%EC%9A%B0%EB%B6%84%ED%88%AC_%EB%A6%B4%EB%A6%AC%EC%A6%88%EB%B3%84_%EC%BD%94%EB%93%9C%EB%AA%85)

## 공식 사이트에서 mariadb 다운로드
설치한 버전 : 10.7.3 (2022-03-05 당시 가장 최근에 사용되는 안정화 버전)
```
    docker pull mariadb:10.7.3
```

## mariadb image를 빌드하여 container 생성 & 실행
```
    docker run --detach --name some-mariadb --env MARIADB_ROOT_PASSWORD=qwe123 --p 3306:3306 mariadb:10.7.3

    
    docker run --detach --name [생성할 container 이름] --env MARIADB_ROOT_PASSWORD=[root 비밀번호] --p 3306:3306 [image 이름]
```