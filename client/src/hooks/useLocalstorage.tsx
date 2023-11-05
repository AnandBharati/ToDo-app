import { useState, useEffect } from 'react'

function getIntialValue(key: string) {
  const str = localStorage.getItem(key);
  const value = JSON.parse(str || '{}');
  if (value !== null) return value
  return {}
}

function useLocalstorage(key: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(getIntialValue(key));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])


  return [data, setData];
}

export default useLocalstorage;