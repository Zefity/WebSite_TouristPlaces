import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { useQuery, gql } from "@apollo/client";

import { useNavigate } from "react-router";

import { useParams } from "react-router";

// const GET_LOCATIONS = gql`
//   query {
//     locations{
//       title
//       describe
//       photo {
//       }
//     }
// `;

export default function Main() {
  const navigate = useNavigate();
  const { slug } = useParams();

  console.log(slug);

  const GET_LOCATIONS = gql`
    query {
      locations(filters: { city: { slug: { eq: "${slug}" } } }) {
        title
        describe
        photo {
          url
        }
        slug
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  return (
    <main className="px-[200px]">
      <section className=" bg-[#FFFFFF] text-gray-800 p-5 my-5 shadow-sm rounded-lg">
        {data.locations.map((location, index) => (
          <article
            className="flex mt-5 p-4 shadow-slate-400 hover:shadow-xl shadow-lg transition duration-300 rounded-lg cursor-pointer"
            key={index}
          >
            {console.log(location)}
            <Carousel className="w-full max-w-[400px] max-h-[228px]">
              <CarouselContent>
                {location.photo.map((photo, index) => (
                  <CarouselItem key={index}>
                    <div className="w-[400px] p-1">
                      <AspectRatio ratio={16 / 9} className="bg-muted">
                        <img
                          src={`http://localhost:1337${photo.url}`}
                          className="h-full w-full rounded-md object-cover bg-none"
                        />
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            <a
              onClick={() => {
                navigate(`about/${location.slug}`);
              }}
              className="block text-black hover:text-gray-700"
            >
              <div>
                <div className="flex flex-col ml-6">
                  <h2 className="font-serif text-5xl font-semibold">
                    {location.title}
                  </h2>

                  <p className="font-serif text-lg truncate whitespace-pre-line line-clamp-6 h-[170px] mt-2">
                    {location.describe}
                  </p>
                </div>
              </div>
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
