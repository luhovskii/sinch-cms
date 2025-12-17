import React from 'react';

const MenuNavigation: React.FC = () => {
    return(
        <div className="flex justify-center bg-gray-100">
            <div className="container mx-auto flex justify-start items-center py-2">
                <nav className="flex items-start justify-start">
                    <ul className="flex flex-row gap-2">
                        <li>
                            <a href="/" className="text-gray-900 text-lg">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/blog" className="text-gray-900 text-lg">
                                Blog
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export  default MenuNavigation;
