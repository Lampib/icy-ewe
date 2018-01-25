let projects = [
  {
    name     : 'EuroNordic',
    homepage : 'http://www.euronordic.nl/',
    image    : '/assets/images/company-temp/euronordic.jpg',
    description: [
      'Our flexible, trained and experienced professionals know the markets they are operating in. With all logistics disciplines in one organization, we are able to control your entire logistics chain. We are your partner for transports to Norway, agencies, forwarding, chartering, warehousing and more!',
      'Our organization has a strong focus on safety, continuous improvement, proactive approach and optimal communication. Next to that, you should be able to rely on and trust your logistics partner. That is exactly why more and more companies have chosen Euro Nordic as their logistics service provider. Since 1999 we have been delivering exactly what we promised: the best direction for logistics!',
    ],
  },
  {
    name     : 'Onego',
    homepage : 'http://www.onego.nl/',
    image    : '/assets/images/company-temp/onego.jpg',
    description: [
      'Our principal activity is the chartering and operation of a cross-Atlantic fleet carrying cargoes for various prestigious clients and major world industries. Having direct contact with many industries and ship owners, our company carries extensive knowledge of the shipping market across international boundaries.',
      'Our ability to respond quickly and effectively in a spot market due to the variety of tonnage in the service areas, as well as an extensive contractual portfolio, put us a step ahead of the competition. Our professionalism and experience, coupled with the utmost care and a tailor-made approach to each customer, have ensured many successful voyages for our clients.',
    ],
  },
  {
    name     : 'NorthSea Container Line',
    homepage : 'https://ncl.no/',
    image    : '/assets/images/company-temp/northsea-container-line.jpg',
    description: [
      'We transport your cargo to and from your required destination within Europe. NCL is a complete logistics provider that operates vessels covering most of the Norwegian West-, Mid- and North-coast and central European hubs Hamburg, Bremerhaven and Rotterdam. We combine sea and land based transportation to secure efficient and cost effective transport door2door.  At NorthSea Container Line, we deliver great services accompanied by a competitive price. Our returning customers and partners enjoy a particularly fast response time and tailored solutions to accompany individual transport needs.',
    ],
  },
  {
    name     : 'Vinama',
    homepage : 'http://thoresenvinama.com/',
    image    : '/assets/images/company-temp/vinama.jpg',
    description: [
      'We are a shipping-trading joint venture company working in Vietnam since 1993. Our main foreign shareholders are Thoresen Thai Agencies Bangkok, Elkem Chartering Oslo and Maritime 24 Singapore with local partner Vinama Agencies.',
      'We have concentrated on project cargoes, crude oil import/export, and agricultural products and we are today one of the largest agency companies in Southern Vietnam with yearly approx. 600 vessel calls. In addition to agency and husbandry services we also offer a full service including crane drivers/lashing/cargo supervision for our principal’s vessels.',
    ],
  },
  {
    name     : 'Dyna Fyr',
    homepage : 'https://www.dynafyr.no/',
    image    : '/assets/images/company-temp/dyna-fyr.jpg',
    description: [
      'Dyna Lighthouse is a unique venue located in the middle of the inner Oslo fjord. The lighthouse offers an outstanding dining experience and hosts events for up to 40 people.',
      'The boat trip to the lighthouse takes around 25 minutes from the "Kiss & Sail" pier at Tjuvholmen. Our cuisine is based on the best from the ocean and use the best, in season materials.',
      'This is to an intimate and distinctive experience: one of Oslo’s most spectacular landmarks.',
    ],
  },
  {
    name     : 'REC Group',
    homepage : 'https://www.recgroup.com/',
    image    : '/assets/images/company-temp/rec-group.jpg',
    description: [
      'At a time where more than one billion people still don’t have access to electricity and the repercussions of climate change are already being experienced, now is the time to go solar.',
      'REC’s combination of product quality, company reliability, and commitment to sustainability makes us the ideal brand for your solar investment, whether residential, commercial, or utility scale.',
    ],
  },
  {
    name     : 'Elkem',
    homepage : 'https://www.elkem.com/',
    image    : '/assets/images/company-temp/elkem.jpg',
    description: [
      'Elkem’s core expertise includes knowledge of controlling processes that involve very high temperatures and accurately determining the chemical content of materials so that they precisely match customer needs. Additionally, Elkem is a world leader when it comes to the production of carbonaceous materials, which is crucial when silicon is to be extracted from quartz. Elkem’s processes are energy intensive and efficient operations require a continuous focus on energy efficiency.',
      'Since the company was formed in 1904 Elkem has developed a production technology for the purpose of improving operations. The most renowned invention is the Söderberg electrode from 1917. The electrode revolutionised the global smelting plant industry and provided Elkem with substantial patent revenue for a number of years.',
    ],
  },
];

module.exports = setCompanies;

function setCompanies(req, res, next) {
  res.locals.hbs.projects = projects;
  next();
}
