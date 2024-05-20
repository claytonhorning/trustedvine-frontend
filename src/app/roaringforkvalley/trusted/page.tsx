import Contractor from "@/components/contractor";

async function getData() {
  const options = {
    method: "GET",
    headers: {
      Authorization:
        "Bearer 14e911851b8b87ca2d3d2ba4cbd2aab8bce5fad9e5b263ea56326a7413eaccc5adb23e51dceb2dea273742eebc2a342e30fda1f8619a836d4d78f42874ae26c15a9eb060e6c888fe0040a78ca490741d8a54be631c798f108886d09cc0d365d0c74d9cdf700014e3073f2459db51c7adbe3cb2d385de9c6c56f1404968e17048",
    },
  };
  const res = await fetch(
    "https://64f350cdedfa0459f6c67bba.mockapi.io/savedContractors",
    options
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Trusted() {
  const data = await getData();
  return (
    <div>
      <h1 className="text-black text-2xl font-medium mb-4">
        My Trusted Contractors
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((contractor: any) => {
          return (
            <Contractor
              name={contractor.name}
              avatar={contractor.avatar}
              numRecs={contractor.numRecs}
              city={contractor.city}
              mostRecommended={contractor.mostRecommended}
              verified={contractor.verified}
              logo={contractor.logo}
              numYears={contractor.numYears}
              id={contractor.id}
              key={contractor.id}
              context={{ id: contractor.id }}
            />
          );
        })}
      </div>
    </div>
  );
}
