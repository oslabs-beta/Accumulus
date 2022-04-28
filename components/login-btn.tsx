import Link from 'next/link'

export default function LoginBtn() {
  return (
    <>
      <div id="login">
        <Link href="/login">
          <button>Log In</button>
        </Link>
      </div>
    </>
  )
}