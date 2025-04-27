'use client'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Logo: React.FC = () => {
    const router = useRouter();

    const handleLogoClick = () => {
        router.push('/');
    };

    return (
        <Image 
        alt='logo'
        className='cursor-pointer'
        height='150'
        width='200'
        src='/images/logo2.jpg'
        onClick={() => {handleLogoClick()}} />
    );
};

export default Logo;