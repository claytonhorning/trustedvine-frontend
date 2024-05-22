import ContractorListing from "@/components/contractorListing";

type props = {
  params: any;
};

export default async function Listing({ params }: props) {
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

  const data = await getData();

  function countUniqueRecommendations(data: any) {
    const uniqueRecommenderIds = new Set();
    data.forEach((recommendation: any) => {
      uniqueRecommenderIds.add(
        recommendation.userRecommenderId
      );
    });
    return uniqueRecommenderIds.size;
  }

  return (
    <div>
      <ContractorListing
        name={data?.name}
        id={data?.id}
        numRecs={countUniqueRecommendations(
          data?.recommendations
        )}
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
        Browse Other Plumbers
      </h4>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {/* <Contractor />
        <Contractor />
        <Contractor />
        <Contractor />
        <Contractor /> */}
      </div>
    </div>
  );
}
