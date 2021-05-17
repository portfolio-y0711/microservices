# Micro-services

_부제: Swappable Deployment 가능한 마이크로서비스 아키텍처 구축하기_

<br/>

![microservice](./microservice.png)

<br/>

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/8N2ZynbBZqE/0.jpg)](https://www.youtube.com/watch?v=8N2ZynbBZqE)

<br/>

목차 

* 구성요소 (Components / v1.0.0)

* 회고 (Retrospective)

* 구축 과제 (Todo / v2.0.0)

    * Service Api 분리 -> User / Feeds

    * Containerization

    * CQRS

<br/>

### 1. 구성요소 (Components)

<br/>

🚩 &nbsp; **_Service Registry_** :   

* Specification

    * Node Express + Typescript

    * Port: 7000

* 역할 / 기능

    * Registry (in-memory-store service)

<br/>

🚩 &nbsp; **_Service Gateway_** :   

* Specification

    * Node Express + Typescript

    * Port: 8000

* 역할 / 기능

    * User Authentication

    * Circuit Breaker

    * Service Finder

    * Handling CORS

<br/>

🚩 &nbsp; **_Service Api_** :   

* Specification

    * Node Express + Typescript

    * Port: 3010 <- switcheable -> 3020

* 역할 / 기능

    * REST API (user aggregate)

    * REST API (feeds aggregate)

<br/>

🚩 &nbsp; **_Service Front_** :   

* Specification

    * Node Express + Typescript

    * Port: 3333 <- switcheable -> 3334

* 역할 / 기능

    * login 화면

    * feeds 화면

    * posts 화면

    * friends 화면

<br/>

### 2. 회고 (Retrospective)

* 예전부터 마이크로서비스를 구성하고 싶은 욕구가 있었는데, 무엇보다 개인 프로젝트를 다양한 주제로 엮어 서비스 단위로 개발하고 싶었기 때문임 

* 시기별로 여러 주제, 언어를 바꾸어 학습하다보니 모노리스로 개발하면 프로젝트 중단 후 재시작할 때 컨텍스트 전환 비용이 매우 컸음

* 마이크로서비스가 안정화되면, python django나 java spring과 같은 조합을 섞어서 만들어 볼 계획임

* 이번에 경험한 바로는 containerization의 도움을 받지 않는 경우 linux 운영체제와 bash script를 잘 다룰 수 있느냐가 개발 생산성에 매우 큰 영향을 주었음

* 앞으로 운용할 서비스의 종류와 수가 증가할 것에 대비해  배포, 중단의 복잡성을 줄이고 Bash 스크립트의 의존도를 낮추기 위해 컨테이너화를 진행할 필요가 있음

<br/>

### 3. 구축 과제 (Todo)

<br/>

⛰ &nbsp; **_Service Api 분리 (Users <-> Feeds)_** :   

* 현재는 핸들링 해야 하는 서비스의 수를 최소화 하기 위해 user 서비스와 feed 서비스를 분리하지 않은 상태임

* 다만, user aggregate와 feed aggregate 분리는 준비된 상태임

    *  DB Schema denomalization과 router, controller, service, db operation 등이 분리되어 있음

* docker containerization이 완료되어 서비스 핸들링이 보다 간편해지면 분리 작업에 착수할 예정임

<br/>

⛰ &nbsp; **_Containerization_** :   

* Docker Containerization은 Macbook ARM 이슈가 있는 것으로 알고 있어, 올 연말 개발 PC 기변 후 천천히 진행할 예정임

* Kubernetes Cluster 완성시까지는 Docker Swarm으로 Orchestration Workflow에 익숙해지는 것이 중간 목표임

<br/>


⛰ &nbsp; **_CQRS_** :   

* CQRS는 RabbitMQ를 사용하여 개념 증명에 필요한 정도로만 부분적으로 개발할 예정임

* v3.0.0 데이터 처리 파이프라인 프로젝트 시작시 CQRS의 본격적인 개발은 유예함

<br/>

