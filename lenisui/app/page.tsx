import { HeroSection } from "@/app/components/HeroSection";
import Image from "next/image";
import { ScrollAnimation } from "./components/ScrollAnimation";

export default function Home() {
  return <div>

    <HeroSection />
    <ScrollAnimation/>
  </div>;
}
