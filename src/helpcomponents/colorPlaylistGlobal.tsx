import {create} from 'zustand';

interface colorPlaylistGlobal {
    colorPlaylistCurrent : any ;
}

export const useColorPlaylistGlobal = create<colorPlaylistGlobal>(set => ({
    colorPlaylistCurrent : 'pink',
    setColorPlaylistCurrent: valueCol => {
        set(state => ({
            colorPlaylistCurrent : valueCol,
        }));
    },
}));