import Link from "next/link";

export function Navbar() {
  return (
    <ul>
      <li>
        <Link href='/'>Home</Link>
      </li>
      <li>
        <Link href='/about'>About</Link>
      </li>
      <li>
        <Link href='/product'>Product</Link>
      </li>
    </ul>
  );
}
