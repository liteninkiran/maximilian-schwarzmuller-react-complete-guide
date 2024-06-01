'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './nav-link.module.css';

export default function NavLink({ href, children }) {
    const path = usePathname();
    const className = classes.link + ' ' + (path.startsWith(href) ? classes.active : '');

    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
}
