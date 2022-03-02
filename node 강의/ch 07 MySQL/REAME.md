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