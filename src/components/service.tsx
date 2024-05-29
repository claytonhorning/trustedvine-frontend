import Image from "next/image";
import Link from "next/link";

interface IServiceProps {
  name: string;
  img: string;
  slug: string;
  num: number;
}

const Service: React.FC<IServiceProps> = ({
  name,
  img,
  slug,
  num,
}) => {
  return (
    <Link href={slug}>
      <div className="text-black">
        <div className="relative h-32 w-full">
          <Image
            alt="Mountains"
            src={img}
            quality={100}
            fill
            className="-z-10 brightness-50"
            style={{
              objectFit: "cover",
            }}
          />
          <div className="flex flex-col h-32 items-center justify-center text-white z-10">
            <h3 className="text-2xl font-medium text-center">
              {name}
            </h3>
            <p className="text-sm">{num} Providers</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Service;
