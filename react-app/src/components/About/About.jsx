import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
} from "@pbe/react-yandex-maps";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const API_KEY = "d8cac659-8954-43a8-b729-6e2f2abe9882";

export default function About() {
  const [center, setCenter] = useState(null);
  const [ymapsReady, setYmapsReady] = useState(false);

  const { slug } = useParams();

  const GET_LOCATION = gql`
    query {
      locations(filters: { slug: { eq: "${slug}" } }) {
        title
        describe
        address
        city{
          title
        }
        photo {
          url
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_LOCATION, {
    variables: { slug },
  });

  useEffect(() => {
    if (!data?.locations[0].title || center) return;

    const fetchCoords = async () => {
      try {
        await window.ymaps.ready();
        setYmapsReady(true);
        const res = await window.ymaps.geocode(data.locations[0].address);
        const coords = res.geoObjects.get(0).geometry.getCoordinates();
        setCenter(coords);
      } catch (e) {
        console.error("Ошибка загрузки координат:", e);
      }
    };

    fetchCoords();
  }, [data, center]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const location = data.locations[0];

  return (
    <div className=" bg-white py-6 my-5 mx-[50px] shadow rounded-lg">
      <div className="flex flex-col justify-center">
        <div className="flex justify-center mb-5">
          <h1 className="font-serif text-[90px] font-semibold">
            {location.title}
          </h1>
        </div>
        <div className="flex justify-center">
          <Carousel className="w-full max-w-[1200px] max-h-[900px]">
            <CarouselContent>
              {location.photo.map((photo, index) => (
                <CarouselItem key={index}>
                  <div className="w-[1200px] p-1">
                    <AspectRatio ratio={16 / 9} className="bg-muted">
                      <img
                        src={`http://localhost:1337${photo.url}`}
                        className="h-full w-full rounded-md object-cover bg-none"
                        alt={`Image for ${location.title}`}
                      />
                    </AspectRatio>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="mt-5 m-10 p-2 rounded-lg">
          <div className="flex-1 relative right-3">
            <p className="font-serif text-xl">{location.describe}</p>
          </div>
          {center ? (
            <div className="mt-10">
              <YMaps
                key={slug}
                query={{
                  apikey: API_KEY,
                  load: "geocode",
                }}
              >
                <Map
                  width="100%"
                  height={400}
                  state={{ center: center, zoom: 13 }}
                >
                  <Placemark geometry={center} />
                  <FullscreenControl />
                </Map>
              </YMaps>
            </div>
          ) : (
            <p>Карта загружаются...</p>
          )}
        </div>
      </div>
    </div>
  );
}
