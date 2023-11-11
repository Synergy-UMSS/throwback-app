import {create} from 'zustand';

interface PlaylistFavGlobal {
    currentPlaylistfav : {
        id : any;
        name: any;
    };
}

export const usePlaylistFavGlobal = create<PlaylistFavGlobal>(set => ({
    currentPlaylistfav : {
        id : '7z1xD0U14vuf5U4Rbhv1',
        name: 'favs',
    },
    setCurrentPlaylistfav: playlist => {
        set(state => ({
            currentPlaylist: playlist,
        }));
    },
}));