import {create} from 'zustand';

interface ConnectionGlobal {
    isConnected : boolean ;
}

export const useConnectionGlobal = create<ConnectionGlobal>(set => ({
    isConnected : true,
    setIsConnected: valueCon => {
        set(state => ({
            isConnected: valueCon,
        }));
    },
}));