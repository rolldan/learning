// Toolkit-seksjonene tilpasset hvert fag (senioritet / fagspesifikk AI-reise)
const SUBJECT_SECTIONS = {
  norsk: {
    overview: {
      summary: 'AI i norsk styrker skrive- og leseprosessen når eleven forblir forfatter. Start med tillit: tydelige regler for når AI er lov.',
      points: [
        'Copilot Chat som strukturcoach – ikke ghostwriter',
        'Reading Coach for leseflyt og uttale',
        'Kildekritikk som kjerneferdighet i faget',
        'Rubrikker som skiller prosess, produkt og AI-bruk',
      ],
      steps: ['Kartlegg skriveprosessen', 'Lag klasseregler', 'Piloter i én klasse', 'Evaluer og skaler'],
    },
    navigators: {
      summary: 'Lær av skoler som bruker AI for tilbakemelding og personalisert lesing.',
      cases: [
        { name: 'NYC Public Schools', lesson: 'AI-assistent for tilbakemelding på elevtekster' },
        { name: 'South Australia', lesson: 'Kreativitet og kritisk tenkning med AI i klasserommet' },
        { name: 'EdUJCPS Hong Kong', lesson: 'Chatbot for rask tilbakemelding på skriftlig arbeid' },
      ],
      questions: [
        'Hvor i skriveprosessen trenger elevene mest støtte?',
        'Hvordan sikrer vi at AI ikke erstatter elevens stemme?',
        'Hvilke vurderingskriterier må oppdateres?',
      ],
    },
    plan: {
      summary: 'Planlegg AI-innføring i norsk med fokus på akademisk integritet og LK20.',
      checklist: [
        'Oppdater retningslinjer for skriftlig vurdering med AI',
        'Engasjer norsklærere på fagmøte – del bekymringer og muligheter',
        'Definer hva som er lov i idé-, utkast- og revisjonsfase',
        'Forbered rubrikk-mal for AI-dokumentasjon',
        'Avklar prøvepolicy med ledelsen',
      ],
      goals: ['80 % av lærere har testet Copilot på én leksjon', 'Klasseregler på plass i alle klasser', 'Oppdatert vurderingsguide'],
    },
    implement: {
      summary: 'Rull ut Copilot Chat og Reading Coach i norskundervisningen.',
      actions: [
        'Start med Copilot Chat – gratis med skolekonto',
        'Bruk Reading Coach i leseøkter for trinn 5–7',
        'Del prompt-bibliotek på fagmøte',
        'Kjør tre modell-leksjoner kollegialt',
      ],
      tools: ['Copilot Chat', 'Reading Coach', 'Reading Progress', 'Word + Copilot'],
    },
    research: {
      summary: 'Fordyp deg i AI for literacy og ansvarlig bruk i skriving.',
      resources: [
        { title: 'AI for Education learning path', url: 'https://learn.microsoft.com/training/paths/ai-for-education/' },
        { title: 'Prompt-a-thon for utdanning', url: 'https://learn.microsoft.com/education/' },
        { title: 'Classroom toolkit', url: 'https://learn.microsoft.com/education/' },
      ],
    },
    senioritet: [
      { level: 'Nybegynner', desc: 'Du starter med AI i norsk', tasks: ['Les oversikt for norsk', 'Test 3 tilbakemeldings-prompter', 'Lag klasseregler med elevene'] },
      { level: 'Erfaren', desc: 'Du har pilotert AI i minst én klasse', tasks: ['Fullfør ukeplan uke 1–5', 'Del erfaring på fagmøte', 'Utvikle vurderingsrubrikk'] },
      { level: 'Senior', desc: 'Du leder AI-utvikling i norskmiljøet', tasks: ['Skaler til alle trinn', 'Mentorér nye kolleger', 'Bidra til skolens AI-policy'] },
    ],
  },

  matematikk: {
    overview: {
      summary: 'AI i matematikk skal styrke forståelse gjennom hint og varierte oppgaver – aldri erstatte tenking.',
      points: ['«Hint, ikke svar»-prinsippet', 'Math Progress for feilanalyse', 'AI-genererte oppgaver må kvalitetssikres', 'Tydelig skille øving vs. prøve'],
      steps: ['Definer prinsipper', 'Test oppgaver mot LK20', 'Pilot med hint-regel', 'Evaluer problemløsning'],
    },
    navigators: {
      summary: 'Skoler som bruker AI for personalisert matteøving og rask tilbakemelding.',
      cases: [
        { name: 'EdUJCPS Hong Kong', lesson: '65 % av elever syntes mattetilbakemelding fra chatbot var nyttig' },
        { name: 'NYC Public Schools', lesson: 'AI hjelper lærere gi mer individuell støtte i stor skole' },
      ],
      questions: ['Når skal eleven regne selv?', 'Hvordan unngår vi overfladisk kopiering?', 'Kan Math Progress avdekke mønstre?'],
    },
    plan: {
      summary: 'Planlegg differensiert matteundervisning med AI som støtteverktøy.',
      checklist: ['Etabler hint-regel i klassen', 'Kartlegg LK20-mål for pilotenhet', 'Test AI-oppgaver mot eksamensnivå', 'Avklar prøvepolicy', 'Opplær kolleger i Math Progress'],
      goals: ['Hint-strategi i bruk', 'Oppgavebank kuratert', 'Formativ vurdering med AI'],
    },
    implement: {
      summary: 'Implementer Copilot og Math Progress i matematikkundervisningen.',
      actions: ['Introduksjon av hint-prompter', 'Math Progress-oppsett', 'Tre differensierte oppgavesett', 'Evaluering av elevstrategier'],
      tools: ['Copilot Chat', 'Math Progress', 'Excel + Copilot', 'GeoGebra'],
    },
    research: {
      summary: 'Forskning og kurs om AI i matematikkundervisning.',
      resources: [
        { title: 'Microsoft Learn – AI for Education', url: 'https://learn.microsoft.com/training/paths/ai-for-education/' },
        { title: 'Minecraft 101 – spillbasert læring', url: 'https://learn.microsoft.com/training/' },
      ],
    },
    senioritet: [
      { level: 'Nybegynner', tasks: ['Forstå hint-prinsippet', 'Generer og vurder 10 oppgaver', 'Pilot i én klasse'] },
      { level: 'Erfaren', tasks: ['Bruk Math Progress aktivt', 'Del prompt-bibliotek', 'Utvikle prøvepolicy'] },
      { level: 'Senior', tasks: ['Fagleder AI i mattemiljøet', 'Kvalitetssikre oppgavebank', 'Veilede nye lærere'] },
    ],
  },

  engelsk: {
    overview: {
      summary: 'Engelsk og AI: samtaleøving, uttale og differensiert innhold på CEFR-nivå.',
      points: ['Copilot for muntlig øving', 'Speaker Coach for presentasjoner', 'CEFR-tilpassede tekster', 'Balanse AI-øving og autentisk kommunikasjon'],
      steps: ['Kartlegg CEFR-nivåer', 'Start samtalepilot', 'Innfør Speaker Coach', 'Vurder muntlig ferdighet'],
    },
    navigators: {
      summary: 'Internasjonale eksempler på AI for språklæring.',
      cases: [
        { name: 'IU International University', lesson: 'AI study buddy for språkstudenter' },
        { name: 'South Australia', lesson: 'Kreativ og kritisk bruk av AI på engelsk' },
      ],
      questions: ['Hvilket CEFR-nivå har klassen?', 'Hvordan vurderer vi muntlig med AI-øving?', 'Når er autentisk kommunikasjon viktigst?'],
    },
    plan: {
      summary: 'Plan for AI-støttet språkundervisning.',
      checklist: ['Kartlegg CEFR-nivåer', 'Definer AI-regler for innlevering', 'Sett opp Speaker Coach', 'Planlegg autentisk kommunikasjonsaktivitet', 'Rubrikk for muntlig'],
      goals: ['Daglig samtaleøving etablert', 'Speaker Coach i bruk', 'Vurderingsrubrikk klar'],
    },
    implement: {
      summary: 'Copilot Chat, Speaker Coach og Reading Coach i engelskundervisningen.',
      actions: ['CEFR-tilpassede samtaleprompter', 'Presentasjonsøving i Teams', 'Lesetekster på nivå', 'Pennevenn eller videochat'],
      tools: ['Copilot Chat', 'Speaker Coach', 'Speaker Progress', 'Reading Coach'],
    },
    research: {
      summary: 'Ressurser for AI og språklæring.',
      resources: [
        { title: 'AI for Education', url: 'https://learn.microsoft.com/training/paths/ai-for-education/' },
        { title: 'AI Skills Navigator', url: 'https://learn.microsoft.com/training/' },
      ],
    },
    senioritet: [
      { level: 'Nybegynner', tasks: ['Test B1-samtale med Copilot', 'Kartlegg klassens nivå', 'Lag samtaleprompter'] },
      { level: 'Erfaren', tasks: ['Speaker Coach i vurdering', 'Rubrikk for muntlig', 'Autentisk aktivitet planlagt'] },
      { level: 'Senior', tasks: ['Mentorér kolleger i muntlig AI', 'Del beste CEFR-prompter', 'Evaluer programmet'] },
    ],
  },

  naturfag: {
    overview: {
      summary: 'Naturfag krever vitenskapelig tenkning. AI visualiserer og foreslår hypoteser – eleven verifiserer.',
      points: ['Vitenskapelig metode vs. hallusinasjoner', 'Search Coach for kilder', 'Laboratorierapporter med kildekrav', 'Visualisering av prosesser'],
      steps: ['Undervis i metode', 'Hypotesegenerering', 'Lab med kilder', 'Evaluer forståelse'],
    },
    navigators: {
      summary: 'AI for undersøkelser og naturfaglig tenkning.',
      cases: [
        { name: 'Auburn University', lesson: 'Kultur for ansvarlig AI-innovasjon' },
        { name: 'Tecnológico de Monterrey', lesson: 'AI-økosystem for personalisert læring' },
      ],
      questions: ['Hvilke temaer egner seg for AI-visualisering?', 'Hvordan lærer vi eleven å spotte feil?', 'Er lab-data verifisert?'],
    },
    plan: {
      summary: 'Planlegg AI i naturfag med kildekritikk i sentrum.',
      checklist: ['Kildebank for naturfag', 'Lab-mal med kildekrav', 'Øvelse i AI-feilanalyse', 'Koble til LK20 naturfaglig metode', 'Search Coach-opplæring'],
      goals: ['Elever verifiserer AI-påstander', 'Lab-rapporter med kilder', 'Hypotesearbeid med AI-støtte'],
    },
    implement: {
      summary: 'Copilot, Search Coach og visualisering i naturfag.',
      actions: ['AI-feil som læringsmoment', 'Demonstrasjon + AI-forklaring', 'Search Coach-økt', 'Gruppepresentasjoner'],
      tools: ['Copilot Chat', 'Search Coach', 'Excel + Copilot', 'PowerPoint + Copilot'],
    },
    research: {
      summary: 'Vitenskapelig tenkning og AI i utdanning.',
      resources: [
        { title: 'AI for Education', url: 'https://learn.microsoft.com/training/paths/ai-for-education/' },
        { title: 'Work Trend Index', url: 'https://www.microsoft.com/en-us/worklab/work-trend-index' },
      ],
    },
    senioritet: [
      { level: 'Nybegynner', tasks: ['Test AI på typiske elevspørsmål', 'Finn hallusinasjoner', 'Lag kildebank'] },
      { level: 'Erfaren', tasks: ['Lab-pilot med kilder', 'Search Coach i bruk', 'Feilanalyse-leksjon'] },
      { level: 'Senior', tasks: ['Tverrfaglig samarbeid', 'Oppdater naturfag-plan', 'Veilede kolleger'] },
    ],
  },

  samfunnsfag: {
    overview: {
      summary: 'Samfunnsfag og AI: debatt, kildekritikk og demokratisk dannelse. Eleven må se bias i AI og media.',
      points: ['Bias-analyse av AI-svar', 'Search Coach for informasjonskompetanse', 'Debat og rollespill', 'Demokrati og medborgerskap'],
      steps: ['Bias-øvelse', 'Search Coach', 'Debat med AI', 'Evaluer argumentasjon'],
    },
    navigators: {
      summary: 'Samfunn og AI i globale utdanningsinstitusjoner.',
      cases: [
        { name: 'Washington State OSPI', lesson: 'Statlig veiledning og AI-standarder' },
        { name: 'South Australia', lesson: 'Kritisk tenkning med AI i klasserommet' },
      ],
      questions: ['Hvordan identifiserer eleven bias?', 'Er AI-motparten saklig nok?', 'Mangler det perspektiver?'],
    },
    plan: {
      summary: 'Plan for AI i demokratisk danning og kildekritikk.',
      checklist: ['Debatstruktur med regler', 'Bias-analyse som fast øvelse', 'Search Coach for prosjekter', 'Mangfold av kilder påkrevd', 'Vurder argumentasjon'],
      goals: ['Elever identifiserer bias', 'Debat med kilder', 'Prosjekt med flere perspektiver'],
    },
    implement: {
      summary: 'Search Coach, debatt og kildeanalyse i samfunnsfag.',
      actions: ['Bias-leksjon', 'Rollespill med AI', 'Nyhetsanalyse', 'Gruppeprosjekt'],
      tools: ['Copilot Chat', 'Search Coach', 'Search Progress', 'Copilot i Edge'],
    },
    research: {
      summary: 'Demokrati, medier og AI.',
      resources: [
        { title: 'AI for Education', url: 'https://learn.microsoft.com/training/paths/ai-for-education/' },
        { title: 'TeachAI', url: 'https://www.teachai.org/' },
      ],
    },
    senioritet: [
      { level: 'Nybegynner', tasks: ['Bias-øvelse i egen klasse', 'Test debatt-prompt', 'Search Coach intro'] },
      { level: 'Erfaren', tasks: ['Prosjekt med kildekrav', 'Debatrubrikk', 'Del beste praksis'] },
      { level: 'Senior', tasks: ['Skolens demokrati- og AI-policy', 'Mentorér samfunnsfaglærere', 'Kontakt med mediér'] },
    ],
  },

  krle: {
    overview: {
      summary: 'KRLE krever respekt og nøyaktighet. AI støtter refleksjon og etikk – fakta om religion må verifiseres.',
      points: ['Reflect for livsmestring', 'Etiske dilemmaer', 'Faktasjekk om religion', 'Respektfull dialog'],
      steps: ['Etiske retningslinjer', 'Reflect intro', 'Dilemma-diskusjon', 'Faktasjekk sammen'],
    },
    navigators: {
      summary: 'Verdier, etikk og AI i utdanning globalt.',
      cases: [
        { name: 'Microsoft Elevate', lesson: 'Verdier og ansvarlig AI i skoler' },
        { name: 'South Australia', lesson: 'Etisk refleksjon med teknologi' },
      ],
      questions: ['Hva er upassende å spørre AI?', 'Hvordan fasilitere sensitive temaer?', 'Er AI-fakta om tro korrekt?'],
    },
    plan: {
      summary: 'Plan for AI i verdiedukasjon med respekt i fokus.',
      checklist: ['Retningslinjer for sensitive temaer', 'Reflect satt opp', 'Pålitelige kilder listet', 'Gjest om livssyn planlagt', 'Dialogregler'],
      goals: ['Trygg diskusjonskultur', 'Faktasjekk-rutine', 'Refleksjonsdybde økt'],
    },
    implement: {
      summary: 'Reflect, dilemmaer og faktasjekk i KRLE.',
      actions: ['Etisk dilemma-leksjon', 'Faktasjekk-økt', 'Reflect-journal', 'Strukturert dialog'],
      tools: ['Copilot Chat', 'Reflect', 'OneNote + Copilot'],
    },
    research: {
      summary: 'Etikk, religion og AI.',
      resources: [
        { title: 'AI in Special Education', url: 'https://learn.microsoft.com/training/' },
        { title: 'Microsoft Elevate for Educators', url: 'https://learn.microsoft.com/education/' },
      ],
    },
    senioritet: [
      { level: 'Nybegynner', tasks: ['Test AI-nøyaktighet om pensum', 'Reflect-pilot', 'Dialogregler'] },
      { level: 'Erfaren', tasks: ['Dilemma-bank', 'Faktasjekk-rutine', 'Smågruppe-diskusjon'] },
      { level: 'Senior', tasks: ['Veilede kolleger i sensitive temaer', 'Skolens verdigrunnlag + AI', 'Foreldreinformasjon'] },
    ],
  },

  kunst: {
    overview: {
      summary: 'Kunst: AI i idéfase og analyse – håndverket forblir elevens. Opphavsrett og prosess er sentralt.',
      points: ['Bildegenerering for moodboards', 'Prosessdokumentasjon', 'Opphavsrett', 'AI-kunst vs. skaperglede'],
      steps: ['Opphavsrett-undervisning', 'Idéfase med AI', 'Fysisk utførelse', 'Utstilling med refleksjon'],
    },
    navigators: {
      summary: 'Kreativitet og AI i utdanning.',
      cases: [
        { name: 'South Australia', lesson: 'Kreativitet og kritisk tenkning med AI' },
        { name: 'NYC Public Schools', lesson: 'AI som kreativt verktøy i stor skole' },
      ],
      questions: ['Er AI-bilder «ekte» kunst?', 'Hva dokumenterer eleven av egen innsats?', 'Hvordan vurderer vi prosess?'],
    },
    plan: {
      summary: 'Plan for AI i kreativ prosess uten å erstatte håndverk.',
      checklist: ['Opphavsrett gjennomgått', 'Idé vs. produkt-regel', 'Prosesslogg-mal', 'Utstillingsplan', 'Rubrikk vekter håndverk'],
      goals: ['Elever bruker AI kun i idéfase', 'Prosess dokumentert', 'Refleksjon om teknologi'],
    },
    implement: {
      summary: 'Bildegenerering, analyse og prosesslogg i kunst.',
      actions: ['Moodboard-leksjon', 'Kunstanalyse', 'Prosessdokumentasjon', 'Utstilling'],
      tools: ['Copilot Chat (bilde)', 'OneNote', 'PowerPoint + Copilot'],
    },
    research: {
      summary: 'Kunst, design og AI.',
      resources: [
        { title: 'AI art prompting guide', url: 'https://learn.microsoft.com/education/' },
        { title: 'AI for Education', url: 'https://learn.microsoft.com/training/paths/ai-for-education/' },
      ],
    },
    senioritet: [
      { level: 'Nybegynner', tasks: ['Opphavsrett-leksjon', 'Moodboard-pilot', 'Prosesslogg intro'] },
      { level: 'Erfaren', tasks: ['Utstillingsrubrikk', 'AI vs. håndverk-debatt', 'Del prompter'] },
      { level: 'Senior', tasks: ['Fagleder kreativ AI-bruk', 'Skolens kunstpolicy', 'Samarbeid med kulturskole'] },
    ],
  },

  programfag: {
    overview: {
      summary: 'Yrkesfag: AI er arbeidsverktøy. GitHub Copilot, agenter og dokumentasjon – kompetanse for arbeidslivet.',
      points: ['GitHub Copilot etisk', 'Copilot Studio for agenter', 'HMS-scenarier', 'Karriere og bransje'],
      steps: ['Copilot-etikk', 'Parprogrammering', 'Agent-prosjekt', 'Karrierekobling'],
    },
    navigators: {
      summary: 'AI i yrkesutdanning og arbeidsliv.',
      cases: [
        { name: 'AI for TVET', lesson: 'AI-kompetanse i yrkesfag (aka.ms/AIforTVET)' },
        { name: 'NYC Public Schools', lesson: 'Karriere og AI i stor utdanning' },
      ],
      questions: ['Hvilken AI brukes i bransjen?', 'Forstår eleven koden den leverer?', 'Er HMS med i bildet?'],
    },
    plan: {
      summary: 'Plan for AI-kompetanse i programfag og YFF.',
      checklist: ['GitHub Education satt opp', 'Etikk for koding', 'Copilot Studio tilgang', 'Bransjekontakt', 'HMS-scenario planlagt'],
      goals: ['Parprogrammering etablert', 'Enkel agent bygget', 'Karriereplan med AI'],
    },
    implement: {
      summary: 'GitHub Copilot, agenter og dokumentasjon i programfag.',
      actions: ['Copilot-installasjon', 'Parprogrammeringsøkt', 'Agent-prosjekt', 'HMS-case', 'Gjest fra bransjen'],
      tools: ['GitHub Copilot', 'Copilot Studio', 'Copilot Chat', 'Power Automate'],
    },
    research: {
      summary: 'AI i yrkesliv og teknisk utdanning.',
      resources: [
        { title: 'AI for TVET Institutions', url: 'https://aka.ms/AIforTVET' },
        { title: 'GitHub Copilot for Education', url: 'https://github.com/education' },
        { title: 'Mastering GitHub Copilot', url: 'https://github.com/education' },
      ],
    },
    senioritet: [
      { level: 'Nybegynner', tasks: ['GitHub Copilot-kurs', 'Etikk-regler', 'Første parprogrammeringsøkt'] },
      { level: 'Erfaren', tasks: ['Agent-prosjekt', 'HMS-scenario', 'Dokumentasjonsmal'] },
      { level: 'Senior', tasks: ['Bransjesamarbeid', 'Mentorér VG1', 'Oppdater læreplan med AI'] },
    ],
  },
};

// Felles toolkit-seksjonsmetadata
const SECTION_META = [
  { id: 'overview', icon: '📋', title: 'Oversikt', toolkit: 'Overview' },
  { id: 'navigators', icon: '🧭', title: 'AI Navigators', toolkit: 'AI Navigators' },
  { id: 'plan', icon: '📐', title: 'Planlegg', toolkit: 'Plan' },
  { id: 'implement', icon: '⚡', title: 'Implementer', toolkit: 'Implement' },
  { id: 'research', icon: '🔬', title: 'Forskning', toolkit: 'Research' },
];

const SENIORITET_META = [
  { id: 'nybegynner', label: 'Nybegynner', color: '#107c10' },
  { id: 'erfaren', label: 'Erfaren', color: '#0078d4' },
  { id: 'senior', label: 'Senior', color: '#8764b8' },
];
