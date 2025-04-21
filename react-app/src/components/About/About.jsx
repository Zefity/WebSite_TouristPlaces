//Карусель для картинок
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

//Яндекс карты
import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
} from "@pbe/react-yandex-maps";

//Делает картинку красивее соотношая стороны
import { AspectRatio } from "@/components/ui/aspect-ratio";

//GraphQL и обработка запросов
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

const API_KEY = "d8cac659-8954-43a8-b729-6e2f2abe9882";

export default function About() {
  const [hotels, setHotels] = useState([]);
  const [center, setCenter] = useState([55.751244, 37.618423]);

  const { slug } = useParams();

  const GET_LOCATION = gql`
    query {
      locations(filters: { slug: { eq: "${slug}" } }) {
        title
        describe
        photo {
          url
        }
        map{
          longitude
          latitude
        }
      }
    }
  `;

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    const query = encodeURIComponent("отели");
    const url = `https://search-maps.yandex.ru/v1/?apikey=${API_KEY}&text=${query}&lang=ru_RU&type=biz&ll=${center[1]},${center[0]}&spn=0.1,0.1&results=10`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const foundHotels = data.features.map((hotel) => ({
        id: hotel.properties.CompanyMetaData.id,
        name: hotel.properties.name,
        coords: hotel.geometry.coordinates.reverse(),
      }));
      setHotels(foundHotels);
      console.log(hotels);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  const { loading, error, data } = useQuery(GET_LOCATION);

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
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="w-[1200px] p-1">
                    <AspectRatio ratio={16 / 9} className="bg-muted">
                      <img
                        src="\src\assets\yuriy_ufimcev_fioletovyy_zakat_536530.jpg"
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
          <div className="mt-10">
            <YMaps>
              <Map
                width="100%"
                height={400}
                defaultState={{
                  center: [location.map.longitude, location.map.latitude],
                  zoom: 13,
                }}
              >
                <Placemark
                  geometry={[location.map.longitude, location.map.latitude]}
                />
                <FullscreenControl />
              </Map>
            </YMaps>
          </div>
        </div>
      </div>
    </div>
  );
}
