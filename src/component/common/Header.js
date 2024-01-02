'use client'

import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <div>
        <Link href="/">
          <img src="/media/img/wagu-w.svg" />
        </Link>
        <Link href="/product">PRODUCT</Link>
        <Link href="/community">COMMUNITY</Link>
        <Link href="/qna">QnA</Link>
        <Link href="/notice">NOTICE</Link>
      </div>
      <div>
        <Link href="/login">로그인</Link>
        <Link href="/signup">회원가입</Link>
      </div>

    </header>
  )
}

export default Header;