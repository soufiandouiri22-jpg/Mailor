import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HeroDemo } from "@/components/HeroDemo";
import { TrustedBy } from "@/components/TrustedBy";
import { TwoPlatforms } from "@/components/TwoPlatforms";
import { AgentsSection } from "@/components/AgentsSection";
import { PlatformPreview } from "@/components/PlatformPreview";
import { LatestUpdates } from "@/components/LatestUpdates";
import { PipelineSection } from "@/components/PipelineSection";
import { BookedAgendaSection } from "@/components/BookedAgendaSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

function Divider() {
  return (
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-black/[0.04] to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroDemo />
        <HeroSection />
        <Divider />
        <TrustedBy />
        <Divider />
        <PipelineSection />
        <Divider />
        <AgentsSection />
        <Divider />
        <TwoPlatforms />
        <Divider />
        <BookedAgendaSection />
        <Divider />
        <PlatformPreview />
        <Divider />
        <LatestUpdates />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
