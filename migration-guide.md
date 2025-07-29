# Vite 마이그레이션 가이드

## 개요

Create React App에서 Vite로 마이그레이션하는 단계별 가이드입니다.

## 사전 준비사항

- Node.js 16+ 설치
- npm 또는 yarn 패키지 매니저

## 마이그레이션 단계

### 1. 의존성 패키지 설치

```bash
npm install --save-dev vite @vitejs/plugin-react @testing-library/jest-dom jsdom
```

### 2. 기존 의존성 제거

```bash
npm uninstall react-scripts
```

### 3. 설정 파일 생성

#### vite.config.js

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    css: true,
  },
});
```

#### index.html (프로젝트 루트로 이동)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.js"></script>
  </body>
</html>
```

### 4. package.json 스크립트 수정

```json
{
  "scripts": {
    "start": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest"
  }
}
```

### 5. TypeScript 프로젝트 설정 (해당하는 경우)

tsconfig.json에 다음 설정 추가:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 6. 파일 경로 수정

- `public/index.html` → `index.html` (프로젝트 루트로 이동)
- `src/index.js` → `src/index.js` (그대로 유지)
- `src/App.js` → `src/App.js` (그대로 유지)

## 검증 단계

### 1. 개발 서버 실행

```bash
npm start
```

- http://localhost:3000 에서 앱이 정상 표시되는지 확인

### 2. 빌드 테스트

```bash
npm run build
```

- dist 폴더에 빌드 결과물이 생성되는지 확인

### 3. 테스트 실행

```bash
npm test
```

- 모든 테스트가 정상 실행되는지 확인

## 주의사항

### 환경 변수

- `.env` 파일은 그대로 사용 가능
- `REACT_APP_` 접두사 대신 `VITE_` 접두사 사용 권장

### 정적 파일

- `public` 폴더의 파일들은 그대로 사용 가능
- 참조 시 `/` 경로 사용

### CSS 모듈

- CSS 모듈은 그대로 사용 가능
- 추가 설정 불필요

## 문제 해결

### 일반적인 문제들

1. **포트 충돌**: vite.config.js에서 port 변경
2. **경로 문제**: resolve.alias 설정 확인
3. **테스트 실패**: setupFiles 경로 확인

### 지원되는 기능

- ✅ React 17/18
- ✅ TypeScript
- ✅ CSS Modules
- ✅ Styled Components
- ✅ React Router
- ✅ Testing Library
- ✅ Jest (Vitest로 대체)

## 성능 개선 효과

- 개발 서버 시작 시간: 50-80% 단축
- Hot Module Replacement: 2-3배 빠름
- 빌드 시간: 30-50% 단축
