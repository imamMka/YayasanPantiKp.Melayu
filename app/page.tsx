import Hero from "../components/HomeData/Hero";
import EmergencyNeeds from "../components/HomeData/EmergencyNeeds";
import News from "../components/HomeData/News";
import Gallery from "../components/HomeData/Gallery";
import DonationTransparancy from "../components/HomeData/DonationTransparancy";
import Contact from "../components/HomeData/Contact";

export default function Homepage() {
  return (
    <main className="bg-[#F9F6F0] min-h-screen text-slate-800">
      <Hero />
      <EmergencyNeeds />
      <News />
      <Gallery />
      <DonationTransparancy />
      <Contact />
    </main>
  );
}
