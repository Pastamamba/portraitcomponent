import React from 'react';

interface HeaderProps {
    photographer: string;
    category: string;
}

const Header: React.FC<HeaderProps> = ({ photographer, category }) => {
    return (
        <div className="bg-black text-white p-4 sticky top-0 z-50 flex flex-col items-center">
            <h1 className="text-xl">{photographer}</h1>
            <p className="text-sm">{category}</p>
        </div>
    );
}

export default Header;
