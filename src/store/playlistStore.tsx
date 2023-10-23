import {create} from 'zustand';

interface PlaylistStore {
    currentPlaylist : {
        id : any;
        name: any;
    };
}

export const usePlaylistStore = create<PlaylistStore>(set => ({
    currentPlaylist : {
        id : '1lyE2g89CutAQXo25yKk',
        name: 'Perfume',
    },
    setCurrentPlaylist: playlist => {
        set(state => ({
            currentPlaylist: playlist,
        }));
    },
}));