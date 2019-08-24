import React, {useEffect} from "react";
import Layout from "./Layout.js";
import PanelUser from "../components/PanelUser.js";
import PanelPost from "../components/PanelPost.js";

const Post = (props) => {
	return (
		<Layout page="post">
			<PanelUser />
			<PanelPost
				postId={props.match.params.postId}
				redirect={props.history.push}
			/>
		</Layout>
	);
};

export default Post;
