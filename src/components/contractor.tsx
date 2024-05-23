import {
  IconMapPin,
  IconSpeakerphone,
  IconCrown,
  IconShieldCheck,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

interface IContractorProps {
  name: string;
  avatar: string;
  numRecs: number;
  city: string;
  mostRecommended: boolean;
  verified: boolean;
  numYears: number;
  logo: string;
  id: number;
  context?: {
    // Optional context property
    id: number;
  };
}

const Contractor: React.FC<IContractorProps> = ({
  name,
  avatar,
  numRecs,
  city,
  mostRecommended,
  verified,
  numYears,
  logo,
  id,
  context,
}) => {
  return (
    <div className="bg-white p-3 rounded-md border-2 border-gray-300 text-black hover:bg-slate-200 hover:shadow-md cursor-pointer">
      <div className="flex flex-row justify-between">
        <p className="text-sm text-[#31572C] font-medium">
          {numRecs !== 1
            ? numRecs + " locals recommend"
            : numRecs + " local recommends"}
        </p>
        <div className="flex flex-row items-center">
          <IconMapPin size={14} className="mr-1" />
          <p className="text-sm font-medium text-gray-700">
            {city}
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <div className="flex flex-row items-center">
          <Image
            src={logo}
            width={45}
            height={45}
            alt="Picture of the author"
            className="rounded-full mr-3"
          />
          <h3 className="text-md font-semibold">{name}</h3>
        </div>
        <div className="flex flex-wrap flex-row gap-x-1">
          {mostRecommended && (
            <div className="flex flex-row self-start items-center bg-purple-700 text-white py-1 px-2 rounded-sm mt-2 shrink-0">
              <IconSpeakerphone
                size={18}
                className="mr-1"
              />
              <p className="text-sm">
                Recommended by Friends
              </p>
            </div>
          )}
          {verified && (
            <div className="flex flex-row self-start items-center bg-blue-600 text-white py-1 px-2 rounded-sm mt-2 shrink-0">
              <IconShieldCheck size={18} className="mr-1" />
              <p className="text-sm">Verified</p>
            </div>
          )}
          {numYears > 0 && (
            <div className="flex flex-row self-start items-center bg-blue-900 text-white py-1 px-2 rounded-sm mt-2 shrink-0">
              <IconSpeakerphone
                size={18}
                className="mr-1"
              />
              <p className="text-sm">
                {numYears} Years In Business
              </p>
            </div>
          )}
          {context && (
            <div className="flex flex-row self-start items-center bg-green-700 text-white py-1 px-2 rounded-sm mt-2 shrink-0">
              <IconCrown size={18} className="mr-1" />
              <p className="text-sm">Id: {context.id}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contractor;
