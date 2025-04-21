import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";

import { useNavigate } from "react-router";

import { useQuery, gql } from "@apollo/client";

const GET_CITIES = gql`
  query {
    cities {
      title
      slug
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_CITIES);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <img
        src="\src\assets\puteved (2) (1).png"
        alt="logo"
        className="relative z-10 w-[100px] rounded-xl"
      />
      <div className="absolute h-screen w-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        >
          <source
            src="\src\assets\158349-816637197_small.mp4"
            type="video/mp4"
          />
          Ваш браузер не поддерживает видео.
        </video>
        /
      </div>
      <div className="relative m-[120px] flex justify-center items-center">
        <Command>
          <CommandInput
            className="w-[500px]"
            placeholder="Type a command or search..."
            onValueChange={(value) => {
              setInputValue(value);
            }}
          />
          <CommandList className="w-full">
            {inputValue && (
              <>
                <CommandEmpty>No results found.</CommandEmpty>

                {data?.cities?.map((city, index) => {
                  return (
                    <CommandItem
                      onSelect={() => {
                        navigate(`/cities/${city.slug}`);
                      }}
                      key={index}
                      className="text-lg text-black"
                    >
                      {city.title}
                    </CommandItem>
                  );
                })}
              </>
            )}
          </CommandList>
        </Command>
      </div>
    </div>
  );
}
