import React, { createContext, useState } from 'react';

const MusicPlayerContext = createContext();

const MusicPlayerProvider = ({children}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <MusicPlayerContext.Provider value={{isPlaying, setIsPlaying }}>
            {children}
        </MusicPlayerContext.Provider>
    );
};

export {MusicPlayerContext, MusicPlayerProvider};