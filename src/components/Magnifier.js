import React, { useState } from 'react';
import ReactCursorPosition from 'react-cursor-position';
import Img from 'gatsby-image';

const Magnifier = ({classes, image}) => {

	const [position, setPosition] = useState({});
	const [showImage, toggleImage] = useState(false);

	const fullImage = React.createRef();

	const setZoom  = (e) => {

    	if(e.isPositionOutside || !e.isActive) {
    		return;
    	}

    	const
	    	image = {
	    		w: fullImage.current.props.fixed.width,
	    		h: fullImage.current.props.fixed.height
	    	},

			mouse = {
	    		x: e.position.x,
	    		y: e.position.y
	    	},

    		container = {
	    		w: e.elementDimensions.width,
	    		h: e.elementDimensions.height
	    	},
	    	movement = {};
	    	movement.x = mouse.x / container.w;
	    	movement.y = mouse.y / container.h;
	    	// movement.x = mouse.x / container.w;
	    	// movement.y = mouse.y / container.h;
	    ;

    	const x = ((image.w/2) - container.w/2) - ((image.w - container.w) * movement.x);
    	const y = ((image.h/2) - container.h/2) - ((image.h - container.h) * movement.y);

    	setPosition({x,y});
    }

    const initZoom = (e) => {
    	toggleImage(e.isActive);
    }


    const styles = {
    	top: 0,
    	left: 0,
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: showImage ? 1 : 0,
        transition: 'opacity .2s ease-in-out',
        cursor: 'crosshair'
    };

	return(
		<ReactCursorPosition
			hoverDelayInMs='200'
			onActivationChanged={initZoom}
    		onPositionChanged={setZoom}
    		className={classes}
    	>
        	<div className="image-wrapper">
        		<div className="zoom-image">
        			<Img fixed={image.fixed} style={styles} ref={fullImage}/>
        		</div>
            	<Img fluid={image.fluid} />
            </div>
        </ReactCursorPosition>
   );
}

export default Magnifier;
