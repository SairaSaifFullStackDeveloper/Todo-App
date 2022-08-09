import * as api from '../api';

export const get = async () =>{
    try{
        const {data} = await api.get()
        return data
    }catch(error){
        console.error(error)
    }
}

export const post = async (todo) =>{
    try{
        const {data} = await api.post(todo)
        return data
    }catch(error){
        console.error(error)
    }
}

export const put = async (id, todo) =>{
    try{
        const {data} = await api.put(id, todo)
        return data;
    }catch(error){
        console.error(error)
    }
}
