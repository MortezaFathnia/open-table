import Link from "next/link";

export default function RestaurantNavbar({slug}:{slug:string}) {
  return (
    <nav className='flex text-reg border-b pb-2'>
      <Link href={`/restaurant/${slug}`} className='mr-7'>
        Overview
      </Link>
      <a href={`/restaurant/${slug}/menu`} className='mr-7'>
        Menu
      </a>
    </nav>
  );
}
