import React, { useState, useEffect } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';

function Posts() {
  const { objectID } = useParams(); // Get the objectID from the route parameters
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    // Function to fetch post details when the component mounts
    const fetchPostDetails = async () => {
      try {
        // Make an API request to fetch post details based on the objectID
        const response = await fetch(`http://hn.algolia.com/api/v1/items/${objectID}`);
        const data = await response.json();
        setPostDetails(data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    // Call the fetchPostDetails function when the objectID changes
    fetchPostDetails();
  }, [objectID]);

  return (
    <div className="post-detail">
      <h2 className="post-title">
        {postDetails ? postDetails.title : 'Not available'}
        {/* Display post title or 'Not available' if postDetails is not available */}
      </h2>
      <div className="post-meta">
        <p>
          Points: {postDetails ? postDetails.points : 'Not available'}
          {/* Display post points or 'Not available' if postDetails is not available */}
        </p>
      </div>
      <h3>Comments:</h3>
      <ul className="post-comments">
        {postDetails && postDetails.children ? (
          postDetails.children.map((comment) => (
            <li key={comment.id} className="comment">
              <div className="comment-content">
                <p className="comment-author">
                  Author: {comment.author || 'Not available'}
                  {/* Display comment author or 'Not available' if comment author is missing */}
                </p>
                <p className="comment-text">
                  {comment.text || 'Not available'}
                  {/* Display comment text or 'Not available' if comment text is missing */}
                </p>
              </div>
              <div className="comment-date">
                Date: {comment.created_at || 'Not available'}
                {/* Display comment creation date or 'Not available' if date is missing */}
              </div>
            </li>
          ))
        ) : (
          <li className="comment">
            <div className="comment-content">
              <p className="comment-text">No comments available</p>
              {/* Display 'No comments available' if comments array is missing */}
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Posts;
