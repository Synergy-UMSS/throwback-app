import {create} from 'zustand';

interface SuccesfulMessage {
    isAdded : boolean ;
}

export const useSuccesfulMessage = create<SuccesfulMessage>(set => ({
    isAdded : false,
    setIsAdded: value => {
        set(state => ({
            isAdded: value,
        }));
    },
}));