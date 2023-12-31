import {
  FaFacebookSquare,
  FaHeart,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import {} from "react-icons/fa";

import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-4 flex justify-center font-primary items-center bg-slate-50">
      <div className="w-full flex  flex-row items-center justify-between px-4 sm:px-16">
        <div className="w-[30%]">
          <img
            src={Logo}
            alt="Logo"
            className=" w-28 h-20 md:w-44 md:h-32  lg:w-56 lg:h-36 object-contain rounded-t-[70%]"
          />
        </div>

        <div className="flex w-[70%] justify-center">
          <div className="flex flex-row items-center w-full   sm:mb-0">
            <h4 className="text-2xl font-semibold mr-6">Social:</h4>
            <ul className="flex flex-row list-none p-0 gap-x-4">
              <li>
                <Link to="#">
                  <FaInstagram className="text-pink-700" size={30} />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <FaTwitter size={30} />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <FaFacebookSquare size={30} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
