'use client'

import Image from 'next/image'

const creators = [
  {
    name: 'Chef Cookaholics',
    title: 'Chef-kok Cookaholics',
    image: '/images/usp-image.jpg',
    quote: 'Voor dit menu heb ik alles wat ik weet over smaakbalans gebruikt. Elk gerecht is ontworpen om samen te werken met een specifiek bier. Dat betekent soms experimenten waar je zelf niet aan zou denken. En dat is precies het leuke.',
    credentials: [
      'FC Den Bosch',
      'RKC Waalwijk',
      'Efteling',
      'Villa 1855',
    ],
    credentialsLabel: 'Cookaholics verzorgt catering voor:',
  },
  {
    name: 'Miel Blok',
    title: 'Internationaal Biersommelier',
    image: '/images/service-zakelijk.jpg',
    quote: 'Deze bieren zijn niet zomaar gekozen. Sommige heb ik maanden van tevoren besteld bij brouwers die ik persoonlijk ken. Andere zijn zo zeldzaam dat ik er maar een paar flessen van kon krijgen. Het zijn stuk voor stuk bieren met een verhaal.',
    credentials: [
      '250+ bieren in assortiment',
      'Samenwerking met Nederlandse microbrouwers',
      'Gespecialiseerd in food & music pairing',
    ],
    credentialsLabel: 'Beer Dudes sinds 2019:',
  },
]

export default function CreatorsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-10 h-px bg-accent" />
            <span className="text-accent text-xs font-medium tracking-[0.25em] uppercase">
              De makers
            </span>
            <span className="w-10 h-px bg-accent" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-primary-darkest mb-4">
            Gecreëerd door mensen die hier hun leven aan wijden
          </h2>
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {creators.map((creator) => (
            <div
              key={creator.name}
              className="bg-offwhite p-8"
            >
              {/* Image and Name */}
              <div className="flex items-start gap-6 mb-6">
                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                  <Image
                    src={creator.image}
                    alt={creator.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-primary-darkest">
                    {creator.name}
                  </h3>
                  <p className="text-accent text-sm font-medium">
                    {creator.title}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-primary italic leading-relaxed mb-6 pl-4 border-l-2 border-accent/30">
                &ldquo;{creator.quote}&rdquo;
              </blockquote>

              {/* Credentials */}
              <div>
                <p className="text-sm text-primary-dark font-medium mb-2">
                  {creator.credentialsLabel}
                </p>
                <ul className="space-y-1">
                  {creator.credentials.map((credential) => (
                    <li key={credential} className="text-sm text-primary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <div className="flex items-center gap-2 text-sm text-primary">
            <span className="w-2 h-2 bg-accent rounded-full" />
            Internationaal Biersommelier (2024)
          </div>
          <div className="flex items-center gap-2 text-sm text-primary">
            <span className="w-2 h-2 bg-accent rounded-full" />
            15+ jaar Cookaholics ervaring
          </div>
          <div className="flex items-center gap-2 text-sm text-primary">
            <span className="w-2 h-2 bg-accent rounded-full" />
            Partner FC Den Bosch, RKC, Efteling
          </div>
        </div>
      </div>
    </section>
  )
}
