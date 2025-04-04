import { SearchContext } from "../context/searchContext.js";
import { useContext, useRef } from "react";
import axios from "axios";

export function useRecently() {
  const { recentlyItems, setRecentlyItems } = useContext(SearchContext);
  const prevRecentlyItemsRef = useRef(recentlyItems);

  const getRecntlyItems = async() =>{
    try {
      const localPidArray = JSON.parse(localStorage.getItem('viewProducts')); 
  
      if(localPidArray !== null) {
        if(localPidArray.length !==0 ){
          const result =await axios.post('http://54.180.92.85:9000/main/recentlyViewItem', {"pidArray":localPidArray});
          
          if (JSON.stringify(prevRecentlyItemsRef.current) !== JSON.stringify(result.data)) {
            prevRecentlyItemsRef.current = result.data; 
            setRecentlyItems(result.data);
          }  
          }
        }
      } catch (error) {
        console.error('로컬스토리지 파싱 오류:', error);
      }
  };

 return { getRecntlyItems };
};

