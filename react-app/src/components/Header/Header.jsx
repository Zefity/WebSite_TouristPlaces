import { useState } from "react";

import { NavLink } from "react-router";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import "/src/index.css";

export default function Header() {
  const [inputValue, setInputValue] = useState("");
  const [isInputFilled, setIsInputFilled] = useState(false);

  const handleInputChange = (value) => {
    setInputValue(value);
    setIsInputFilled(value.trim() !== "");
  };

  return (
    <header className="sticky top-0 z-10">
      <div className="flex h-max w-full justify-center items-center bg-[#424242] text-[#000000] p-2">
        <div className="flex">
          <div className="relative w-[160px] h-max">
            <NavLink to="/">
              <img src="\src\assets\puteved (2).png" alt="logo" />
            </NavLink>
          </div>
          {/* <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="p-[20px] text-1xl">
                    Города
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-max">
                      <li>Москва</li>
                      <li>
                        Волгоградская область
                        <ul className="pl-3">
                          <li>Волгоград</li>
                          <li>Волжский</li>
                        </ul>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div> */}
        </div>

        {/* <div>
          <Command>
            <CommandInput
              className="w-[500px]"
              placeholder="Type a command or search..."
              value={inputValue}
              onValueChange={handleInputChange}
            />
            <CommandList className="w-full">
              {isInputFilled ? (
                <>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandItem>Calendar</CommandItem>
                  <CommandItem>Search Emoji</CommandItem>
                  <CommandItem>Calculator</CommandItem>
                  <CommandItem>cal</CommandItem>
                  <CommandItem>Search Emoji</CommandItem>
                  <CommandItem>Calculator</CommandItem>
                </>
              ) : (
                ""
              )}
            </CommandList>
          </Command>
        </div> */}
      </div>
    </header>
  );
}
