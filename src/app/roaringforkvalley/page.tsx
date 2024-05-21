import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import Service from "@/app/components/service";
import { redirect } from "next/navigation";

async function getData() {
  const options = {
    method: "GET",
    // headers: {
    //   Authorization:
    //     "Bearer 14e911851b8b87ca2d3d2ba4cbd2aab8bce5fad9e5b263ea56326a7413eaccc5adb23e51dceb2dea273742eebc2a342e30fda1f8619a836d4d78f42874ae26c15a9eb060e6c888fe0040a78ca490741d8a54be631c798f108886d09cc0d365d0c74d9cdf700014e3073f2459db51c7adbe3cb2d385de9c6c56f1404968e17048",
    // },
  };
  const res = await fetch(
    `${process.env.TRUSTEDVINE_API_URL}/categories`,
    options
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function FindLocalContractors() {
  async function search(formData: FormData) {
    "use server";

    const rawFormData = {
      search: formData.get("search"),
    };

    redirect(
      `/roaringforkvalley/search?category=${rawFormData.search?.valueOf()}`
    );
  }

  const data = await getData();

  return (
    <div className="flex flex-col">
      <h1 className="text-black text-2xl font-medium">
        Search Roaring Fork Valley Businesses
      </h1>
      <form
        className="flex flex-row space-x-2 mt-4"
        action={search}
      >
        <input
          type="search"
          name="search"
          className="bg-gray-200 w-5/12 h-12 rounded-md placeholder:text-slate-600 px-4 text-black"
          placeholder="Search for a service "
          aria-label="Search"
        />
        <button className="flex flex-row items-center bg-gray-200 text-slate-600 px-4 rounded-md">
          <IconAdjustmentsHorizontal />
          Filter
        </button>
        <button
          type="submit"
          className="flex flex-row items-center bg-[#4F772D] px-4 rounded-md text-white"
        >
          Search
        </button>
      </form>
      <div className="flex flex-col">
        <h1 className="text-black text-2xl font-medium mt-8 mb-4">
          All Service Categories
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((category: any) => {
            return (
              <Service
                name={category.name}
                num={category.providerCount}
                img={category.bannerImage}
                slug={`/roaringforkvalley/search?category=${category.slug}`}
                key={category._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
