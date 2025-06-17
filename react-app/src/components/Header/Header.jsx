import { useState } from "react";

import { NavLink } from "react-router";

import "/src/index.css";

export default function Header() {
  return (
    <header className="sticky top-0 z-10">
      <div className="flex h-max w-full justify-center items-center bg-[#424242] text-[#000000] p-2">
        <div className="flex">
          <div className="relative w-[160px] h-max">
            <NavLink to="/">
              <img src="\src\assets\puteved (2).png" alt="logo" />
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
