import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import Service from "@/components/service";
import { redirect } from "next/navigation";
import AutocompleteSearch from "@/components/ui/AutocompleteSearch";

async function getData() {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
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

  return (
    <div className="flex flex-col">
      <h1 className="text-black text-2xl font-medium">
        Search Roaring Fork Valley Businesses
      </h1>
      <AutocompleteSearch items={items} />
      <div className="flex flex-col">
        <h1 className="text-black text-2xl font-medium mt-8 mb-4">
          All Service Categories
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
