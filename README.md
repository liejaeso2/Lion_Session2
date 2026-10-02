# 멋쟁이사자처럼 세션 과제

주차별 과제를 독립된 프로젝트로 정리했습니다.

| 주차 | 과제 | 코드 및 설명 |
| --- | --- | --- |
| Week1 | React 회원가입 페이지 및 재사용 가능한 Input/Button 컴포넌트 | [Week1](Week1/README.md) |
| Week2 | JavaScript To-Do 앱을 React + TypeScript로 변환 | [Week2](Week2/README.md) |

## 저장소 구조

```text
Lion_Session2/
├── README.md
├── .gitignore
├── Week1/
│   ├── README.md
│   ├── package.json
│   ├── package-lock.json
│   ├── src/
│   ├── public/
│   ├── screenshots/
│   └── 기타 프로젝트 설정 파일
└── Week2/
    ├── README.md
    ├── package.json
    ├── package-lock.json
    ├── src/
    ├── public/
    ├── docs/
    └── 기타 프로젝트 설정 파일
```

각 폴더에 독립된 의존성과 설정 파일이 있습니다. 실행하려는 주차 폴더에서 설치 및 실행합니다.

## Week1 실행

```bash
cd Week1
npm ci
npm run dev
```

[회원가입 과제 설명과 스크린샷](Week1/README.md)

## Week2 실행

저장소 최상위에서 아래 명령어를 실행합니다.

```bash
cd Week2
npm ci
npm run dev
```

타입 검사, 린터 및 빌드는 `Week2` 폴더에서 실행합니다.

```bash
npx tsc -b
npm run lint
npm run build
```

[TypeScript 과제 설명과 전체 제출 스크린샷](Week2/README.md)

### Week2 타입 검사 및 빌드 성공

![Week2 타입 검사 및 빌드 성공](Week2/docs/build-success.png)

### Week2 필터 및 선택 동작

![Week2 진행중 필터 및 항목 선택](Week2/docs/todo-selected.jpg)
