import Contractor from "@/components/contractor";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  searchParams: any;
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages =
    (await parent).openGraph?.images || [];
  return {
    title: `${searchParams?.category} Providers`,
    description: `Search All ${searchParams?.category} Providers in the Roaring Fork Valley`,
    openGraph: {
      images: [...previousImages],
    },
  };
}

function toTitleCase(str: any) {
  return str.replace(/\w\S*/g, function (txt: any) {
    return (
      txt.charAt(0).toUpperCase() +
      txt.substr(1).toLowerCase()
    );
  });
}

async function getData(category: String) {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  };
  const res = await fetch(
    `${process.env.TRUSTEDVINE_API_URL}/providers?category=${category}`,
    options
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Search({
  searchParams,
}: Props) {
  const data = await getData(searchParams?.category);

  const totalUniqueRecommenders = data.reduce(
    (accumulator: any, provider: any) => {
      return (
        accumulator + provider.numberOfUniqueRecommenders
      );
    },
    0
  );

  return (
    <div className="text-black">
      <h2 className="text-2xl font-medium pb-1">
        {toTitleCase(searchParams?.category)} Providers
      </h2>
      <div className="flex flex-row space-x-1 pb-6 text-gray-600">
        <p>{data?.length} Providers</p>
        <span>|</span>
        <p>{totalUniqueRecommenders} Recommendations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((contractor: any) => {
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
