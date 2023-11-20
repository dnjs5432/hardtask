https://docs.google.com/spreadsheets/d/1vTPzlaZXHIFFvK0vBnbOyTFmaTGYoUMdOy2ARuC2yEg/edit?usp=sharing

1. **암호화 방식**
    - 단방향 암호화에 해당한다.
    - 저장할 때 안전하여 보안을 강화시킬 수 있다.
2. **인증 방식**
    - 사용자의 정보가 노출되어 악의적인 공격을 받을 수 있다.
    - Refresh Token 사용, 유효 기간을 짧게 설정하는 등의 방법이 있다.
3. **인증과 인가**
    - 인증: 사용자의 신원을 검증하는 행위
    - 인가 : 사용자에게 특정 리소스/기능 액세스 권한을 부여하는 프로세스
    - 암호화/복호화를 위해 고유한 시크릿 키가 존재하기 때문에 인증에 해당한다.
4. **Http Status Code**
    - 200 OK : 성공했을 때 응답
    - 400 Bad Request : 클라이언트의 요청이 잘못되었거나 유효하지 않을 때 응답
5. **리팩토링**
    - 쿼리, ORM 사용에 변경이 있었다.
    - ORM 사용, 환경 변수 / 설정 파일을 사용한다.
6. **서버 장애 복구** - Startup Script을 사용하여 서버 재시작 시 PM2가 자동으로 다시 시작하게 한다. 7. **개발 환경** - 수동으로 서버를 재시작하지 않아도 되어서 생산성을 높여준다. - 일반 설치 : 의존성 패키지를 설치할 때 사용 - 글로벌 설치 : 시스템 전역에 설치하여 어디서나 사용할 수 있다. - 개발용 설치 : 개발 과정에서만 필요한 패키지를 설치한다. - 개발용 설치로 다른 사람이 소스코드를 내려 받았을 때에도 동작하게 해주자.
