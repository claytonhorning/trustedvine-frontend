import ContractorListing from "@/components/contractorListing";

type props = {
  params: any;
};

export default async function Listing({ params }: props) {
  async function getData() {
    const options = {
      method: "GET",
      // headers: {
      //   Authorization:
      //     "Bearer 14e911851b8b87ca2d3d2ba4cbd2aab8bce5fad9e5b263ea56326a7413eaccc5adb23e51dceb2dea273742eebc2a342e30fda1f8619a836d4d78f42874ae26c15a9eb060e6c888fe0040a78ca490741d8a54be631c798f108886d09cc0d365d0c74d9cdf700014e3073f2459db51c7adbe3cb2d385de9c6c56f1404968e17048",
      // },
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
