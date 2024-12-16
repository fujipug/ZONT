"use client"
import Image from "next/image";
import zontSvg from "../public/ZONT_white.svg";
import { FlipWords } from "../components/ui/flip-words";
import HomeTabs from "../app/(main)/HomeTabs/page";

export default function Home() {

  const words = ["Practica en Cabina", "Grabacion de Set", "Estudio de Producion",
    "Fotos/Fotographia", "Eventos en CDMX", "Diseño de Logo", "Diseño de Pagina Web"];

  return (
    <>
      <div className="h-full w-full relative">
        <video className="w-full" autoPlay loop muted>
          <source src="/angel.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <Image src={zontSvg} alt="ZONT" width={500} height={500} />
          <FlipWords className="text-md md:text-4xl" words={words} />
        </div>
      </div >
      <HomeTabs />
    </>
  );
}
