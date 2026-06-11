# admin-marketing

마케팅 영역 Remote 앱 (Module Federation)

## 역할

- `admin-portal`(Host)에서 불러오는 마케팅 페이지 제공
- 현재 expose: `EventListPage` (`/marketing/event`)

## 로컬 개발

```bash
pnpm install
pnpm dev          # http://localhost:5174 (단독 미리보기)
```

Host와 함께 연동할 때:

```bash
# 터미널 1
pnpm dev

# 터미널 2 (admin-portal)
pnpm dev          # http://localhost:5173
```

## 빌드

```bash
pnpm build
pnpm preview      # remoteEntry.js 제공 (포트 5174)
```
