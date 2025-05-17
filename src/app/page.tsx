
import Heros from "../../components/heros/heros";
import Banner from "../../components/banner/banner";
import About from "../../components/about/about";
import Navbar from "../../components/navbar/navbar";
import Donation from "../../components/donation/donation";
import Events from "../../components/events/events";
import Teams from "../../components/teams/teams";
import Gallery from "../../components/gallery/gallery";
import Partners from "../../components/partners/partners";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Heros/>
    <Banner/>
    <About/>
    <Donation/>
    <Events/>
    <Teams/>
    <Gallery/>
    <Partners/>
    </>
    
  );
}
