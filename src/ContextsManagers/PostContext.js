import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";




const PostsSource = () => {

    const [posts, setPosts] = useState([]); // State to hold repositories
    const [loading, setLoading] = useState(false); //for Loading state while awaiting api call
    


    useEffect(() => {
        axios
          .get(`https://jsonplaceholder.typicode.com/posts`)
          .then((response) => {
            setPosts(response.data);
            setLoading(true);
          })
      }, []);
  

    return{ 
        posts, setPosts, loading, setLoading
     }
}

const PostsContext = createContext([])

export function usePostsContext(){
    return useContext(PostsContext)
  }



export const UsePosts = ({children}) => {



  return (
    <PostsContext.Provider value={PostsSource()}>
      {children}
    </PostsContext.Provider>
  )
}