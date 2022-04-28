import Link from 'next/link';

export default function SignupBtn() {
  return (
    <>
      <div id="signup">
        <Link href="/registration">
          <button>Sign Up</button>
        </Link>
      </div>
    </>
  );
}
