import {create} from 'zustand';

interface LoopGlobal {
    isLoop : any ;
}

export const useLoopGlobal = create<LoopGlobal>(set => ({
    isLoop : 'off',
    setIsLoop: valueCon => {
        set(state => ({
            isLoop: valueCon,
        }));
    },
}));