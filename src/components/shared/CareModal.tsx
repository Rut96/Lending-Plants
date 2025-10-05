import { useEffect, useState } from 'react';
import type { PlantDetailsResponse } from '../../types/plant';
import './CareModal.css';

interface CareModalProps {
  plantId: number | null;
  onClose: () => void;
  getPlantDetails: (id: number) => Promise<PlantDetailsResponse | null>;
}

export default function CareModal({ plantId, onClose, getPlantDetails }: CareModalProps) {
  const [plant, setPlant] = useState<PlantDetailsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const handleCopyPlan = async () => {
    if (!plant) return;

    const careText = `
${plant.common_name} Care Plan

🌞 Light: ${plant.sunlight?.join(', ') || 'Check moderate indirect light'}
💧 Water: ${plant.watering_general_benchmark?.value && plant.watering_general_benchmark?.unit
  ? `Every ${plant.watering_general_benchmark.value} ${plant.watering_general_benchmark.unit}`
  : 'Check moderate weekly watering; let soil dry on top 2-3 cm'}
🌱 Repot: ${plant.pruning_month?.length ? `Best in ${plant.pruning_month.join(', ')}` : 'Annually in spring'}
🐾 Pet Safety: ${plant.poisonous_to_pets === 1 ? '⚠️ Toxic to pets' : plant.poisonous_to_pets === 0 ? '✅ Pet-safe' : 'Check with vet before bringing home'}

From Pocket Garden (powered by Perenual API)
    `.trim();

    try {
      await navigator.clipboard.writeText(careText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {loading ? (
          <div className="modal-loading">
            <div className="spinner"></div>
            <p>Loading care details...</p>
          </div>
        ) : plant ? (
          <>
            <div className="modal-header">
              <h2 id="modal-title" className="modal-title">{plant.common_name}</h2>
              {plant.scientific_name?.[0] && (
                <p className="modal-subtitle">{plant.scientific_name[0]}</p>
              )}
            </div>

            <div className="care-plan-grid">
              <div className="care-item">
                <div className="care-icon care-icon-light">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <div>
                  <h3 className="care-label">Light</h3>
                  <p className="care-value">
                    {plant.sunlight?.join(', ') || 'Check moderate indirect light'}
                  </p>
                </div>
              </div>

              <div className="care-item">
                <div className="care-icon care-icon-water">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="care-label">Watering</h3>
                  <p className="care-value">
                    {plant.watering_general_benchmark?.value && plant.watering_general_benchmark?.unit
                      ? `Every ${plant.watering_general_benchmark.value} ${plant.watering_general_benchmark.unit}`
                      : 'Check moderate weekly watering; let soil dry on top 2-3 cm'}
                  </p>
                </div>
              </div>

              <div className="care-item">
                <div className="care-icon care-icon-repot">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="care-label">Repotting</h3>
                  <p className="care-value">
                    {plant.pruning_month?.length
                      ? `Best in ${plant.pruning_month.join(', ')}`
                      : 'Annually in spring'}
                  </p>
                </div>
              </div>

              <div className="care-item">
                <div className="care-icon care-icon-pet">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="8.5" cy="4.5" r="2.5" />
                    <circle cx="15.5" cy="4.5" r="2.5" />
                    <circle cx="5" cy="11" r="2" />
                    <circle cx="19" cy="11" r="2" />
                    <path d="M12 16c-1.5 0-3-1-4-2.5-1-1.5-1-3 0-4.5s2.5-2.5 4-2.5 3 1 4 2.5 1 3 0 4.5-2.5 2.5-4 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="care-label">Pet Safety</h3>
                  <p className="care-value">
                    {plant.poisonous_to_pets === 1
                      ? '⚠️ Toxic to pets'
                      : plant.poisonous_to_pets === 0
                      ? '✅ Pet-safe'
                      : 'Check with vet before bringing home'}
                  </p>
                </div>
              </div>
            </div>

            <button className="copy-button" onClick={handleCopyPlan}>
              {copied ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Save Care Plan
                </>
              )}
            </button>
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
