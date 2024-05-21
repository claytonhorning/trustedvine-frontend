import Contractor from "@/app/components/contractor";
import Link from "next/link";

type props = {
  searchParams: any;
};

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
}: props) {
  const data = await getData(searchParams?.category);

  return (
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
              city={"Unknown"}
              mostRecommended={false}
              verified={false}
              numYears={0}
              logo={
                "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
              }
              id={contractor._id}
            />
          </Link>
        );
      })}
    </div>
  );
}
