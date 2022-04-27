import Link from 'next/Link'

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