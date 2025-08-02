"use client"

import {useEffect, useState} from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/posts')
    .then(res => res.json())
    .then(data => {
      setPosts(data);
      console.log(data);
    })
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post: any) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}