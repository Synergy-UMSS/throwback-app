import {create} from 'zustand';

interface ControlPlayer {
    isPaused : boolean;
}
export const useControlPlayer = create<ControlPlayer>(set => ({
    isPaused : false,
    setIsPaused: value => {
        set(state => ({
            isPaused: value,
        }));
    },
}));