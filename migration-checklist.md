# Vite 마이그레이션 체크리스트

## 사전 준비

- [ ] 프로젝트 백업 생성
- [ ] 현재 프로젝트 상태 확인 (package.json, 의존성 등)
- [ ] 기존 기능 테스트 실행 및 결과 기록

## 의존성 관리

- [ ] react-scripts 제거
- [ ] Vite 관련 의존성 설치
  - [ ] vite
  - [ ] @vitejs/plugin-react
  - [ ] vitest (테스트용)
  - [ ] jsdom (테스트용)
- [ ] 기존 의존성 호환성 확인
  - [ ] React 버전
  - [ ] TypeScript (해당하는 경우)
  - [ ] Styled Components (해당하는 경우)
  - [ ] React Router (해당하는 경우)

## 설정 파일

- [ ] vite.config.js 생성
- [ ] index.html 프로젝트 루트로 이동
- [ ] package.json 스크립트 수정
  - [ ] "start": "vite"
  - [ ] "build": "vite build"
  - [ ] "preview": "vite preview"
  - [ ] "test": "vitest"
- [ ] TypeScript 설정 확인 (해당하는 경우)
- [ ] 경로 별칭 설정 확인 (해당하는 경우)

## 파일 구조

- [ ] public/index.html → index.html 이동
- [ ] src 폴더 구조 유지
- [ ] 정적 파일 경로 확인
- [ ] 환경 변수 파일 확인

## 기능 검증

- [ ] 개발 서버 실행 확인
  - [ ] http://localhost:3000 접속 가능
  - [ ] 기본 React 앱 표시
  - [ ] Hot Module Replacement 작동
- [ ] 빌드 프로세스 확인
  - [ ] npm run build 성공
  - [ ] dist 폴더 생성
  - [ ] 빌드 결과물 확인
- [ ] 테스트 실행 확인
  - [ ] npm test 성공
  - [ ] 모든 테스트 통과
  - [ ] 테스트 커버리지 확인

## 프로젝트별 특수 검증

### 기본 React 앱

- [ ] 기본 컴포넌트 렌더링
- [ ] CSS 스타일 적용

### TypeScript 프로젝트

- [ ] TypeScript 컴파일 확인
- [ ] 타입 체크 통과
- [ ] tsconfig.json 설정 확인

### Styled Components 프로젝트

- [ ] 스타일 컴포넌트 렌더링
- [ ] 동적 스타일 적용
- [ ] 테마 기능 (해당하는 경우)

### React Router 프로젝트

- [ ] 페이지 라우팅 작동
- [ ] 네비게이션 기능
- [ ] URL 파라미터 처리

### Todo List 프로젝트

- [ ] CRUD 기능 확인
  - [ ] 추가 기능
  - [ ] 삭제 기능
  - [ ] 수정 기능
  - [ ] 완료 체크 기능
- [ ] 상태 관리 확인
- [ ] Context API 작동 (해당하는 경우)

## 성능 확인

- [ ] 개발 서버 시작 시간 측정
- [ ] 빌드 시간 측정
- [ ] 테스트 실행 시간 측정
- [ ] 메모리 사용량 확인

## 문서 업데이트

- [ ] README.md 업데이트
- [ ] package.json 설명 업데이트
- [ ] 개발 가이드 업데이트

## 최종 검증

- [ ] 모든 기능 정상 작동
- [ ] 성능 개선 확인
- [ ] 에러 없음
- [ ] 경고 메시지 확인
- [ ] 브라우저 호환성 확인

## 문제 해결

- [ ] 발생한 문제 기록
- [ ] 해결 방법 문서화
- [ ] 향후 참고용 노트 작성
