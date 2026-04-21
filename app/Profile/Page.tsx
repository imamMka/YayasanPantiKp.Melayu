import ProfileHero from "../../components/ProfileData/HeroProfile";
import History from "../../components/ProfileData/History";
import VisiMisi from "../../components/ProfileData/VisiMisi";
import StrukturOrganisasi from "../../components/ProfileData/SturkturOrganisasi";
import Fasilitas from "../../components/ProfileData/Fasilitas";
import Legalitas from "../../components/ProfileData/Legalitas";
import Contact from "../../components/ProfileData/Contact";

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
