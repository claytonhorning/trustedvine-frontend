import {
  IconMapPin,
  IconSpeakerphone,
  IconShieldCheck,
  IconBookmark,
} from "@tabler/icons-react";
import Image from "next/image";
import Contractor from "./contractor";

interface IContractorListingProps {
  name: string;
  id: number;
  numRecs: number;
  city: string;
  phone: string;
  email: string;
  website: string;
  recommendations: [any];
}

const ContractorListing: React.FC<
  IContractorListingProps
> = ({
  name,
  id,
  numRecs,
  city,
  phone,
  website,
  email,
  recommendations,
}) => {
  function formatISODateToShortDate(isoDateString: any) {
    // Create a new Date object from the ISO date string
    const date = new Date(isoDateString);

    // Get the month, day, and year from the Date object
    const month = date.getUTCMonth() + 1; // getUTCMonth() returns 0-based month
    const day = date.getUTCDate();
    const year = date.getUTCFullYear().toString().slice(-2); // Get last two digits of the year

    // Format the date as M/D/YY
    return `${month}/${day}/${year}`;
  }

  function filterUniqueRecommendations(data: any) {
    // Create a Map to store the first occurrence of each userRecommenderId
    const uniqueRecommendations = new Map();

    // Iterate through the recommendations array
    data.forEach((recommendation: any) => {
      // Add the recommendation to the map if the userRecommenderId is not already present
      if (
        !uniqueRecommendations.has(
          recommendation.userRecommenderId
        )
      ) {
        uniqueRecommendations.set(
          recommendation.userRecommenderId,
          recommendation
        );
      }
    });

    // Convert the Map values to an array and return it
    return Array.from(uniqueRecommendations.values());
  }

  const uniqueRecommendations =
    filterUniqueRecommendations(recommendations);

  console.log(recommendations.length);

  return (
    <div className="flex flex-row gap-6 justify-between min-h-screen">
      <section className="w-8/12">
        <div className="flex flex-row items-center ">
          <h2 className="text-black font-medium text-3xl mr-2">
            {name}
          </h2>
          <IconBookmark
            size={30}
            className="text-[#4F772D] cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center">
            <p className="text-sm text-[#31572C] font-medium mr-2">
              {numRecs !== 1
                ? numRecs + " locals recommend"
                : numRecs + " local recommends"}
            </p>
            <IconMapPin
              size={14}
              className="mr-1 text-gray-700"
            />
            <p className="text-sm font-medium text-gray-700">
              {city == undefined ? "Unknown" : city}
            </p>
          </div>
          {/* <div className="flex flex-row gap-2">
            <div className="flex flex-row self-start border-2 p-3 border-purple-700 rounded-md shadow-sm shadow-purple-400">
              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  <IconSpeakerphone
                    size={18}
                    className="mr-1 text-purple-700"
                  />
                  <p className="text-purple-700 text-sm">
                    Most Recommended by Friends
                  </p>
                </div>

                <div className="flex flex-row text-gray-700 mt-2 items-center">
                  <Image
                    src={"/leo.jpeg"}
                    width={25}
                    height={25}
                    alt="Picture of the author"
                    className="rounded-full mr-3"
                  />

                  <p className="text-xs">
                    Leontina G., Susan L., and Cameron H.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row self-start border-2 p-3 border-blue-600 rounded-md shadow-sm shadow-blue-600">
              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  <IconShieldCheck
                    size={18}
                    className="mr-1 text-blue-600"
                  />
                  <p className="text-blue-600 text-sm">
                    Verified
                  </p>
                </div>

                <div className="flex flex-row text-gray-700 mt-2">
                  <p className="text-xs">
                    Licensed, Insured, and Background
                    Checked
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="flex flex-col mt-5">
          <h4 className="text-black text-large font-semibold">
            Contact Information
          </h4>
          <div className="flex flex-row mt-2 gap-4">
            <p className="text-sm text-black font-medium">
              Phone:
              <a
                href={`tel:${phone}`}
                className="text-[#4F772D] ml-1"
              >
                {phone}
              </a>
            </p>
            <p className="text-sm text-black font-medium">
              Email:
              <a
                href={`mail:${email}}`}
                className="text-[#4F772D] ml-1"
              >
                {email}
              </a>
            </p>
            <p className="text-sm text-black font-medium">
              Website:
              <a
                href={website}
                className="text-[#4F772D] ml-1"
              >
                {website}
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-5">
          <h4 className="text-black text-large font-semibold">
            Photos of Past Work
          </h4>
          <div className="flex flex-row mt-2">
            {/* <Image
              src="/deck.jpeg"
              height={300}
              width={300}
              alt="logo"
              className="mr-2"
            />
            <div className="grid grid-cols-2 gap-2 w-full">
              <div className="relative">
                <Image
                  alt="Mountains"
                  src={"/deck.jpeg"}
                  quality={100}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="relative">
                <Image
                  alt="Mountains"
                  src={"/deck.jpeg"}
                  quality={100}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="relative">
                <Image
                  alt="Mountains"
                  src={"/deck.jpeg"}
                  quality={100}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="relative">
                <Image
                  alt="Mountains"
                  src={"/deck.jpeg"}
                  quality={100}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div> */}
            {/* </div> */}
            <p className="text-black text-md">
              No photos yet.
            </p>
          </div>
        </div>
      </section>
      <section className="w-80 mt-3 h-full">
        <div className="border-2 border-[#31572C] rounded-md shadow-green-800 shadow-sm overflow-auto max-h-3/4">
          {uniqueRecommendations?.map(
            (recommendation, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="flex flex-col p-3 bg-[#F5FFEA] rounded-md"
                  >
                    <div className="self-end">
                      <p className="text-gray-500 font-medium text-xs">
                        {formatISODateToShortDate(
                          recommendation?.date
                        )}
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <div className="relative w-16 h-16 mr-3">
                        <Image
                          src={"/profile-user.png"}
                          fill
                          alt="profile"
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      <p className="text-black text-sm">
                        <span className="font-semibold mr-1">
                          {recommendation?.name}
                        </span>
                        recommended this contractor
                      </p>
                    </div>
                    {recommendation?.comments && (
                      <p className="text-gray-700 text-sm mt-2">
                        {recommendation?.comments}
                      </p>
                    )}
                  </div>
                  {uniqueRecommendations.length !==
                  index + 1 ? (
                    <hr className="border-[#31572C]" />
                  ) : (
                    <></>
                  )}
                </>
              );
            }
          )}
        </div>
      </section>
    </div>
  );
};

export default ContractorListing;
