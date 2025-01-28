import React from 'react';

const FlashCard = ({ topic, dateAdded, cardCount, uid }) => {
    // Generate soft, pleasing pastel colors
    const generatePastelColor = () => {
        const hues = [
            'hsl(47, 100%, 90%)',  // Soft yellow
            'hsl(350, 100%, 94%)', // Soft pink
            'hsl(165, 100%, 94%)', // Soft mint
            'hsl(190, 100%, 92%)', // Soft blue
            'hsl(280, 100%, 95%)', // Soft lavender
        ];
        return hues[Math.floor(Math.random() * hues.length)];
    };

    return (
        <div
            className="relative w-56 h-56 overflow-hidden transition-all duration-300 hover:shadow-lg"
            style={{
                backgroundColor: generatePastelColor(),
                // transform: 'rotate(-1deg)'
            }}
        >
            {/* Main content container */}
            <div className="h-full p-6 flex flex-col pb-[50px]">
                {/* Topic section */}
                <div className="mb-4">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Topic
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mt-1">
                        {topic}
                    </h3>
                </div>

                {/* Date section */}
                <div className="mb-4">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Added
                    </span>
                    <p className="text-sm text-gray-700 mt-1 font-medium">
                        {dateAdded}
                    </p>
                </div>

                {/* Cards count section */}
                <div className="mt-auto mb-10">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No. of cards
                    </span>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                        {cardCount}
                    </p>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10">
                <div className="w-full h-full rounded-full bg-white opacity-10"></div>
            </div>

            {/* Dog-ear effect */}
            <div className="absolute bottom-0 right-0">
                <div
                    className="w-8 h-8 transform rotate-45 translate-x-4 translate-y-4"
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.05)',
                    }}
                ></div>
            </div>
        </div>
    );
};

export default FlashCard;