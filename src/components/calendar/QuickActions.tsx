import { Phone, Mail } from 'lucide-react'

export function QuickActions() {
  return (
    <div className="bg-primary-darkest p-6 md:p-8 text-white">
      <h3 className="font-heading text-lg mb-4 text-white">Direct contact</h3>
      <p className="text-primary-light text-sm mb-6">
        Heb je vragen of wil je meer informatie over een specifieke datum?
      </p>

      <a
        href="tel:+310852736709"
        className="btn btn-primary w-full justify-center mb-3"
      >
        <Phone size={18} />
        Bel ons
      </a>

      <a
        href="mailto:info@villa1855.nl"
        className="btn btn-outline w-full justify-center"
      >
        <Mail size={18} />
        Mail ons
      </a>
    </div>
  );
}
