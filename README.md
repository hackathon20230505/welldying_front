# welldying_front
Welldying is a web app service that provieds people who want to die with time to look back on their lives once more and help their mental health.


## 🤝 **규칙**

- ### **Commit 컨벤션**

**메시지 구조**

먼저 커밋 메시지는 크게 **제목, 본문, 꼬리말** 세 가지 파트로 나누고, 각 파트는 빈 줄을 두어서 구분합니다.

```
type(옵션): [#issueNumber - ]Subject  // -> 제목
(한 줄을 띄워 분리합니다.)
body(옵션) //  -> 본문
(한 줄을 띄워 분리합니다.)
footer(옵션) // -> 꼬리말
```

- type: 어떤 의도로 커밋했는지를 type에 명시합니다.
- submit: 최대 50글자가 넘지 않도록 하고 마침표는 찍지 않습니다. 영문으로 표기하는 경우 동사(원형)를 가장 앞에 두고 첫 글자는 대문자로 표기합니다.
- body: 긴 설명이 필요한 경우에 작성합니다. 어떻게 했는지가 아니라, 무엇을 왜 했는지를 작성합니다. 최대하 75자를 넘기지 않도록 합니다.
- footer: issue tracker ID를 명시하고 싶은 경우에 작성합니다.

### **제목은 어떻게 작성하는가**

**타입**

타입은 태그와 제목으로 구성되고, 태그는 영어로 쓰되 첫 문자는 대문자로 합니다.

"태그: 제목"의 형태이며, : 뒤에만 space가 있음에 유의합니다.

| 태그 이름        | 설명                                                                      |
| ---------------- | ------------------------------------------------------------------------- |
| Feat             | 새로운 기능을 추가할 경우                                                 |
| Fix              | 버그를 고친 경우                                                          |
| Design           | CSS 등 사용자 UI 디자인 변경                                              |
| !BREAKING CHANGE | 커다란 API 변경의 경우                                                    |
| !HOTFIX          | 급하게 치명적인 버그를 고쳐야하는 경우                                    |
| Style            | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우                     |
| Refactor         | 프로덕션 코드 리팩토링                                                    |
| Comment          | 필요한 주석 추가 및 변경                                                  |
| Docs             | 문서를 수정한 경우                                                        |
| Test             | 테스트 추가, 테스트 리팩토링(프로덕션 코드 변경 X)                        |
| Chore            | 빌드 태스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X) |
| Rename           | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우                        |
| Remove           | 파일을 삭제하는 작업만 수행한 경우                                        |

<br />

### **태그는 어떻게 적는가?**

태그는 다음과 같은 종류로 구분됩니다. 태그 뒤에는 ": "를 붙여 제목과 구별할 수 있도록 합니다.

1. 기능
2. 개선
3. 그 외

<br />

**기능**

Feat, Fix, Design, !BREAKING CHANGE 태그가 기능 태그의 종류입니다.

```
Feat: 새로운 기능을 추가할 경우
Fix: 버그를 고친 경우
Design: CSS 등 사용자 UI 디자인 변경
!BREAKING CHANGE: 커다란 API 변경의 경우 (ex API의 arguments, return 값의 변경, DB 테이블 변경, 급하게 치명적인 버그를 고쳐야 하는 경우)
```

추가적인 문맥 정보를 제공하기 위한 목적으로 괄호 안에 적을 수도 있습니다.

```
ex)
"Feat(navigation): "
"Fix(database): "
```

<br />

**개선**

Style, Refactor, Comment 태그가 개선 태그의 종류입니다.

```
Style: 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우
Refactor: 프로덕션 코드 리팩토링, 새로운 기능이나 버그 수정없이 현재 구현을 개선한 경우
Comment: 필요한 주석 추가 및 변경
```

Style의 경우 오타 수정, 탭 사이즈 변경, 변수명 변경 등에 해당하고, Refactor의 경우 코드를 리팩토링 하는 경우에 적용할 수 있습니다.

<br />

**그 외**

Docs, Test, Chore, Rename, Remove 태그가 그 외 태그의 종류입니다.

```
Docs: 문서를 수정한 경우
Test: 테스트 추가, 테스트 리팩토링 (프로덕션 코드 변경 없음)
Chore: 빌드 태스크 업데이트, 패키지 매니저 설정할 경우 (프로덕션 코드 변경 없음)
Rename: 파일 혹은 폴더명을 수정하는 경우
Remove: 사용하지 않는 파일 혹은 폴더를 삭제하는 경우
```

Docs의 경우 README.md 수정 등에 해당하고, Test는 test 폴더 내부의 변경이 일어난 경우에만 해당합니다. Chore의 경우 package.json의 변경이나 dotenv의 요소 변경 등, 모듈의 변경에 해당됩니다.

그렇다면, 좋은 커밋 메시지를 작성하기 위해서는 제목은 어떻게 작성해야 하는지 알아보겠습니다.

<br />

### **제목은 어떻게 적는가?**

제목은 코드 변경 사항에 대한 짧은 요약을 나타냅니다. 제목은 다음의 규칙을 지킵니다.

1. 제목의 처음은 동사 원형으로 시작합니다.
2. 총 글자 수는 50자 이내로 작성합니다.
3. 마지막에 특수문자는 삽입하지 않습니다. 예) 마침표(.), 느낌표(!), 물음표(?)
4. 제목은 개조식 구문으로 작성합니다.

만약 영어로 작성하는 경우 다음의 규칙을 따릅니다.

1. 첫 글자는 대문자로 작성합니다.
2. "Fix", "Add", "Change"의 명령어로 시작합니다.

한글로 제목을 작성하는 경우 다음의 규칙을 따릅니다.

1. "고침", "추가", "변경"의 명령어로 시작합니다.

```
예시)
Feat: "추가 get data api 함수"
```

<br />

### **본문은 어떻게 작성하는가**

본문은 다음의 규칙을 지킵니다.

1. 본문은 한 줄 당 72자 내로 작성합니다.
2. 본문 내용은 양에 구애받지 않고 최대한 상세히 작성합니다.
3. 본문 내용은 어떻게 변경했는지보다 무엇을 변경했는지 또는 왜 변경했는지를 설명합니다.

<br />

### **꼬리말은 어떻게 작성하는가**

꼬리말은 다음의 규칙을 지킵니다.

1. 꼬리말은 optional이고 이슈 트래커 ID를 작성합니다.
2. 꼬리말은 "유형: #이슈 번호" 형식으로 사용합니다.
3. 여러 개의 이슈 번호를 적을 때는 쉼표로 구분합니다.
4. 이슈 트래커 유형은 다음 중 하나를 사용합니다. - Fixes: 이슈 수정중 (아직 해결되지 않은 경우) - Resolves: 이슈를 해결했을 때 사용 - Ref: 참고할 이슈가 있을 때 사용 - Related to: 해당 커밋에 관련된 이슈번호 (아직 해결되지 않은 경우) <br />
   ex) Fixes: #45 Related to: #34, #23

지금까지 배운 내용을 토대로 로그인 API를 개발한 내용을 커밋할 때, 커밋 메시지를 작성한다면 어떻게 작성할 수 있을까요?

```
Feat: "추가 로그인 함수"

로그인 API 개발

Resolves: #123
Ref: #456
Related to: #48, #45
```

### **커밋 메시지 Emoji**
[gitmoji.dev](https://gitmoji.dev/)