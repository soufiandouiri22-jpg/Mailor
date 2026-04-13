import { useState } from 'react';
import PageHeader from '../components/PageHeader';

interface Conversation {
  id: number;
  name: string;
  company: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  messages: { from: 'you' | 'prospect'; text: string; time: string }[];
}

const conversations: Conversation[] = [
  {
    id: 1,
    name: 'Daniel van Dijk',
    company: 'AdScale',
    lastMessage: "Thanks for reaching out, we're actually looking into this right now.",
    time: '2h ago',
    unread: true,
    messages: [
      {
        from: 'you',
        text: "Hey Daniel,\n\nSaw you've been at AdScale for over 4 years, impressive run. Noticed you're scaling paid campaigns and was curious how you're handling creative production as volume grows?\n\nWe've been helping similar teams automate that side of things. Happy to share what's been working.\n\nBest,\nSoufian",
        time: 'Yesterday 10:14',
      },
      {
        from: 'prospect',
        text: "Hi Soufian,\n\nThanks for reaching out, we're actually looking into this right now. Would love to hear more about what you're building.\n\nDo you have time for a quick call Thursday?\n\nDaniel",
        time: 'Today 08:32',
      },
    ],
  },
  {
    id: 2,
    name: 'Sarah Chen',
    company: 'Funnel.io',
    lastMessage: 'Interesting, let me check with my team and get back to you.',
    time: '5h ago',
    unread: false,
    messages: [
      {
        from: 'you',
        text: "Hey Sarah,\n\nCongrats on the Series B! Noticed Funnel.io is scaling fast. We help growth teams like yours source UGC content without the usual back-and-forth.\n\nWorth a quick 15-min look?\n\nBest,\nSoufian",
        time: 'Monday 14:20',
      },
      {
        from: 'prospect',
        text: "Hi Soufian,\n\nInteresting, let me check with my team and get back to you.\n\nSarah",
        time: 'Tuesday 09:15',
      },
      {
        from: 'you',
        text: "Sounds good, Sarah. Here's a quick demo link whenever you're ready:\nhttps://calendly.com/mailor/demo\n\nNo rush at all.\n\nBest,\nSoufian",
        time: 'Tuesday 09:16',
      },
    ],
  },
  {
    id: 3,
    name: 'Tom de Vries',
    company: 'ScaleUp',
    lastMessage: 'Could you send over some pricing info?',
    time: '1d ago',
    unread: true,
    messages: [
      {
        from: 'you',
        text: "Hey Tom,\n\nSaw your recent post about scaling outbound, really resonated. We've been helping teams like ScaleUp automate personalized outreach without losing the human touch.\n\nWould love to show you how it works.\n\nBest,\nSoufian",
        time: 'Sunday 11:00',
      },
      {
        from: 'prospect',
        text: "Hi Soufian,\n\nThanks, this looks relevant. Could you send over some pricing info?\n\nTom",
        time: 'Monday 16:45',
      },
    ],
  },
  {
    id: 4,
    name: 'Lisa Müller',
    company: 'Packhelp',
    lastMessage: "Sure, Thursday 2pm works. Talk then!",
    time: '1d ago',
    unread: false,
    messages: [
      {
        from: 'you',
        text: "Hey Lisa,\n\nNoticed Packhelp is expanding into new markets, exciting times. We help e-commerce brands produce UGC content at scale, which tends to be a bottleneck during expansion.\n\nWould a quick 15 min call make sense?\n\nBest,\nSoufian",
        time: 'Saturday 09:30',
      },
      {
        from: 'prospect',
        text: "Hi Soufian,\n\nSure, Thursday 2pm works. Talk then!\n\nLisa",
        time: 'Sunday 14:10',
      },
    ],
  },
  {
    id: 5,
    name: 'Marc Jansen',
    company: 'BoldMedia',
    lastMessage: "Appreciate the outreach, but we're covered on this front.",
    time: '2d ago',
    unread: false,
    messages: [
      {
        from: 'you',
        text: "Hey Marc,\n\nSaw BoldMedia is doing great work for DTC brands. We work with agencies like yours to help source and scale UGC, figured it might be a good fit.\n\nOpen to a quick chat?\n\nBest,\nSoufian",
        time: 'Friday 10:00',
      },
      {
        from: 'prospect',
        text: "Hi Soufian,\n\nAppreciate the outreach, but we're covered on this front. Best of luck with Mailor though!\n\nMarc",
        time: 'Friday 16:30',
      },
    ],
  },
];

export default function Inbox() {
  const [selected, setSelected] = useState<number>(conversations[0].id);
  const active = conversations.find((c) => c.id === selected);

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      <PageHeader title="Inbox" description="Conversations with your prospects" />

      <div className="flex-1 min-h-0 flex border border-gray-200 rounded-xl overflow-hidden bg-white">
        {/* Conversation list */}
        <div className="w-[340px] border-r border-gray-200 overflow-y-auto">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`w-full text-left px-4 py-3.5 border-b border-gray-100 transition-colors ${
                selected === c.id ? 'bg-gray-50' : 'hover:bg-gray-50/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  {c.unread && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />}
                  <span className={`text-[13px] ${c.unread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                    {c.name}
                  </span>
                </div>
                <span className="text-[11px] text-gray-400">{c.time}</span>
              </div>
              <p className="text-[11px] text-gray-400 mb-0.5">{c.company}</p>
              <p className="text-[12px] text-gray-500 truncate">{c.lastMessage}</p>
            </button>
          ))}
        </div>

        {/* Conversation thread */}
        <div className="flex-1 flex flex-col">
          {active && (
            <>
              <div className="px-6 py-4 border-b border-gray-100 shrink-0">
                <p className="text-[14px] font-semibold text-gray-900">{active.name}</p>
                <p className="text-[12px] text-gray-400">{active.company}</p>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {active.messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'you' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        msg.from === 'you'
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      <p className={`text-[10px] mt-1.5 ${msg.from === 'you' ? 'text-gray-400' : 'text-gray-400'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 border-t border-gray-100 shrink-0">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Type a reply..."
                    className="flex-1 px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
                  />
                  <button className="px-4 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
