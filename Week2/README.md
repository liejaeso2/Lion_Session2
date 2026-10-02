# Week2 - TypeScript To-Do

JavaScript로 작성된 To-Do 앱에 TypeScript 타입을 적용한 과제입니다.

할 일을 추가하거나 삭제할 수 있고, 완료 여부에 따라 목록을 필터링할 수 있습니다.
할 일의 글자를 클릭하면 선택한 항목이 아래에 표시됩니다.

## 실행

```bash
cd Week2
npm ci
npm run dev
```

## 타입 검사 및 빌드

`Week2` 폴더에서 실행합니다.

```bash
npx tsc -b
npm run lint
npm run build
```

## 빌드 결과

![타입 검사 및 빌드 성공](docs/build-success.png)

## 동작 화면

### 필터와 항목 선택

'사과'를 완료 처리하고 진행중 필터를 누른 뒤 '축구'를 선택한 화면입니다.

![진행중 필터 및 항목 선택](docs/todo-selected.jpg)

### 할 일 추가

![할 일 추가 및 전체 목록](docs/todo-all.png)

### 진행중 필터

![진행중 필터](docs/todo-active.png)

### 완료 체크

![완료 여부 변경](docs/todo-completed.png)
