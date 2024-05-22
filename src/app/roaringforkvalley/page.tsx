import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import Service from "@/components/service";
import { redirect } from "next/navigation";
import AutocompleteSearch from "@/components/ui/AutocompleteSearch";

async function getData() {
  const options = {
    method: "GET",
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

  const items = data.map((item: any, index: any) => ({
    id: index,
    name: item.name,
  }));

  const handleOnSelect = async (item: any) => {
    "use server";
    redirect(
      `/roaringforkvalley/search?category=${item.name}`
    );
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-black text-2xl font-medium">
        Search Roaring Fork Valley Businesses
      </h1>

      <div className="-z-1">
        <form
          className="flex flex-row mt-4"
          action={search}
        >
          <div className="z-10">
            <AutocompleteSearch
              handleOnSelect={handleOnSelect}
              items={items}
            />
          </div>
          {/* <input
            type="search"
            name="search"
            className="bg-gray-200 w-5/12 h-12 rounded-md placeholder:text-slate-600 px-4 text-black mr-2"
            placeholder="Search for a service "
            aria-label="Search"
          /> */}
          {/* <button className="flex flex-row items-center bg-gray-200 text-slate-600 px-4 rounded-md mr-2">
            <IconAdjustmentsHorizontal />
            Filter
          </button> */}
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
    </div>
  );
}
