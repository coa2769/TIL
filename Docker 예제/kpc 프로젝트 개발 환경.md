### fcs 개발 환경

- docker로 현재 pc에서 linux로 된 개발 환경을 만든다.
  - volume 으로 pc와 linux 개발 환경이 폴더를 바인딩한다.

- docker-compose 는 여러 docker container를 한 틀에서 관리해주는 툴이다.(쿠버네티스 대신 사용)



ftp로 빌드된 파일 업로드

### fcs node 서버

- **빌드된 view 파일들은 nginx의 build 폴더에 있는다.**
  - **nginx가 빌드된 view파일을 배포해준다.**
- admin, user는 api 애플리케이션이다.



### 검색해 볼 키워드 or URL

wsl2, wsl2 docker, nginx 프록시 서버 구축, postman api 문서, postman 주요 기능, wsl2 도커 마운트,

wsl2 vscode docker

https://choisiel.tistory.com/14

https://prup.tistory.com/56?category=991225

https://ichi.pro/ko/wsl2ui-docker-deseukeutob-pail-siseutem-honhab-munje-185499047664418



### 1. WSL2에서 Docker Container 실행

[설치 후 실행 방법](https://www.44bits.io/ko/post/wsl2-install-and-basic-usage)

[공식문서](https://docs.microsoft.com/ko-kr/windows/wsl/tutorials/wsl-containers)

[ms 공식문서](https://docs.microsoft.com/ko-kr/visualstudio/docker/tutorials/use-docker-compose#create-the-compose-file)

- window에서 프로젝트를 개발하고 해당 파일을 Dockerfile작성 후 docker로 빌드 후 실행 하면 linux에서 docker가 실행되는 것과 같지 않나?

[docker container 명령어](https://snowdeer.github.io/docker/2018/01/03/docker-launch-container-from-image/)

- window -> docker desktop을 깔면 자동으로 깔려서 사용 가능
- linux -> docker설치 후 docker-compose를 설치하면 된다.





### 2. DB 관련 설정

[mariaDB 접속 방법](https://kitty-geno.tistory.com/55)



```yaml
  nginx:
    image: nginx:1.16.1
    container_name: nginx
    networks:
      mynet:
        ipv4_address: 172.28.0.2
    ports:
      - 80:80
      - 8443:8443
      - 443:443
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf
      - ./nginx/cert.pem:/etc/nginx/conf.d/cert.pem
      - ./nginx/key.pem:/etc/nginx/conf.d/key.pem
      - ./nginx/build:/usr/share/nginx/html
    restart: always
```

- host 나 다른 docker container에서 접속할 때 사용되는 것이 아닌 외부에서 해당 docker container에 접속할 때 entworks>myney>ipv4_address 설정을 사용한다.

- 이미 작성된 sql파일이 있다면 heidiSQL에서 파일>sql 파일 불러오기 로 가져와서 실행하면 된다.

  - 해당 파일에서 모든 파일의 인코딩은 utf로 맞추는 아래의 코드가 꼭 필요하다.

    ```sql
    CREATE DATABASE kpc CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
    ```

    

### vscode에서 docker 원격 접속

[공식문서](https://docs.microsoft.com/ko-kr/learn/modules/use-docker-container-dev-env-vs-code/)



## 3. 로그인 과정



### postman 테스트

0. postman 문서 작성

1. 로컬 테스트

2. Docker 테스트

3. 무료 클라우드에 올려서 테스트

   

한 api를 각 환경에서 테스트한다.



### 개발 환경 설정 순서

1. docker 와 무료 클라우드 환경을 구축한다.
   1. 서버, db, front, back 프로젝트 각각 구축
2. 화면 설계에 따라 DB 설계
3. api 문서 작성(postman 활용)

### 개발 순서

1. DB 구축
2. API 문서 작성
3. API 구현 & 각 API마다 테스트 (로컬, Docker, 무료 클라우드 환경에서 각각 테스트)
4. 이후 화면 구현



### passport 관련

https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=pjok1122&logNo=221565691611

https://chanyeong.com/blog/post/28

https://velopert.com/2448

### 검색해 볼 키워드

docker network, express passport jwt