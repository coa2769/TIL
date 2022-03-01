# 03월 01일

> Docker 관련 내용 정리

## WSL2를 이용한 Docker 설치

### 1. Dcoker 설치에 WSL2를 이용하는 이유는?

> Linux기반의 독립된 테스트 환경을 구축할 수 있다.

#### 1.1. WSL2 란?

![wsl1 구조](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ff28293f-2de5-44c6-850e-c0a2df1b819b/Untitled.png)

wsl1 구조

![wsl2 구조](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/90098a01-4ee1-433c-a570-ec1a324307c4/Untitled.png)

wsl2 구조

- 이전 WSL은 VM과 같이 window kernel위에 linux kernel이 올라간 구조를 갖는다.
  - 이 때문에 성능 이슈가 있었다.
- WLS2로 업데이트 된 이후 Hyper-V위에 window kernel과 linux kernel이 각각 올라간 구조이다.

#### 1.2. WSL2처럼 작동하는 Docker

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c89d4e4f-dc67-4a84-8241-578757bcd388/Untitled.png)

- WSL2를 이용하여 Hyper-V위에 Docker가 올라간 구조를 갖는다.
- Docker의 Volume 기능으로 host와 docker의 개발 중인 동일한 폴더를 바인딩 할 수 있다.
  - host에서 개발한 내용이 docker container의 폴더에 동기화 된다.
- Window PC에서 개발하며 linux kernel을 이용한 독립적인 Container들로 테스트할 수 있다.

### 2. 설치 방법

#### 2.1. WSL2 설치

1. 관리자 권한으로 PowerShell을 열고 ‘Linux용 Windows 하위 시스템’ 기능을 사용하도록 설정하는 명령어 실행

   ```powershell
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   ```

2. 관리자 권한으로 PowerShell을 열고 ‘Virtual Machine 기능’을 사용하도록 설정하는 명령어 실행

3. ProwerShell에서 ‘wsl’ 명령어를 실행해서 설치되었는지 확인한다.

4. 아래의 URL에서 ‘WSL2 Linux 커널 업데이트 패키지’를 다운로드 해서 설치한다.

   - [Updating the WSL 2 Linux Kernel](https://docs.microsoft.com/ko-kr/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package)

5. 아래 명령어를 실행하여 WSL2를 기본 버전으로설정한다.

   ```powershell
   wsl --set-default-version 2
   ```

   - 설치된 linux 목록과 사용하는 wsl버전 확인 명령어

     ```powershell
     wsl -l -v
     ```

   - linux 강제 종료 명령어(재실행됨)

     ```powershell
     wsl -t [linux 이름]
     ```

6. Microsoft Store에서 Linux 배포판을 선택하여 설치한다.

   ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e5a8134e-299b-4134-a3df-eb887c8a86de/Untitled.png)

####2.2. Hyper-V 기능 켜기

1. 제어판 > 프로그램 설치 및 제거 > Window 기능 켜기/끄기 에서 Hyper-V 옵션 체크 확인 후 리부팅(이때 ‘Linux용 Windows 하위 시스템’ 옵션도 같이 체크되어 있는지 확인한다.)

   ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/614da19d-f8a9-4afe-8400-f4cc87639dd6/Untitled.png)

#### 2.3. Docker 설치

1. ‘Docker Destop for Windows’를 Docker 공식 사이트에서 다운로드 후 실행한다.
2. ‘Install required Windows components for WSL2’ 옵션을 체크해준다.
   - WSL2를 이용한다는 뜻이다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/61528fe2-64ad-43ba-b4d7-3938b6f8846c/Untitled.png)

1. Setting > General 에서 ‘Use the WSL 2 based engine’ 옵션을 체크

   ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fbe69760-dc2a-4c11-8396-d39714419ed5/Untitled.png)

2. Setting > Resources > WSL INTEGRATION 에서 ‘Enable intagration with my default WSL distro’옵션에 체크가 되어 있는지 확인.

   - 사용할 수 있는 linux 배포판에는 On해준다.

   ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bc7d632c-eb6b-4e40-b871-016c68f533fa/Untitled.png)

------

### reference

[WSL2(Windows Subsystem for Linux 2) 설치 및 사용 방법](https://www.44bits.io/ko/post/wsl2-install-and-basic-usage)

[이전 버전 WSL의 수동 설치 단계](https://docs.microsoft.com/ko-kr/windows/wsl/install-manual)

[WSL에서 Docker 컨테이너 시작](https://docs.microsoft.com/ko-kr/windows/wsl/tutorials/wsl-containers)

---

### docker-compose 이용한 개발환경 구축

### 1. docker-compose 란?

> 여러 Docker Container를 관리하기 위해 사용하는 도구이다. (쿠버네티스 대신 사용 되는 간단한 툴이다.)

- YAML 파일을 작성하여 여러 Dockerfile을 단일 명령어로 한번에 빌드하는 것이 가능하다.
- 이렇게 한번에 관리되는 Container 들은 앱의 성요소가 된다.
  - ex) nginx 프록시 서버, node 서버, DB가 구성요소로 갔는 앱.

#####3단계 프로세스

1. 필요한 환경의 Dockerfile 작성
2. `docker-compose.yml`을 작성하여 각각의 Container에 대해 정의 작성
3. `docker-compose up` 명령어를 실행하여 Container 빌드 & 실행

### 2. docker-compose 설치 방법

#### 2.1. Window 에서 설치

docker desktop을 깔면 자동으로 깔린다.

------

### reference

[Overview of Docker Compose](https://docs.docker.com/compose/)