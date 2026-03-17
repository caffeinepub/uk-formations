import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
  chips?: string[];
};

type ResponseEntry = {
  text: string;
  chips?: string[];
};

const DEFAULT_CHIPS = [
  "How much does it cost?",
  "How long does it take?",
  "What do I need to register?",
  "What packages do you offer?",
  "How do I get started?",
];

const GREETING: Message = {
  id: "greeting",
  role: "bot",
  text: "Hi there! 👋 Welcome to UK Formations. I'm here to help answer your questions about registering a UK limited company. What would you like to know?",
  chips: DEFAULT_CHIPS,
};

function getResponse(input: string): ResponseEntry {
  const q = input.toLowerCase();

  if (/cost|price|how much/.test(q)) {
    return {
      text: "Our packages start from £12.99 for the Essential package, £49.99 for Professional, and £99.99 for Premium. All include Companies House filing fees. Would you like to know what's included in each?",
      chips: [
        "What's in Essential?",
        "What's in Professional?",
        "What's in Premium?",
      ],
    };
  }
  if (/essential/.test(q)) {
    return {
      text: "The Essential package (£12.99) includes: company incorporation, digital certificate, memorandum & articles, and online filing. Perfect if you just need the basics.",
    };
  }
  if (/professional/.test(q)) {
    return {
      text: "The Professional package (£49.99) adds: registered office address (1 year), mail forwarding, bank referral, and priority processing on top of everything in Essential.",
    };
  }
  if (/premium/.test(q)) {
    return {
      text: "The Premium package (£99.99) is our all-inclusive option: everything in Professional plus VAT registration, PAYE registration, business bank account referral, and a dedicated formation specialist.",
    };
  }
  if (/how long|time|quick/.test(q)) {
    return {
      text: "Most companies are registered within 3-6 working hours after we receive your documents. Same-day registration is often possible if submitted before 3pm. The whole online process takes about 10 minutes to complete.",
    };
  }
  if (/need|require|documents/.test(q)) {
    return {
      text: "To register a UK limited company you'll need: a unique company name, at least one director (can be yourself), at least one shareholder, a registered office address in the UK, and a SIC code for your business activity. We guide you through all of this in our simple wizard.",
    };
  }
  if (/vat/.test(q)) {
    return {
      text: "VAT registration is included in our Premium package, or available as an add-on for £49.99. We handle the full HMRC registration process. You must register for VAT if your taxable turnover exceeds £85,000 per year, though you can register voluntarily before that.",
      chips: ["Tell me about PAYE", "What's the Premium package?"],
    };
  }
  if (/paye|payroll/.test(q)) {
    return {
      text: "PAYE (Pay As You Earn) registration is needed if you plan to pay yourself or any employees a salary. It's included in our Premium package or available as an add-on for £39.99. We register your company as an employer with HMRC.",
      chips: ["Tell me about VAT", "What's the Premium package?"],
    };
  }
  if (/registered office|address/.test(q)) {
    return {
      text: "A UK registered office address is required for all limited companies -- it's where official correspondence from Companies House and HMRC is sent. We provide a prestigious London address with our Professional and Premium packages, or as a standalone add-on for £39/year.",
    };
  }
  if (/get started|start|begin|how do i/.test(q)) {
    return {
      text: "Getting started is easy! Just click 'Start Your Formation' and follow our 4-step wizard: 1) Check your company name is available, 2) Choose your package, 3) Review your features, 4) Complete payment and your company is formed. The whole process takes about 10 minutes.",
      chips: ["How much does it cost?", "What do I need?"],
    };
  }
  if (/contact|speak|talk|human|person|call/.test(q)) {
    return {
      text: "You can reach our team at: Phone: +44 20 1234 5678 (Mon-Fri 9am-6pm), Email: info@ukformations.co.uk. We typically respond to emails within 2 hours during business hours.",
    };
  }
  if (/bank|account/.test(q)) {
    return {
      text: "We work with several UK business banks and can provide referrals with our Professional and Premium packages. Opening a business bank account is a separate process but we'll guide you through it.",
    };
  }
  if (/sole trader|limited|difference/.test(q)) {
    return {
      text: "A limited company (Ltd) is a separate legal entity from you personally, giving you limited liability protection. A sole trader is simpler to set up but you're personally liable for business debts. Most businesses benefit from the protection and credibility of a limited company.",
    };
  }
  if (/packages/.test(q)) {
    return {
      text: "We offer three packages: Essential (£12.99) for basic incorporation, Professional (£49.99) with registered office and mail forwarding, and Premium (£99.99) with VAT/PAYE registration and a dedicated specialist. Which one interests you?",
      chips: [
        "What's in Essential?",
        "What's in Professional?",
        "What's in Premium?",
      ],
    };
  }

  return {
    text: "I'm not sure I fully understand your question. I can help with topics like our packages, pricing, registration requirements, VAT/PAYE, or how to get started. Or you can contact our team directly at info@ukformations.co.uk.",
    chips: [
      "How much does it cost?",
      "How long does it take?",
      "Contact the team",
    ],
  };
}

export default function ContactChatbot() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on every message/typing change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || isTyping) return;

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        text: text.trim(),
      };

      setMessages((prev) => [
        ...prev.map((m) => ({ ...m, chips: undefined })),
        userMsg,
      ]);
      setInputValue("");
      setIsTyping(true);

      setTimeout(
        () => {
          const response = getResponse(text);
          const botMsg: Message = {
            id: `bot-${Date.now()}`,
            role: "bot",
            text: response.text,
            chips: response.chips,
          };
          setIsTyping(false);
          setMessages((prev) => [...prev, botMsg]);
        },
        1000 + Math.random() * 500,
      );
    },
    [isTyping],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const latestBotChips = messages
    .filter((m) => m.role === "bot" && m.chips)
    .slice(-1)[0]?.chips;

  return (
    <div
      className="rounded-2xl shadow-xl border border-border overflow-hidden bg-card flex flex-col"
      style={{ height: 520 }}
      data-ocid="chatbot.panel"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-primary text-primary-foreground">
        <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
          <MessageCircle className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-sm leading-tight">
            UK Formations Assistant
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
            <span className="text-xs text-primary-foreground/80">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-muted/20"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {msg.role === "bot" && (
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                  <MessageCircle className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[78%] flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-card border border-border text-foreground rounded-tl-sm shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.chips && msg.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {msg.chips.map((chip) => (
                      <button
                        type="button"
                        key={chip}
                        onClick={() => sendMessage(chip)}
                        className="px-3 py-1 rounded-full text-xs border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors bg-card shadow-sm"
                        data-ocid="chatbot.button"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-2"
              data-ocid="chatbot.loading_state"
            >
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                <MessageCircle className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-muted-foreground/50"
                      style={{ animation: `bounce 1.2s infinite ${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick reply chips above input */}
      {!isTyping &&
        latestBotChips &&
        messages[messages.length - 1]?.role === "bot" && (
          <div className="px-4 pt-3 pb-1 flex flex-wrap gap-1.5 bg-background border-t border-border">
            {latestBotChips.map((chip) => (
              <button
                type="button"
                key={chip}
                onClick={() => sendMessage(chip)}
                className="px-3 py-1 rounded-full text-xs border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors bg-card"
                data-ocid="chatbot.button"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 px-4 py-3 bg-background border-t border-border"
      >
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 text-sm"
          disabled={isTyping}
          data-ocid="chatbot.input"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!inputValue.trim() || isTyping}
          className="shrink-0"
          data-ocid="chatbot.submit_button"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
