# mockup-server-express

해당 프로젝트는 웹/앱 개발시 매번 테스트 서버를 만들기 귀찮아 공통 목적으로 목업 서버의 역할로 사용할 서버입니다.

* 제공하는 프로토콜

```
http      :  3000
websocket :  3000
JSON-RPC  :  3000
RPC       :  3000
socket.io :  4000
grpc      :  50051
```

프로토콜 마다 클라이언트는 `client/` 아래에 구현되어 있습니다.

* http endpoint

해당 프로젝트는 6개의 엔드 포인트를 제공합니다

```
/user

/book

/news

/auth
  POST /session 로그인
  GET  /session 로그인 상태 확인, 유저정보 조회
  POST /session/logout 로그아웃
  
  POST /jwt 로그인
  GET  /jwt 로그인 상태 확인, 유저정보 조회
  POST /jwt/logout 로그아웃

/file

/status
```

HTTP 서버의 스펙은 `api.http` 명시되어 있으며 Visual Studio Code의 `RestClient` 플러그인으로 사용가능 합니다.

* run server

```bash
$ npm i # 의존성 모듈 설치

$ npm start # 모든서버 실행
```

* run client

```bash
$ npm run client:websocket

$ npm run client:socketio

$ npm run client:grpc

$ npm run client:rpc

$ npm run client:json-rpc
```

RPC, JSON-RPC는 curl을 이용하여 HTTP 통신으로 요청가능 합니다.

```sh
$ curl --location \
--request POST 'localhost:3000/rpc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "action": "ping"
}'
```

```sh
$ curl --location \
--request POST 'localhost:3000/json-rpc' \
--header 'Content-Type: application/json' \
--data-raw '{
  "jsonrpc": "2.0", 
  "method": "echo", 
  "params": {"text": "hello world"}, 
  "id": null
}'
```