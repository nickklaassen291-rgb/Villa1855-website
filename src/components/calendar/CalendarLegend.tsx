export function CalendarLegend() {
  const legendItems = [
    {
      status: "available",
      label: "Beschikbaar",
      description: "Klik om een aanvraag te doen",
      bgClass: "bg-available-light",
      borderClass: "border-available",
      dotClass: "bg-available",
    },
    {
      status: "option",
      label: "In optie",
      description: "Iemand anders heeft interesse",
      bgClass: "bg-option-light",
      borderClass: "border-option",
      dotClass: "bg-option",
    },
    {
      status: "booked",
      label: "Geboekt",
      description: "Niet meer beschikbaar",
      bgClass: "bg-booked-light",
      borderClass: "border-booked",
      dotClass: "bg-booked",
    },
    {
      status: "limited",
      label: "Vanaf 18:00",
      description: "Donderdag alleen 's avonds",
      bgClass: "bg-limited-light",
      borderClass: "border-limited",
      dotClass: "bg-limited",
    },
    {
      status: "closed",
      label: "Gesloten",
      description: "Ma, di, wo niet beschikbaar",
      bgClass: "bg-closed-light",
      borderClass: "border-closed",
      dotClass: "bg-closed",
    },
  ];

  return (
    <div className="bg-primary-lightest p-6 md:p-8">
      <h3 className="font-heading text-lg mb-6 text-primary-darkest">Legenda</h3>
      <div className="flex flex-col gap-4">
        {legendItems.map((item) => (
          <div key={item.status} className="flex items-center gap-4">
            <div
              className={`w-10 h-10 flex items-center justify-center border ${item.bgClass} ${item.borderClass}`}
            >
              <span className={`w-2 h-2 rounded-full ${item.dotClass}`} />
            </div>
            <div className="flex-1">
              <strong className="block text-sm font-medium text-primary-darkest">
                {item.label}
              </strong>
              <span className="text-sm text-primary">{item.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
