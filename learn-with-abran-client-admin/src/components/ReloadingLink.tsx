import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const ReloadingLink = ({ to, children } : { to: string, children: React.ReactNode}) => {
    const location = useLocation();

    const handleClick = (e: React.MouseEvent) => {
        if (location.pathname === '/write') {
            e.preventDefault();
            window.location.href = to;
        }
    }
  return (
    <Link to={to} onClick={handleClick}>
        {children}
    </Link>
  )
}

export default ReloadingLink