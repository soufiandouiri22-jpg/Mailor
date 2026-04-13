export interface TemplateContent {
  name: string;
  subject: string;
  body: string;
}

export const templateContents: Record<string, TemplateContent> = {
  'Cold Intro': {
    name: 'Cold Intro',
    subject: 'Quick question about {{account.name}}',
    body: `Hey {{contact.first_name}},

{{mailor.icebreaker}}

{{mailor.value_proposition}}

Happy to do a quick demo if you are interested:
{{sender.calendly_link}}`,
  },
  'Follow-up': {
    name: 'Follow-up',
    subject: 'Re: Quick question about {{account.name}}',
    body: `Hey {{contact.first_name}},

Just following up on my last email. I know things get busy so I wanted to keep this short.

We have been helping teams like yours and would love to show you how.

Open to a quick 15 min call?
{{sender.calendly_link}}`,
  },
  'Final Follow-up': {
    name: 'Final Follow-up',
    subject: 'Re: Quick question about {{account.name}}',
    body: `Hey {{contact.first_name}},

Last follow-up from my side. If the timing is not right, no worries at all.

If you are ever looking for a reliable partner, feel free to reach out anytime.`,
  },
  'Gentle Nudge': {
    name: 'Gentle Nudge',
    subject: 'Re: Quick question about {{account.name}}',
    body: `Hey {{contact.first_name}},

Just wanted to follow up on my previous email. I know things get busy.

Would still love to explore if there is a fit. Happy to keep it short, 15 min max.

{{sender.calendly_link}}`,
  },
};

export const defaultSignature = `Best,
Soufian Douiri
UGC.nl`;

/** One row from the customer’s audience; used for realistic template card previews. Replace with API data when wired up. */
export interface DemoLeadRow {
  firstName: string;
  lastName: string;
  company: string;
  icebreaker: string;
  valueProposition: string;
}

export const demoLeadsFromAudience: DemoLeadRow[] = [
  {
    firstName: 'Daniel',
    lastName: 'van Dijk',
    company: 'AdScale',
    icebreaker:
      'Saw you have been scaling paid campaigns at AdScale, impressive. Curious how you are handling creative production as volume grows?',
    valueProposition:
      'We think we could be a strong addition to what you are doing. We work with several companies like AdScale that source high-performing UGC at competitive rates and save their teams hours of manual creator outreach.',
  },
  {
    firstName: 'Sarah',
    lastName: 'Chen',
    company: 'Funnel.io',
    icebreaker:
      'Noticed Funnel.io doubled down on product-led growth lately. Would love to hear how you are thinking about outbound as you expand.',
    valueProposition:
      'We think we could be a strong addition to what you are doing. We work with several companies like Funnel.io that need consistent pipeline without adding more SDR headcount.',
  },
  {
    firstName: 'Tom',
    lastName: 'de Vries',
    company: 'ScaleUp',
    icebreaker:
      'Loved your post last week on scaling outbound without burning the team. That resonates with what we see at ScaleUp-sized teams.',
    valueProposition:
      'We think we could be a strong addition to what you are doing. We work with several companies like ScaleUp that want personalized email at volume without losing the human tone.',
  },
  {
    firstName: 'Lisa',
    lastName: 'Müller',
    company: 'Packhelp',
    icebreaker:
      'Packhelp’s expansion into new markets is exciting. We often help e-commerce brands keep outreach personal while they scale regions.',
    valueProposition:
      'We think we could be a strong addition to what you are doing. We work with several companies like Packhelp that need localized, relevant first lines at scale.',
  },
  {
    firstName: 'Marc',
    lastName: 'Jansen',
    company: 'BoldMedia',
    icebreaker:
      'Saw BoldMedia’s work for DTC brands. We partner with agencies like yours to help source and scale UGC for client campaigns.',
    valueProposition:
      'We think we could be a strong addition to what you are doing. We work with several companies like BoldMedia that want to offer clients faster creative turnaround.',
  },
];

const fallbackDemoLead: DemoLeadRow = {
  firstName: 'Alex',
  lastName: 'Visser',
  company: 'Acme Co.',
  icebreaker:
    'Saw Acme Co. is growing fast. Curious how you are balancing personalized outreach with team capacity right now?',
  valueProposition:
    'We think we could be a strong addition to what you are doing. We work with several companies that need relevant first-touch email without adding manual research hours.',
};

/** Same lead on every template list card (Daniel / AdScale in demo data). */
export const defaultTemplateListPreviewLead: DemoLeadRow =
  demoLeadsFromAudience[0] ?? fallbackDemoLead;

/** Maps {{tags}} to strings for a given lead + sender defaults (preview only). */
export function buildPreviewTagMap(lead: DemoLeadRow): Record<string, string> {
  return {
    '{{contact.first_name}}': lead.firstName,
    '{{contact.last_name}}': lead.lastName,
    '{{account.name}}': lead.company,
    '{{mailor.icebreaker}}': lead.icebreaker,
    '{{mailor.value_proposition}}': lead.valueProposition,
    '{{sender.first_name}}': 'Soufian',
    '{{sender.company_name}}': 'UGC.nl',
    '{{sender.calendly_link}}': 'https://calendly.com/soufian/15min',
  };
}

export const exampleLead: Record<string, string> = {
  '{{contact.first_name}}': 'Daniel',
  '{{contact.last_name}}': 'van Bergen',
  '{{account.name}}': 'BrightMedia',
  '{{mailor.icebreaker}}': 'Saw you recently expanded your team at BrightMedia, congrats on the growth. Curious how you are handling creative production as you scale.',
  '{{mailor.value_proposition}}': 'We think we could be a strong addition to what you are doing. We work with several companies that source high-performing UGC content at competitive rates, saving them hours of manual outreach to creators.',
  '{{sender.first_name}}': 'Soufian',
  '{{sender.company_name}}': 'UGC.nl',
  '{{sender.calendly_link}}': 'https://calendly.com/soufian/15min',
};

export function highlightTags(text: string) {
  const parts = text.split(/({{[^}]+}})/g);
  return parts.map((part, i) => {
    if (part.startsWith('{{') && part.endsWith('}}')) {
      const isAi = part.includes('mailor.');
      return { key: i, text: part, isTag: true as const, isAi };
    }
    return { key: i, text: part, isTag: false as const, isAi: false };
  });
}

export function resolvePreview(text: string): string {
  return text.replace(/{{[^}]+}}/g, (tag) => exampleLead[tag] ?? tag);
}
