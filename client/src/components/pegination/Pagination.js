import { Pagination } from '@mui/material';
import React from 'react';
 
const Pagination = ({ postsPerPage, totalPosts }) => {
   const pageNumbers = [];
 
   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
   }
 
   return (
      <div className="pagination-container">
         <ul className="pagination">
            {pageNumbers.map((number) => (
               <li key={number} className="page-number">
                  <a href='!#' className='page-link'>
                  {number}
                  </a>
               </li>
            ))}
         </ul>
      </div>
   );
   
};
 
export default Pagination;