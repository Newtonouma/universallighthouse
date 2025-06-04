
import Heros from "../../components/home/heros/heros";
import Banner from "../../components/home/banner/banner";
import About from "../../components/home/about/about";
import Navbar from "../../components/navbar/navbar";
import Donation from "../../components/home/donation/donation";
import Events from "../../components/home/events/events";
import Teams from "../../components/home/teams/teams";
import Gallery from "../../components/home/gallery/gallery";
import Partners from "../../components/partners/partners";
import Footer from "../../components/footer/footer";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Heros/>
      <Banner/>
      <About/>
      <Donation/>
      <Events/>
      <Teams/>
      <Gallery/>
      <Partners/>
      <Footer/>
    </div>
  );
}
