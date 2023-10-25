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
    id: 19,
    title: 'As it was',
    artist: 'Harry Styles',
    artwork: require('../../assets-prueba/images/harry_styles.jpg'),
    url: require('../../assets-prueba/songs/Harry-Styles-As-It-Was.mp3'),
  },
  setCurrentSong: song => {
    set(state => ({
      currentSong: song,
    }));
  },
}));
