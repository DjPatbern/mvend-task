import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostsSource = () => {
  const [posts, setPosts] = useState([]); // State to hold repositories
  const [loading, setLoading] = useState(false); //for Loading state while awaiting api call
  const [title, setTitle] = useState(""); //state to hold the title of a new created post
  const [body, setBody] = useState(""); // state to hold the body of a new created post
  const [pageNumber, setPageNumber] = useState(0); // Pagination state
  const postsPerPage = 12; // posts to be displayed per page
  const pagesVisited = pageNumber * postsPerPage;
  const [search, setSearch] = useState(""); // state to hold the searched words when sorting posts
  const navigate = useNavigate();

  //LOGIC FOR FETCHING ALL THE POSTS FROM THE API
  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then((response) => {
      setPosts(response.data);
      setLoading(true);
    });
  }, []);

  //LOGIC TO FILTER THE POST BASE ON THE SEARCH INPUT VALUE

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.body.toLowerCase().includes(search.toLowerCase())
    );
  }, [posts, search]);

  //LOGIC TO SORT THE POST ON MOST RECENT
  const sortedPosts = useMemo(
    () => [...filteredPosts].sort((a, b) => b.id - a.id),
    [filteredPosts]
  );

  //LOGIC TO PAGINATE THE POST
  const pageCount = Math.ceil(posts.length / postsPerPage);

  function changePage({ selected }) {
    setPageNumber(selected);
  }

  //LOGIC TO CREATE POST
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 10,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts([...posts, data]);
        setTitle("");
        setBody("");
        navigate("/dashboard");
      })
      .catch((error) => console.log(error));
  };

  return {
    posts,
    setPosts,
    loading,
    setLoading,
    handleSubmit,
    sortedPosts,
    pageCount,
    changePage,
    postsPerPage,
    pagesVisited,
    search,
    setSearch,
    title,
    setTitle,
    body,
    setBody,
  };
};

const PostsContext = createContext([]);

export function usePostsContext() {
  return useContext(PostsContext);
}

export const UsePosts = ({ children }) => {
  return (
    <PostsContext.Provider value={PostsSource()}>
      {children}
    </PostsContext.Provider>
  );
};
