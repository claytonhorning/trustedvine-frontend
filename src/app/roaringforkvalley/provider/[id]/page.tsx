import ContractorListing from "@/components/contractorListing";
import Link from "next/link";
import Contractor from "@/components/contractor";
import { shuffle } from "lodash";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: any;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages =
    (await parent).openGraph?.images || [];
  const provider = await fetch(
    `${process.env.TRUSTEDVINE_API_URL}/providers/${params?.id}`
  ).then((res) => res.json());
  return {
    title: `${provider?.name}`,
    description: `${provider?.name} - ${provider?.categories[0]} Service Provider in the Roaring Fork Valley`,
    openGraph: {
      images: [
        `${process.env.TRUSTEDVINE_ADMIN_URL}/media/${provider?.filename}`,
        ...previousImages,
      ],
      title: `${provider?.name}`,
      description: `${provider?.categories[0]} Service Provider`,
    },
  };
}

export default async function Listing({ params }: Props) {
  async function getData() {
    const options: RequestInit = {
      method: "GET",
      cache: "no-store",
    };
    const res = await fetch(
      `${process.env.TRUSTEDVINE_API_URL}/providers/${params?.id}`,
      options
    );
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }

  function countUniqueRecommendations(data: any) {
    const uniqueRecommenderIds = new Set();
    data.forEach((recommendation: any) => {
      uniqueRecommenderIds.add(
        recommendation.userRecommenderId
      );
    });
    return uniqueRecommenderIds.size;
  }

  const data = await getData();

  async function getOtherProviders() {
    const options: RequestInit = {
      method: "GET",
      cache: "no-store",
    };
    const response = await fetch(
      `${process.env.TRUSTEDVINE_API_URL}/providers/?category=${data?.categories[0]}`,
      options
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    let providers = await response.json();
    providers = providers.filter(
      (provider: any) => provider._id !== data._id
    );

    // Shuffle to randomize the order
    providers = shuffle(providers);

    const targetRecommendationCount =
      countUniqueRecommendations(data?.recommendations);
    const tolerance = 4; // Adjust tolerance if necessary

    // Filter providers within the recommendation count tolerance
    let similarProviders = providers.filter(
      (provider: any) => {
        const withinRange =
          provider.numberOfUniqueRecommenders >=
            targetRecommendationCount - tolerance &&
          provider.numberOfUniqueRecommenders <=
            targetRecommendationCount + tolerance;

        return withinRange;
      }
    );

    // If not enough similar providers, add others to ensure there are always three suggestions
    if (similarProviders.length < 3) {
      const additionalProviders = providers
        .filter(
          (provider: any) =>
            !similarProviders.includes(provider)
        )
        .slice(0, 3 - similarProviders.length);
      similarProviders = [
        ...similarProviders,
        ...additionalProviders,
      ];
    }

    return similarProviders.slice(0, 3);
  }

  const otherProviderData = await getOtherProviders();

  return (
    <div>
      <ContractorListing
        name={data?.name}
        id={data?.id}
        numRecs={countUniqueRecommendations(
          data?.recommendations
        )}
        logo={
          data?.filename !== null &&
          data?.filename !== undefined &&
          data?.filename !== ""
            ? `${process.env.TRUSTEDVINE_ADMIN_URL}/media/${data?.filename}`
            : "/profile-user.png"
        }
        city={data?.city}
        recommendations={data?.recommendations}
        phone={
          data?.phone ? data?.phone : "Not yet provided"
        }
        email={
          data?.email ? data?.email : "Not yet provided"
        }
        website={
          data?.website ? data?.website : "Not yet provided"
        }
      />
      <hr className="border-top-3 border-gray-300 mt-12" />
      <h4 className="mt-10 text-black text-large font-semibold">
        Browse Other {data?.categories[0]} Providers
      </h4>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4 pb-10">
        {otherProviderData?.map((contractor: any) => {
          return (
            <Link
              href={`/roaringforkvalley/provider/${contractor?._id}`}
              key={contractor._id}
            >
              <Contractor
                name={contractor.name}
                avatar={"/profile-user.png"}
                numRecs={
                  contractor.numberOfUniqueRecommenders
                }
                city={contractor?.city}
                mostRecommended={false}
                verified={false}
                numYears={0}
                logo={
                  contractor?.filename !== null &&
                  contractor?.filename !== undefined &&
                  contractor?.filename !== ""
                    ? `${process.env.TRUSTEDVINE_ADMIN_URL}/media/${contractor?.filename}`
                    : "/profile-user.png"
                }
                id={contractor._id}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
