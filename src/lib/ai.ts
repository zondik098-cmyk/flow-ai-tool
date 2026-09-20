/**
 * AI service abstraction layer.
 *
 * Every AI capability in the app goes through this module. Today it produces
 * realistic mock responses so the full product can be demonstrated. To connect
 * a real provider later, replace the bodies of these functions with calls to a
 * server function / API route — the UI never needs to change.
 */
import type { ActionItem, EmailLength, Priority, Tone } from "./types";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const uid = () => Math.random().toString(36).slice(2, 10);

export interface EmailRequest {
  recipient: string;
  purpose: string;
  tone: Tone;
  length: EmailLength;
  subject?: string;
  context?: string;
}

const openings: Record<Tone, string> = {
  professional: "I hope this message finds you well.",
  friendly: "Hope you're having a great week!",
  formal: "I trust this correspondence reaches you in good health.",
  concise: "Quick note on the below.",
  persuasive: "I wanted to share something I believe will genuinely help you.",
};

const closings: Record<Tone, string> = {
  professional: "Thank you for your time — I look forward to your thoughts.",
  friendly: "Thanks so much, and let me know if anything's unclear!",
  formal: "I remain at your disposal should you require further information.",
  concise: "Happy to action this once you confirm.",
  persuasive: "I'd love to get your go-ahead so we can move quickly on this.",
};

export async function generateEmail(req: EmailRequest) {
  await wait(1400);
  const name = req.recipient.trim() || "there";
  const purpose = req.purpose.trim() || "following up on our recent conversation";
  const subject =
    req.subject?.trim() ||
    purpose
      .replace(/^(write|send|ask|draft)\s+/i, "")
      .replace(/\.$/, "")
      .replace(/^./, (c) => c.toUpperCase());

  const middle: string[] = [
    `I'm reaching out regarding ${purpose.replace(/\.$/, "")}.`,
  ];
  if (req.context?.trim()) {
    middle.push(req.context.trim());
  }
  if (req.length !== "short") {
    middle.push(
      "To make this easy to action, here is a short summary of where things stand:",
      "• What we agreed: the scope and the outcome we're aiming for\n• What's needed next: your confirmation on timing\n• Who's involved: myself and the wider team",
    );
  }
  if (req.length === "detailed") {
    middle.push(
      "If it would help, I'm glad to set up a short call to walk through the details and answer any questions. I can work around your calendar this week or early next week — whichever is easier for you.",
    );
  }

  const body = [
    `Hi ${name},`,
    openings[req.tone],
    ...middle,
    closings[req.tone],
    "Best regards,\nKwanele",
  ].join("\n\n");

  return { subject, body };
}

export interface MeetingSummaryResult {
  summary: string;
  keyPoints: string[];
  decisions: string[];
  actionItems: ActionItem[];
  followUps: string[];
}

export async function summarizeMeeting(input: {
  title: string;
  notes: string;
  participants: string[];
  context?: string;
}): Promise<MeetingSummaryResult> {
  await wait(1800);
  const lines = input.notes
    .split(/\n|\.\s/)
    .map((l) => l.trim().replace(/^[-•*]\s*/, ""))
    .filter((l) => l.length > 8);

  const people = input.participants.length ? input.participants : ["Unassigned"];
  const pick = (i: number) => people[i % people.length];
  const dueIn = (days: number) =>
    new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);

  const actionCandidates = lines.filter((l) =>
    /will|need|should|todo|action|follow|send|prepare|review|draft|confirm/i.test(l),
  );
  const source = (actionCandidates.length ? actionCandidates : lines).slice(0, 4);
  const priorities: Priority[] = ["high", "medium", "low", "medium"];

  return {
    summary:
      `${input.title || "The meeting"} covered ${lines.length || "several"} discussion threads with ${people.join(", ")}. ` +
      `The team aligned on priorities, clarified ownership, and agreed on the next set of deliverables. ` +
      (input.context?.trim() ? `Context considered: ${input.context.trim()} ` : "") +
      `Momentum is good; the main risk is timeline slippage if owners don't confirm dates this week.`,
    keyPoints: (lines.slice(0, 5).length ? lines.slice(0, 5) : [
      "General status update shared across the team",
      "Open risks and blockers reviewed",
      "Next milestone dates discussed",
    ]),
    decisions: [
      "Proceed with the proposed approach as discussed",
      `${pick(0)} takes ownership of the next milestone`,
      "Progress to be reviewed at the next check-in",
    ],
    actionItems: source.length
      ? source.map((l, i) => ({
          id: uid(),
          task: l.replace(/\s+/g, " ").slice(0, 110),
          assignee: pick(i),
          dueDate: dueIn((i + 1) * 2),
          priority: priorities[i % priorities.length],
        }))
      : [
          {
            id: uid(),
            task: "Circulate the meeting notes to all participants",
            assignee: pick(0),
            dueDate: dueIn(1),
            priority: "medium" as Priority,
          },
        ],
    followUps: [
      "Who signs off on the final deliverable?",
      "Is the current budget sufficient for the agreed scope?",
      "Do we need an additional review session before launch?",
    ],
  };
}

export async function planTasks(goal: string) {
  await wait(1600);
  const g = goal.trim().replace(/\.$/, "") || "your goal";
  const steps = [
    `Clarify scope and success criteria for "${g}"`,
    `Collect the data and inputs needed for ${g}`,
    `Draft the first version and share for early feedback`,
    `Review, refine and incorporate feedback`,
    `Prepare the final deliverable for ${g}`,
    `Schedule a review or rehearsal session`,
  ];
  const priorities: Priority[] = ["high", "high", "medium", "medium", "high", "low"];
  return steps.map((title, i) => ({
    id: uid(),
    title,
    description: `Auto-generated step ${i + 1} of the plan for "${g}".`,
    priority: priorities[i],
    dueDate: new Date(Date.now() + (i + 2) * 86400000).toISOString().slice(0, 10),
  }));
}
