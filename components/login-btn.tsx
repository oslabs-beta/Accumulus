import Link from 'next/link'

export default function LoginBtn() {
  return (
    <>
      <div id="login">
        <Link href="/login" passHref>
          <button>Log In</button>
        </Link>
      </div>
    </>
  )
}