
import Heros from "../../components/heros";
import Banner from "../../components/banner/banner";
import About from "../../components/about/about";
import Navbar from "../../components/navbar/navbar";
import Donation from "../../components/donation/donation";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Heros/>
    <Banner/>
    <About/>
    <Donation/>
    </>
    
  );
}
