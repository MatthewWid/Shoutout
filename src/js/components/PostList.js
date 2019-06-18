import React from "react";
import Post from "./Post.js";

const PostList = ({posts}) => (
	posts.map((post, index) => <Post key={index} post={post} />)
);

export default PostList;
