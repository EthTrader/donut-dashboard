import React from 'react';

const images = [
    "https://donut-dashboard.com/01.png", 
    "https://donut-dashboard.com/02.png", 
    "https://donut-dashboard.com/03.png", 
    "https://donut-dashboard.com/04.png", 
    "https://donut-dashboard.com/05.png", 
    "https://donut-dashboard.com/06.png", 
    "https://donut-dashboard.com/07.png", 
    "https://donut-dashboard.com/08.png", 
    "https://donut-dashboard.com/09.png", 
    "https://donut-dashboard.com/10.png", 
    "https://donut-dashboard.com/11.png", 
    "https://donut-dashboard.com/12.png", 
    "https://donut-dashboard.com/13.png", 
    "https://donut-dashboard.com/14.png", 
    "https://donut-dashboard.com/15.png", 
    "https://donut-dashboard.com/16.png", 
    "https://donut-dashboard.com/17.png", 
    "https://donut-dashboard.com/18.png", 
    "https://donut-dashboard.com/19.png", 
    "https://donut-dashboard.com/20.png", 
    "https://donut-dashboard.com/21.png", 
    "https://donut-dashboard.com/22.png", 
    "https://donut-dashboard.com/23.png", 
    "https://donut-dashboard.com/24.png", 
    "https://donut-dashboard.com/25.png", 
    "https://donut-dashboard.com/26.png", 
    "https://donut-dashboard.com/27.png", 
    "https://donut-dashboard.com/28.png", 
    "https://donut-dashboard.com/29.png", 
    "https://donut-dashboard.com/30.png", 
    "https://donut-dashboard.com/31.png", 
    "https://donut-dashboard.com/32.png", 
    "https://donut-dashboard.com/33.png", 
];
const delay = 4000;

function Slideshow() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {images.map((image, index) => (
            <div className="slide" key={index} style={{ backgroundImage: `url(${image})`}} />
        ))}
      </div>
    </div>
  );
}

export default Slideshow;
