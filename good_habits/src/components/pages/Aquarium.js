import React from 'react';

export default function Aquarium() {
    const [position, setPosition]  = React.useState({x: 0, y: 0});
    const [isPlaceItem, setIsPlaceItem] = React.useState(false);
    const [size, setSize] = React.useState({}) 
    const handleResize = () => {
        setSize({height: window.innerWidth, width: window.innerWidth});
    }

    React.useEffect(()=>{
        handleResize();
        window.addEventListener('resize', handleResize);
    },[]);

    return (
        <div>
            From aquarium
        </div>
    )
}
