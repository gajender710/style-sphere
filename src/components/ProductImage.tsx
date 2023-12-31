import { useState, useRef } from "react";
import Dog from "../assets/images/dog.png";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function ProductImage({ images }: any) {
  const [mainImg, setMainImg] = useState(images[0]);
  const ref = useRef<any>();

  function scroll(scrollOffset: any) {
    ref.current.scrollLeft += scrollOffset;
  }

  return (
    <div className="w-full md:w-1/2 max-w-md border border-palette-lighter bg-white rounded shadow-lg">
      <div className="flex relative items-center  justify-center">
        <img
          src={mainImg}
          className="h-[20rem] transform duration-500 ease-in-out hover:scale-105 my-4 rounded-lg"
        />
      </div>
      <div className="relative flex border-t border-palette-lighter">
        <button
          aria-label="left-scroll"
          className="h-32 bg-palette-lighter hover:bg-palette-light  absolute left-0 z-10 opacity-75"
          onClick={() => scroll(-300)}
        >
          <FaArrowLeft className="w-3 mx-1 text-palette-primary" />
        </button>
        <div
          ref={ref}
          style={{ scrollBehavior: "smooth" }}
          className="flex space-x-1 w-full overflow-auto border-t border-palette-lighter"
        >
          {images.map((imgItem: any, index: any) => (
            <button
              key={index}
              className="relative w-40 h-32 flex-shrink-0 rounded-sm "
              onClick={() => setMainImg(imgItem)}
            >
              <img src={imgItem} className="object-contain w-full h-full" />
            </button>
          ))}
        </div>
        <button
          aria-label="right-scroll"
          className="h-32 bg-palette-lighter hover:bg-palette-light  absolute right-0 z-10 opacity-75"
          onClick={() => scroll(300)}
        >
          <FaArrowRight className="w-3 mx-1 text-palette-primary" />
        </button>
      </div>
    </div>
  );
}

export default ProductImage;
