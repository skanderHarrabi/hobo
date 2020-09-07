import React from "react";
const CloseIcon = props => {
    return (
        <svg
            id="cross"
            xmlns="http://www.w3.org/2000/svg"
            width="22.455"
            height="22.411"
            viewBox="0 0 22.455 22.411"
        >
            <g id="Group_24" data-name="Group 24" transform="translate(0 0)">
                <path
                    id="Path_42"
                    data-name="Path 42"
                    d="M22.455,1.9,21.153.6,11.228,10.51,1.3.6,0,1.9l9.926,9.907L0,21.715l1.3,1.3,9.926-9.906,9.926,9.906,1.3-1.3-9.926-9.906Z"
                    transform="translate(0 -0.603)"
                    fill={props.fill}
                />
            </g>
        </svg>
    );
};

export default CloseIcon;
