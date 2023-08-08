import {useState, useEffect} from 'react'

function getIntialValue(key: string){
    const str = localStorage.getItem(key);
    const value = JSON.parse(str || '{}');
    if(value) return value
    return {}
}

function useLocalstorage(key: string){
    const [data, setData] = useState<any>(getIntialValue(key));

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(data));
    }, [data])
    

    return [data, setData];
}

export default useLocalstorage;