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
					<li>
						<a href="https://fontawesome.com/icons/heart?style=regular">"heart (Regular Style)"</a> by <a href="https://fontawesome.com/license/free">FontAwesome</a> is licenced under <a href="https://creativecommons.org/licenses/by/4.0/">CC by 4.0</a>
					</li>
					<li>
						<a href="https://fontawesome.com/icons/heart?style=solid">"heart (Solid Style)"</a> by <a href="https://fontawesome.com/license/free">FontAwesome</a> is licenced under <a href="https://creativecommons.org/licenses/by/4.0/">CC by 4.0</a>
					</li>
					<li>
						<a href="https://fontawesome.com/icons/moon?style=regular">"moon (Regular Style)"</a> by <a href="https://fontawesome.com/license/free">FontAwesome</a> is licenced under <a href="https://creativecommons.org/licenses/by/4.0/">CC by 4.0</a>
					</li>
					<li>
						<a href="https://fontawesome.com/icons/moon?style=solid">"moon (Solid Style)"</a> by <a href="https://fontawesome.com/license/free">FontAwesome</a> is licenced under <a href="https://creativecommons.org/licenses/by/4.0/">CC by 4.0</a>
					</li>
					<li>
						<a href="https://fontawesome.com/icons/ellipsis-v?style=solid">"ellipsis-v (Solid Style)"</a> by <a href="https://fontawesome.com/license/free">FontAwesome</a> is licenced under <a href="https://creativecommons.org/licenses/by/4.0/">CC by 4.0</a>
					</li>
					<li>
						<a href="https://loading.io/icon/kbmzeh">"comet" spinner</a> by <a href="https://loading.io/">Loading.io</a>
					</li>
				</ul>
			</div>
		</Layout>
	);
};

export default Attribution;
