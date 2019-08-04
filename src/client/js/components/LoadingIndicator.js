import React from "react";
import InlineSvg from "react-inlinesvg";

const LoadingIndicator = (props) => (
	<div className="loading">
		<InlineSvg
			className="loading__icon svg"
			src="./images/icons/loading-comet.svg"
			cacheGetRequests
		></InlineSvg>
	</div>
);

export default LoadingIndicator;
