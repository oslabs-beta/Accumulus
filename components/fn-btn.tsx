import Link from 'next/link'

export default function FunctionBtn() {
  return (
    <>
      <div id="fn-btn">
        <Link href="/functions">
          <button>Functions</button>
        </Link>
      </div>
    </>
  )
}