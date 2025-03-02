import Hero from "~/components/Hero";
import Navbar from "~/components/Navbar";
import Highlight from "~/components/Highlight";
import Model from "~/components/Model";
import Feature from "~/components/Feature";
import HowItWorks from "~/components/HowItWork";
import Footer from "~/components/Footer";
export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <Highlight/>
      <Model/>
      <Feature/>
      <HowItWorks/>
      <Footer/>
    </main>
  );
}
