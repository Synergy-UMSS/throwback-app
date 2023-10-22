import {create} from 'zustand';

interface PlaylistStore {
    currentPlaylist : {
        id : any;
    };
}

export const usePlaylistStore = create<PlaylistStore>(set => ({
    currentPlaylist : {
        id : '1lyE2g89CutAQXo25yKk',
    },
    setCurrentPlaylist: playlist => {
        set(state => ({
            currentPlaylist: playlist,
        }));
    },
}));