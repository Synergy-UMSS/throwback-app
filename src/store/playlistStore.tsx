import {create} from 'zustand';

interface PlaylistStore {
    currentPlaylist : {
        id : any;
        name: any;
        songs_p: any,
    };
}

export const usePlaylistStore = create<PlaylistStore>(set => ({
    currentPlaylist : {
        id : '1lyE2g89CutAQXo25yKk',
        name: 'Perfume',
        songs_p: [],
    },
    setCurrentPlaylist: playlist => {
        set(state => ({
            currentPlaylist: playlist,
        }));
    },
}));