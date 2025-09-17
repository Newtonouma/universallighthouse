import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import About from "../../../components/aboutcomponents/about/about";
import MissionVision from "../../../components/aboutcomponents/MissionVision/missionvision";
import FounderStory from "../../../components/aboutcomponents/FounderStory/founderstory";
import Partners from "../../../components/partners/partners";
import HeroSection from "../../../components/aboutcomponents/heros/heros";


export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <About/>
      <MissionVision/>
      <FounderStory/>
      <Partners/>
      <Footer/>
    </div>
  );
}