import { IconZoomExclamation } from "@tabler/icons-react";

export default function Trusted() {
  return (
    <div className="flex flex-row items-center justify-center text-gray-400 h-full pb-20">
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center space-x-2">
          <IconZoomExclamation size={35} />
          <h2 className="text-2xl">No saved providers</h2>
        </div>
        <p>
          Search for a provider and select the save button
          to add them here.
        </p>
      </div>
    </div>
  );
}
