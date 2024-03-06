# WaggleWaggle 🍷

<br>

<p align="center"><img width="250" alt="logo" src="https://github.com/hyooo11/project_fuzimi/assets/98132929/fa69842b-8a41-4c41-bdb3-c4200aca1e83"></p><br>

배포 URL - https://project-wagu.vercel.app/

> ▶️ 테스트 계정<br>
> 아이디 : test004<br>
> 비밀번호 : 112233

<br>

## 💁 프로젝트 소개

- 와인을 즐기고 싶지만 와인이 어려운 와인 입문자들을 위한 사람들의 놀이터 와글와글
- 참여했던 프로젝트의 api를 활용하여 새롭게 제작된 사이트 ([기존 프로젝트 repositories](https://github.com/Hyunsoul37/project_w))<br>

> 와글와글 : 사람들이 한곳에 많이 모여 잇따라 떠들거나 움직이는 소리. 또는 그 모양

<br>

## 🔍 개발기간

2023.12.20 ~ ing<br><br>

## ⚙ 기술스택

<div>
  <img src="https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
</div><br>

## 🗂️ 프로젝트 구조

```bash
.
.
.
📦public
 ┣ 📂font #폰트파일
 ┣ 📂media #아이콘, 이미지파일
 ┃ ┣ 📂icon
 ┃ ┗ 📂img
 ┣ 📜index.html
 ┣ 📜manifest.json
 ┗ 📜robots.txt
📦src
┣ 📂api #각종 api요청
┣ 📂app #라우팅
┃ ┣ 📂admin
┃ ┣ 📂auth
┃ ┣ 📂community
┃ ┣ 📂product
┃ ┣ 📜favicon.ico
┃ ┣ 📜globals.css
┃ ┣ 📜layout.js
┃ ┗ 📜page.js
┣ 📂component #app폴더에서 직접적으로 라우팅 되는 컴포넌트 또는 재사용이 자주되는 컴포넌트
┣ 📂container #component폴더에서 사용되는 작은 단위의 컴포넌트
┣ 📂redux
┃ ┣ 📂features # slices
┃ ┣ 📜StoreProvider.js
┃ ┣ 📜hook.js
┃ ┗ 📜store.js
┣ 📂ui #Button, inputForm 등 자주사용 되는 ui 컴포넌트
┣ 📜App.js
┣ 📜index.css
┣ 📜index.js
┗ 📜middleware.js
.
.
.

```

## 📌 페이지별 주요기능

로그인시 이용 가능한 기능에는 👤 표시가 있습니다.<br>
테스트 계정 아래에서 확인 가능합니다.

#### 회원가입(SIGN UP) - [바로가기](https://project-wagu.vercel.app/auth/signup)

- 입력과 동시에 유효성 검증 실행 및 경고 문구 표시
- 아이디,닉네임 중복체크
- 간편한 주소 입력을 위한 다음 주소 api 연동

<table>
  <thead>
    <tr>
      <td align="center">회원가입</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img src="https://github.com/hyooo11/WaggleWaggle/assets/98132929/156c3ff8-9a69-48dc-b61b-d234cef662b1" width="700px"/>
      </td>
    </tr>
  </tbody>
</table>

#### 로그인(LOGIN) - [바로가기](https://project-wagu.vercel.app/auth/login)

- 리프레시 토큰(Refresh Token), 유저 고유 id 쿠키 생성
- 엑세스 토큰(Access Token) 변수 저장
- 사용자 정보 가져오기

<table>
  <thead>
    <tr>
      <td align="center">로그인</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img src="https://github.com/hyooo11/WaggleWaggle/assets/98132929/9382b384-917e-4083-944e-31e38a99b2b4" width="700px"/>
      </td>
    </tr>
  </tbody>
</table>

#### 상품페이지(PRODUCT) - [바로가기](https://project-wagu.vercel.app/product?page=1)

- 와인종류, 맛, 생산국가, 가격대 선택 후 검색시 상품 필터링
- 👤 와인 좋아요 및 해제
- 페이지네이션(Pagination) 구현

<table>
  <thead>
    <tr>
      <td align="center">상품페이지 필터 및 페이지네이션</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img src="https://github.com/hyooo11/WaggleWaggle/assets/98132929/8fa88f83-0f20-498f-95db-d7ed4a9ecca4" width="700px"/>
      </td>
    </tr>
  </tbody>
</table>

#### 커뮤니티 페이지(COMMUNITY) - [바로가기](https://project-wagu.vercel.app/community)

- 👤 게시물 등록, 수정, 삭제
- 👤 댓글 등록, 수정, 삭제
- 👤 대댓글 등록, 수정, 삭제
- 👤 댓글 좋아요 및 해제
- 무한스크롤(Infinite Scroll) 구현

<br>

## ✅ 프로젝트 배포

이 프로젝트는 [Vercel](https://vercel.com/)을 사용하여 배포되었습니다.<br>

> main 브랜치에서 build 명령어 입력 후 커밋 시 자동 배포

```bash
  npm run build
```

<br>

## 💡 Reference

- 규칙적인 깃 커밋 메세지 위한 [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

- 주요 프레임워크 및 라이브러리 [Next.js](https://nextjs.org/) | [React.js](https://ko.legacy.reactjs.org/) | [React Hook Form](https://react-hook-form.com/) | [Yup](https://www.npmjs.com/package/yup)

- 상태관리 [Redux-Toolkit](https://redux-toolkit.js.org/)

- 배포 [Vercel](https://vercel.com/)
