import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Features from './sections/Features';
import Showcase from './sections/Showcase';
import VideoPreview from './sections/VideoPreview';
import Purchase from './sections/Purchase';
import Footer from './sections/Footer';
import WelcomeScreen from './components/WelcomeScreen';
import MusicPlayer from './components/MusicPlayer';

function App() {
  return (
    <LanguageProvider>
      <WelcomeScreen />
      
      <div className="min-h-screen flowing-bg relative w-full overflow-x-hidden">
        <div className="flowing-aurora" />
        <div className="flowing-lines" />
        
        <Navbar />
        <main className="relative z-10 w-full">
          <Hero />
          <Features />
          <Showcase />
          <VideoPreview />
          <Purchase />
        </main>
        <Footer />
        
        <MusicPlayer />
      </div>
    </LanguageProvider>
  );
}

export default App;
