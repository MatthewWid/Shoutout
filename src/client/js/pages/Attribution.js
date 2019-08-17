import React, {useEffect} from "react";
import Layout from "./Layout.js";

const Attribution = () => {
	useEffect(() => {
		document.title = "Attribution - Shoutout";
	}, []);

	return (
		<Layout page="attribution">
			<div className="content__panel card attribution">
				<h1 className="attribution__header">Attributions</h1>
				<ul className="attribution__list">
					<li><a href="https://fontawesome.com/icons/heart?style=regular">"heart (Regular Style)"</a> by <a href="https://fontawesome.com/license/free">FontAwesome</a> is licenced under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></li>
					<li><a href="https://fontawesome.com/icons/heart?style=solid">"heart (Solid Style)"</a> by <a href="https://fontawesome.com/license/free">FontAwesome</a> is licenced under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></li>
					<li><a href="https://fontawesome.com/icons/moon?style=regular">"moon (Regular Style)"</a> by <a href="https://fontawesome.com/license/free">FontAwesome</a> is licenced under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></li>
					<li><a href="https://fontawesome.com/icons/moon?style=solid">"moon (Solid Style)"</a> by <a href="https://fontawesome.com/license/free">FontAwesome</a> is licenced under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></li>
					<li><a href="https://fontawesome.com/icons/ellipsis-v?style=solid">"ellipsis-v (Solid Style)"</a> by <a href="https://fontawesome.com/license/free">FontAwesome</a> is licenced under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></li>
					<li><a href="https://fontawesome.com/icons/cog?style=solid">"cog (Solid Style)"</a> by <a href="https://fontawesome.com/license/free">FontAwesome</a> is licenced under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></li>
					<li><a href="https://fontawesome.com/icons/sign-out-alt?style=solid">"sign-out-alt (Solid Style)"</a> by <a href="https://fontawesome.com/license/free">FontAwesome</a> is licenced under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></li>
					<li><a href="https://fontawesome.com/icons/user?style=solid">"user (Solid Style)"</a> by <a href="https://fontawesome.com/license/free">FontAwesome</a> is licenced under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></li>
					<li><a href="https://fontawesome.com/icons/home?style=solid">"home (Solid Style)"</a> by <a href="https://fontawesome.com/license/free">FontAwesome</a> is licenced under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></li>
					<li><a href="https://fontawesome.com/icons/globe-americas?style=solid">"globe-americas (Solid Style)"</a> by <a href="https://fontawesome.com/license/free">FontAwesome</a> is licenced under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></li>
					<li><a href="https://loading.io/icon/kbmzeh">"comet" spinner</a> by <a href="https://loading.io/">loading.io</a>  is licenced under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></li>
				</ul>
			</div>
		</Layout>
	);
};

export default Attribution;
