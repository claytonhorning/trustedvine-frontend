import Contractor from "@/components/contractor";
import Link from "next/link";

type props = {
  searchParams: any;
};

async function getData(category: String) {
  const options = {
    method: "GET",
    // headers: {
    //   Authorization:
    //     "Bearer 14e911851b8b87ca2d3d2ba4cbd2aab8bce5fad9e5b263ea56326a7413eaccc5adb23e51dceb2dea273742eebc2a342e30fda1f8619a836d4d78f42874ae26c15a9eb060e6c888fe0040a78ca490741d8a54be631c798f108886d09cc0d365d0c74d9cdf700014e3073f2459db51c7adbe3cb2d385de9c6c56f1404968e17048",
    // },
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
