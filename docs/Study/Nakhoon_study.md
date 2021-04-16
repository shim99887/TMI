# 210415 Jenkins Study



## Jenkins 개념

* 소프트웨어 개발 시 지속적으로 통합 서비스를 제공하는 툴
* 일상 작업을 자동화 가능
* repo에 대한 지속적인 통합과 전달 환경 구축
* 오픈소스 자동화 서버



## Jenkins 동작 방식

Jenkins는 주요 운영체제용 자바 8 WAR 아카이브와 설치 패키지, 홈브루(Homebrew) 패키지, 도커 이미지, 그리고 [소스코드](https://github.com/jenkinsci/jenkins) 형태로 사용할 수 있다. 소스코드는 대부분 자바이며, 몇 개의 그루브(Groovy), 루비(Ruby), 그리고 앤틀러(Another Tool For Language Recognition, ANTLR) 파일이 들어 있다.

Jenkins WAR를 단독으로 또는 톰캣 같은 자바 애플리케이션 서버에서 서버렛(Serverlet)으로 실행할 수 있다. 둘 가운데 어느 경우든, 웹 사용자 인터페이스(UI)를 생성하며 REST API에 대한 호출을 받아들인다.