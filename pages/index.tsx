import Link from 'next/link'

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/shapes" as="/shapes">
          <a>shapes</a>
        </Link>
      </li>
      <li>
        <Link href="/terms" as="/terms">
          <a>terms</a>
        </Link>
      </li>
    </ul>
  )
}
