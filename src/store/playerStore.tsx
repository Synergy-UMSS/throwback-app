import {create} from 'zustand';

interface PlayerStore {
  currentSong: {
    id: number;
    title: any;
    artist: any;
    artwork: any;
    url: any;
  };
}

export const usePlayerStore = create<PlayerStore>(set => ({
  currentSong: {
    id: 131,
    title: ' title',
    artist: 'artist',
    artwork: null,
    url: null,
  },
  setCurrentSong: song => {
    set(state => ({
      currentSong: song,
    }));
  },
}));
