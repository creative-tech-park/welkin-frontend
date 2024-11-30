import {defineStore} from 'pinia'

export const useGlobalStore = defineStore('globalStore', {

    state: () => ({
        showSidebar: false
    }),
    actions:{
        setSidebarValue(value){
            this.showSidebar = value
        }
    }

})
