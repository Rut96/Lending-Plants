import { useEffect, useState } from 'react';
import { Sun, Droplet, TrendingUp, AlertTriangle, X } from 'lucide-react';
import type { UnifiedPlant } from '../../types/trefle';
import heroPlant from '../../assets/images/hero-plant.png';
import './CareModal.css';

interface CareModalProps {
  plantId: string | null;
  onClose: () => void;
  getPlantDetails: (id: string) => Promise<UnifiedPlant | null>;
}

export default function CareModal({ plantId, onClose, getPlantDetails }: CareModalProps) {
  const [plant, setPlant] = useState<UnifiedPlant | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!plantId) {
      setPlant(null);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      const details = await getPlantDetails(plantId);
      setPlant(details);
      setLoading(false);
    };

    fetchDetails();
  }, [plantId, getPlantDetails]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (plantId) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [plantId, onClose]);

  if (!plantId) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {loading ? (
          <div className="modal-loading">
            <div className="spinner"></div>
            <p>Loading care details...</p>
          </div>
        ) : plant ? (
          <>
            <div className="modal-layout">
              <div className="modal-left">
                <div className="modal-header">
                  <h2 id="modal-title" className="modal-title">{plant.commonName}</h2>
                  {plant.scientificName && (
                    <p className="modal-subtitle">
                      {Array.isArray(plant.scientificName) ? plant.scientificName[0] : plant.scientificName}
                    </p>
                  )}
                </div>

                <div className="care-plan-grid">
                  <div className="care-item">
                    <div className="care-icon care-icon-light">
                      <Sun size={20} />
                    </div>
                    <div>
                      <h3 className="care-label">Light</h3>
                      <p className="care-value">
                        {plant.sunlight?.map(s => s.replace(/_/g, ' ')).join(', ') ||
                          (plant.lightLevel ? `Level ${plant.lightLevel}/10` : 'Moderate indirect light')}
                      </p>
                    </div>
                  </div>

                  <div className="care-item">
                    <div className="care-icon care-icon-water">
                      <Droplet size={20} />
                    </div>
                    <div>
                      <h3 className="care-label">Watering</h3>
                      <p className="care-value">
                        {plant.watering || 'Moderate weekly watering; let soil dry on top 2-3 cm'}
                      </p>
                    </div>
                  </div>

                  <div className="care-item">
                    <div className="care-icon care-icon-repot">
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <h3 className="care-label">Growth</h3>
                      <p className="care-value">
                        {plant.growthRate || 'Moderate rate'}
                        {plant.averageHeight?.cm && ` • ${plant.averageHeight.cm}cm avg height`}
                      </p>
                    </div>
                  </div>

                  <div className="care-item">
                    <div className="care-icon care-icon-pet">
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <h3 className="care-label">Safety</h3>
                      <p className="care-value">
                        {plant.toxicity ||
                          (plant.edible
                            ? `✅ Edible${plant.ediblePart?.length ? ` (${plant.ediblePart.join(', ')})` : ''}`
                            : 'Check with vet before bringing home')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-right">
                <img
                  src={heroPlant}
                  alt={plant.commonName}
                  className="modal-plant-image"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="modal-error">
            <p>Unable to load plant details. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
}
