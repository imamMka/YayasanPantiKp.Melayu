import Hero from "./Hero";
import EmergencyNeeds from "./EmergencyNeeds";
import News from "./News";
import Gallery from "./Gallery";
import DonationTransparancy from "./DonationTransparancy";
import Contact from "./Contact";

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
