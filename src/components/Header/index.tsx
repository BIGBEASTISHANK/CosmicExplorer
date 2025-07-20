import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Cosmic Explorer Logo" width={24} height={24} className="h-6 w-6" />
          <span className="font-bold font-headline text-lg">Cosmic Explorer</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
