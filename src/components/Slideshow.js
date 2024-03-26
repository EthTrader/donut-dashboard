import React from 'react';

const prefix = "https://donut-dashboard.com/";
const postfix = ".png";

let images = [prefix + "01" + postfix];

const sundayImages = [
  prefix + "01" + postfix,
  prefix + "08" + postfix,
  prefix + "15" + postfix,
  prefix + "22" + postfix,
  prefix + "29" + postfix,
  prefix + "36" + postfix,
  prefix + "43" + postfix,
  prefix + "50" + postfix,
  prefix + "57" + postfix,
  prefix + "64" + postfix,
  prefix + "71" + postfix,
  prefix + "78" + postfix,
];

const mondayImages = [
  prefix + "02" + postfix,
  prefix + "09" + postfix,
  prefix + "16" + postfix,
  prefix + "23" + postfix,
  prefix + "30" + postfix,
  prefix + "37" + postfix,
  prefix + "44" + postfix,
  prefix + "51" + postfix,
  prefix + "58" + postfix,
  prefix + "65" + postfix,
  //72 missing because it was terrible
];

const tuesdayImages = [
  prefix + "03" + postfix,
  prefix + "10" + postfix,
  prefix + "17" + postfix,
  prefix + "24" + postfix,
  prefix + "31" + postfix,
  prefix + "38" + postfix,
  prefix + "45" + postfix,
  prefix + "52" + postfix,
  prefix + "59" + postfix,
  prefix + "66" + postfix,
  prefix + "73" + postfix,
];

const wednesdayImages = [
  prefix + "04" + postfix,
  prefix + "11" + postfix,
  prefix + "18" + postfix,
  prefix + "25" + postfix,
  prefix + "32" + postfix,
  prefix + "39" + postfix,
  prefix + "46" + postfix,
  prefix + "53" + postfix,
  prefix + "60" + postfix,
  prefix + "67" + postfix,
  prefix + "74" + postfix,
];

const thursdayImages = [
  prefix + "05" + postfix,
  prefix + "12" + postfix,
  prefix + "19" + postfix,
  prefix + "26" + postfix,
  prefix + "33" + postfix,
  prefix + "40" + postfix,
  prefix + "47" + postfix,
  prefix + "54" + postfix,
  prefix + "61" + postfix,
  prefix + "68" + postfix,
  prefix + "75" + postfix,
];

const fridayImages = [
  prefix + "06" + postfix,
  prefix + "13" + postfix,
  prefix + "20" + postfix,
  prefix + "27" + postfix,
  prefix + "34" + postfix,
  prefix + "41" + postfix,
  prefix + "48" + postfix,
  prefix + "55" + postfix,
  prefix + "62" + postfix,
  prefix + "69" + postfix,
  prefix + "76" + postfix,
];

const saturdayImages = [
  prefix + "07" + postfix,
  prefix + "14" + postfix,
  prefix + "21" + postfix,
  prefix + "28" + postfix,
  prefix + "35" + postfix,
  prefix + "42" + postfix,
  prefix + "49" + postfix,
  prefix + "56" + postfix,
  prefix + "63" + postfix,
  prefix + "70" + postfix,
  prefix + "77" + postfix,
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const d = new Date();
let day = weekday[d.getDay()];

if (day === "Sunday") images = sundayImages;
if (day === "Monday") images = mondayImages;
if (day === "Tuesday") images = tuesdayImages;
if (day === "Wednesday") images = wednesdayImages;
if (day === "Thursday") images = thursdayImages;
if (day === "Friday") images = fridayImages;
if (day === "Saturday") images = saturdayImages;
if (!day) images = sundayImages;
images = shuffle(images);

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
          <div className="slide" key={index} style={{ backgroundImage: `url(${image})` }} />
        ))}
      </div>
    </div>
  );
}

export default Slideshow;
