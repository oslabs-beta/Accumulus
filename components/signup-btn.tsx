import Link from 'next/Link'

export default function SignupBtn() {
  return (
    <>
      <div id="signup">
        <Link href="/registration">
          <button>Sign Up</button>
        </Link>
      </div>
    </>
  )
}