import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCookie } from 'cookies-next';

function Header() {
  const [userName, setUserName] = React.useState('');

  React.useEffect(() => {
    setUserName(getCookie('userName'));
  }, []);

  return (
    <header>
      <div className="logo">
        <Link href="/">
          <a>
            <Image src={'/logo.png'} alt="Logo" width={50} height={50} />
          </a>
        </Link>
      </div>
      <div>
        <p>{userName}</p>
      </div>
    </header>
  );
}

export default Header;
