import React from "react";
import { footerLinks } from "~/constant";
import { Facebook, Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="py-5 sm:px-10 px-5">
      <div className="screen-max-width">
        <div className="flex flex-col">
          <p className="text-sm text-gray font-semibold">
            More ways to shop :{" "}
            <a
              href="https://www.apple.com/vn/store"
              className="underline text-blue"
            >
              Find Apple Store
            </a>
            <br />
            Or call : 0327957420
          </p>
          <div className="my-5 h-[1px] bg-gray-50"></div>
          <div className="flex items-center justify-start flex-1 gap-5">
            <p className="text-sm text-gray font-semibold">
              {" "}
              Developed by : Thịnh
            </p>
            <div className="flex-center gap-2" >
                <a href="https://github.com/thinhkp" target="_blank">
                <Github className="w-6 h-6"/>

                </a>
                <a href="https://www.facebook.com/mthinh04/" target="_blank">
                    <Facebook className="w-6 h-6"/>
                </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
