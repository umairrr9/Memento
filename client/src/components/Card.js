import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

function Card({title, description, link}){
    return(
        <div className="max-w-sm bg-white rounded overflow-hidden shadow-lg m-4 inline-block text-left">
            <div className="px-6 py-3">
                <h2 className="font-inter text-brandBlue-A font-bold text-xl mb-2">{title}</h2>
                <p className="font-lato text-gray-600 text-base">
                    {description}
                </p>
            </div>
            <div className="px-6 pt-2 pb-2">
            <Link className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:text-brandBlue-A" to={`#${link}`}>Learn More</Link>
            </div>
        </div>
    )
}

export default Card;