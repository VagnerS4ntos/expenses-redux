import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <header>
      <div className="logo">
        <Link href="/">
          <a>
            <Image src={'/logo.png'} alt="Logo" width={50} height={50} />
          </a>
        </Link>
      </div>
    </header>
  );
}

export default Header;
