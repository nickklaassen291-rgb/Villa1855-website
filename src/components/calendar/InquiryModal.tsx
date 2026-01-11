"use client";

import { useEffect } from "react";
import { formatDisplayDate } from "@/lib/calendar-utils";
import { Phone, Mail, X } from 'lucide-react'

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  isThursday: boolean;
}

export function InquiryModal({
  isOpen,
  onClose,
  date,
  isThursday,
}: InquiryModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const displayDate = formatDisplayDate(date);
  const thursdayNote = isThursday ? " (vanaf 18:00)" : "";
  const emailSubject = encodeURIComponent(
    `Aanvraag Villa 1855 - ${displayDate}${thursdayNote}`
  );
  const emailBody = encodeURIComponent(
    `Beste Villa 1855,\n\nIk heb interesse in de volgende datum: ${displayDate}${thursdayNote}\n\nKunnen jullie mij meer informatie sturen over de mogelijkheden?\n\nMet vriendelijke groet,`
  );

  return (
    <div
      className="fixed inset-0 bg-primary-darkest/90 z-[2000] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white max-w-lg w-full p-8 md:p-12 relative animate-[fadeInUp_0.3s_ease]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center text-primary hover:text-primary-darkest transition-colors"
          aria-label="Sluiten"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <span className="label">Aanvraag</span>
        <h3 className="text-2xl md:text-3xl mt-2 mb-1">
          Interesse in deze datum?
        </h3>
        <p className="text-accent text-lg mb-6">
          {displayDate}
          {isThursday && (
            <span className="text-limited"> (vanaf 18:00)</span>
          )}
        </p>
        <p className="text-primary-dark mb-8">
          Neem contact met ons op om de mogelijkheden te bespreken of direct een
          optie te plaatsen.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="tel:+310852736709"
            className="btn btn-primary flex-1 justify-center"
          >
            <Phone size={18} />
            Bellen
          </a>
          <a
            href={`mailto:info@villa1855.nl?subject=${emailSubject}&body=${emailBody}`}
            className="btn bg-transparent text-primary-darkest border border-primary-lighter hover:bg-primary-lightest flex-1 justify-center"
          >
            <Mail size={18} />
            E-mail
          </a>
        </div>
      </div>
    </div>
  );
}
