import React, { useState, useEffect } from 'react';
import '../App.css'
import { useParams } from 'react-router-dom';

function Posts() {
  const { objectID } = useParams(); // Get the objectID from the route parameters
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://hn.algolia.com/api/v1/items/${objectID}`);
        const data = await response.json();
        setPostDetails(data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [objectID]);

  // ...

return (
    <div className="post-detail">
      <h2 className="post-title">{postDetails ? postDetails.title : 'Loading...'}</h2>
      <div className="post-meta">
        <p>Points: {postDetails ? postDetails.points : 'Loading...'}</p>
      </div>
      <h3>Comments:</h3>
      <ul className="post-comments">
        {postDetails &&
          postDetails.children.map((comment) => (
            <li key={comment.id} className="comment">
              <div className="comment-content">
                <p className="comment-author">Author: {comment.author}</p>
                <p className="comment-text">{comment.text}</p>
              </div>
              <div className="comment-date">Date: {comment.created_at}</div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Posts;
