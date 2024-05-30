import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header className="bg-[#132A13] w-full">
        <div className="container mx-auto flex items-center justify-between h-20 px-5 md:px-10">
          <Image
            src="/logo.png"
            height={180}
            width={180}
            alt="TrustedVine Logo"
          />
          <nav className="text-white">
            <ul className="flex space-x-4">
              <a href="mailto:clay@trustedvine.com">
                <li>Contact</li>
              </a>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-5 lg:px-10 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex flex-col w-full lg:w-1/2 mb-10 lg:mb-0 mr-8 px-5">
            <h1 className="text-black text-4xl pt-16 font-medium">
              Find the best home service professionals in
              your community.
            </h1>
            <p className="text-lg py-5 font-medium text-slate-700">
              TrustedVine aggregates the top recommendations
              for local service providers, ensuring you get
              quality and reliability.
            </p>
          </div>
          <div className="w-full lg:w-1/2 h-96 relative">
            <Image
              src="/handyman.jpeg"
              quality={100}
              fill
              style={{
                objectFit: "cover",
              }}
              alt="Tradesperson at work"
            />
          </div>
        </div>

        <section className="py-10 text-black mt-10 lg:mt-28">
          <h4 className="text-2xl text-center font-medium">
            Communities We Serve
          </h4>
          <div className="flex justify-center items-center flex-wrap gap-4 mt-4">
            <Link href={"/roaringforkvalley"}>
              <div className="text-black">
                <div className="relative h-32 w-96">
                  <Image
                    alt="Mountains"
                    src={"/rfv.jpeg"}
                    quality={100}
                    fill
                    className="-z-10 brightness-50"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  <div className="flex flex-col h-32 items-center justify-center text-white">
                    <h3 className="text-2xl font-medium text-center">
                      Roaring Fork Valley
                    </h3>
                    <p className="text-sm">
                      2,500+ Recommendations
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>
      <footer className="bg-[#132A13] w-full h-16 px-5 md:px-10 flex justify-center items-center text-white">
        <p>© 2024 TrustedVine. All rights reserved.</p>
      </footer>
    </div>
  );
}
