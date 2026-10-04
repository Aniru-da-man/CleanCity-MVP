import { FormEvent, useState } from "react";
import { Bot, HelpCircle, Send, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getCitizenReports } from "@/lib/citizen-reports";

type Message = { from: "agent" | "citizen"; text: string };

const suggestions = ["How do I report waste?", "How do I use the map?", "Where can I find my report?"];

function answerFor(question: string): string {
  const text = question.toLowerCase();
  if (text.includes("report")) return "Open Reporting from the citizen portal, choose the waste information type, add the location and details, then select Submit report.";
  if (text.includes("map")) return "Open The map from the citizen portal. Use it to understand the location of your report and choose the right place before submitting.";
  if (text.includes("find") || text.includes("status")) {
    const reports = getCitizenReports();
    if (reports.length === 0) return "You have not submitted a report from this account yet. Open Reporting to share a waste issue with the municipal team.";
    const latest = reports[0]!;
    return `Your latest report ${latest.id} about ${latest.type.toLowerCase()} near ${latest.location} is ${latest.status.toLowerCase()}. Open Reporting to see your recent reports.`;
  }
  return "I can help you operate the citizen portal. Ask me about reporting, the map, or navigating CleanCity AI.";
}

export function CitizenAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ from: "agent", text: "Hi! I can help you report waste and use the citizen portal. What would you like to do?" }]);

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;
    setMessages((current) => [...current, { from: "citizen", text: question }, { from: "agent", text: answerFor(question) }]);
    setInput("");
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col p-6 md:p-10">
      <div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"><Bot className="h-4 w-4" /> Citizen agent</div><h1 className="mt-3 text-3xl font-bold tracking-tight">Help using CleanCity AI</h1><p className="mt-2 text-sm text-muted-foreground">The agent helps with the operation and helps the citizen operate the app.</p></div>
      <div className="mt-7 flex-1 space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6">
        {messages.map((message, index) => <div key={`${message.from}-${index}`} className={cn("flex max-w-2xl gap-3", message.from === "citizen" && "ml-auto flex-row-reverse")}><div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", message.from === "agent" ? "bg-primary/15 text-primary" : "bg-white/10 text-slate-300")} >{message.from === "agent" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}</div><div className={cn("rounded-2xl px-4 py-3 text-sm leading-6", message.from === "agent" ? "rounded-tl-sm border border-white/10 bg-white/[0.04] text-slate-200" : "rounded-tr-sm bg-primary text-primary-foreground")}>{message.text}</div></div>)}
        <div className="flex flex-wrap gap-2 pt-2">{suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => { setInput(suggestion); }} className="rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 text-xs text-primary hover:bg-primary/10"><HelpCircle className="mr-1 inline h-3 w-3" />{suggestion}</button>)}</div>
      </div>
      <form onSubmit={send} className="mt-4 flex gap-2"><Input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask how to use the app..." className="h-11 border-white/10 bg-white/5" /><button type="submit" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90" aria-label="Send message"><Send className="h-4 w-4" /></button></form>
    </div>
  );
}
