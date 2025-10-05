import { useNavigate } from 'react-router-dom';
import HeroSection from '../../sections/HeroSection/HeroSection';
import BenefitsSection from '../../sections/BenefitsSection/BenefitsSection';
import FAQSection from '../../sections/FAQSection/FAQSection';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  const handleFindPlants = () => {
    navigate('/plants');
  };

  return (
    <div className="home-page">
      <HeroSection onCtaClick={handleFindPlants} />
      <BenefitsSection />
      <FAQSection />
    </div>
  );
}
