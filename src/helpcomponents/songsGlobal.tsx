import {create} from 'zustand';

interface SongsGlobal {
    isLoading : boolean;
}

export const getSongsGlobal =  create<SongsGlobal>(set => ({
    isLoading : false,
    setIsLoading: values => {
        set({
            isLoading:  values,
        });
    },
}));
