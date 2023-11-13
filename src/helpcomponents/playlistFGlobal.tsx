import {create} from 'zustand';

interface PlaylistFavGlobal {
    currentPlaylistfav : {
        id : any;
        name: any;
        songs_fav: any,
    };
}

export const usePlaylistFavGlobal = create<PlaylistFavGlobal>(set => ({
    currentPlaylistfav : {
        id : '7z1xD0U14vuf5U4Rbhv1',
        name: 'favs',
        songs_fav : [],
    },
    setCurrentPlaylistfav: playlistf => {
        set(state => ({
            currentPlaylistfav: playlistf,
        }));
    },
}));