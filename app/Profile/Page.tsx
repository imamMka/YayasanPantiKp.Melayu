import ProfileHero from "./HeroProfile";
import History from "./History";
import VisiMisi from "./VisiMisi";
import StrukturOrganisasi from "./SturkturOrganisasi";
import Fasilitas from "./Fasilitas";
import Legalitas from "./Legalitas";
import Contact from "./Contact";

export default function ProfilePage() {
  return (
    <main className="bg-[#F9F6F0] min-h-screen text-slate-800">
      <ProfileHero />
      <History />
      <VisiMisi />
      <StrukturOrganisasi />
      <Fasilitas />
      <Legalitas />
      <Contact />
    </main>
  );
}
