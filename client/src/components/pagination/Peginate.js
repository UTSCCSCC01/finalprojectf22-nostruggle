import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Posts from '../forumCard/ForumCard.jsx'
import Pagination from './Pagination.js'
 
const Peginate = () => {
   const [posts, setPosts] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage, setPostsPerPage] = useState(10);
   const [loading, setLoading] = useState(false);
   
 
   useEffect(() => {
    const fetchPosts = async () => {
        setLoading(true);
        //const res = await axios.get()
        //setPosts(res.data);
        setLoading(false);
    }

    fetchPosts();

    

   }, [])
 
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
 
   return (
      <div className = "container">
         <Posts posts = {currentPosts} loading={loading} />
         <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} />
      </div>
   );
};
 
export default Peginate;