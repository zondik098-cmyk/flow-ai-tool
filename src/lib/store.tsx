import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  Activity,
  ActivityType,
  EmailDraft,
  Meeting,
  Reminder,
  Task,
  User,
} from "./types";

const STORAGE_KEY = "awpa-state-v1";

export const uid = () => Math.random().toString(36).slice(2, 10);
const iso = (offsetDays = 0) =>
  new Date(Date.now() + offsetDays * 86400000).toISOString();
const day = (offsetDays = 0) => iso(offsetDays).slice(0, 10);

interface AppState {
  user: User | null;
  tasks: Task[];
  emails: EmailDraft[];
  meetings: Meeting[];
  activities: Activity[];
  reminders: Reminder[];
}

export const defaultUser: User = {
  id: "u1",
  name: "Kwanele Zondi",
  email: "kwanele@northwind.co",
  createdAt: iso(-120),
  preferences: {
    theme: "light",
    defaultTone: "professional",
    defaultPriority: "medium",
    writingStyle: "Clear and concise business English",
    defaultLength: "medium",
    aiSuggestions: true,
    emailNotifications: true,
    taskReminders: true,
    meetingReminders: true,
    productivityReports: false,
  },
};

function seedState(user: User | null): AppState {
  return {
    user,
    tasks: [
      {
        id: uid(),
        title: "Send Q3 report to leadership",
        description: "Final numbers plus a one-page executive summary.",
        status: "in-progress",
        priority: "high",
        dueDate: day(0),
        assignee: "Kwanele Zondi",
        tags: ["reporting", "finance"],
        createdAt: iso(-2),
      },
      {
        id: uid(),
        title: "Review onboarding copy",
        description: "Tighten the wording on the first three screens.",
        status: "todo",
        priority: "medium",
        dueDate: day(1),
        assignee: "Thandi Mokoena",
        tags: ["product"],
        createdAt: iso(-1),
      },
      {
        id: uid(),
        title: "Follow up with Acme on contract",
        description: "Confirm the revised start date before Friday.",
        status: "todo",
        priority: "high",
        dueDate: day(0),
        assignee: "Kwanele Zondi",
        tags: ["sales"],
        createdAt: iso(-3),
      },
      {
        id: uid(),
        title: "Update team wiki",
        description: "Document the new release checklist.",
        status: "completed",
        priority: "low",
        dueDate: day(-1),
        assignee: "Sipho Dube",
        tags: ["internal"],
        createdAt: iso(-5),
        completedAt: iso(-1),
      },
      {
        id: uid(),
        title: "Prepare sprint demo",
        description: "Walk through the three shipped features.",
        status: "completed",
        priority: "medium",
        dueDate: day(-2),
        assignee: "Kwanele Zondi",
        tags: ["product", "demo"],
        createdAt: iso(-6),
        completedAt: iso(-2),
      },
    ],
    emails: [
      {
        id: uid(),
        recipient: "Lerato Khumalo",
        subject: "Follow-up on yesterday's discovery call",
        body: "Hi Lerato,\n\nThank you for your time yesterday...",
        tone: "professional",
        createdAt: iso(-1),
      },
    ],
    meetings: [
      {
        id: uid(),
        title: "Weekly product sync",
        date: day(0),
        time: "09:30",
        participants: ["Thandi Mokoena", "Sipho Dube", "Kwanele Zondi"],
        status: "upcoming",
      },
      {
        id: uid(),
        title: "Acme contract review",
        date: day(0),
        time: "14:00",
        participants: ["Acme Legal", "Kwanele Zondi"],
        status: "upcoming",
      },
      {
        id: uid(),
        title: "Quarterly planning",
        date: day(2),
        time: "11:00",
        participants: ["Leadership team"],
        status: "upcoming",
      },
    ],
    activities: [
      {
        id: uid(),
        type: "email",
        description: "Generated a follow-up email for Lerato Khumalo",
        timestamp: iso(-1),
      },
      {
        id: uid(),
        type: "task-completed",
        description: "Completed “Prepare sprint demo”",
        timestamp: iso(-2),
      },
      {
        id: uid(),
        type: "meeting",
        description: "Summarized “Design review” meeting notes",
        timestamp: iso(-3),
      },
    ],
    reminders: [
      { id: uid(), title: "Submit timesheet", date: day(1) },
      { id: uid(), title: "Renew software licence", date: day(4) },
    ],
  };
}

interface Store {
  hydrated: boolean;
  user: User | null;
  tasks: Task[];
  emails: EmailDraft[];
  meetings: Meeting[];
  activities: Activity[];
  reminders: Reminder[];
  theme: "light" | "dark";
  toggleTheme: () => void;
  signIn: (name: string, email: string) => void;
  signOut: () => void;
  updateUser: (patch: Partial<User>) => void;
  updatePreferences: (patch: Partial<User["preferences"]>) => void;
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  addTasks: (tasks: Omit<Task, "id" | "createdAt">[]) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  saveEmail: (email: Omit<EmailDraft, "id" | "createdAt">) => void;
  saveMeeting: (meeting: Omit<Meeting, "id">) => void;
  logActivity: (type: ActivityType, description: string) => void;
}

const StoreContext = createContext<Store | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => seedState(null));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw) as AppState);
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or unavailable */
    }
  }, [state, hydrated]);

  const theme = state.user?.preferences.theme ?? "light";

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, hydrated]);

  const patch = useCallback((fn: (s: AppState) => AppState) => setState(fn), []);

  const logActivity = useCallback(
    (type: ActivityType, description: string) =>
      patch((s) => ({
        ...s,
        activities: [{ id: uid(), type, description, timestamp: iso() }, ...s.activities],
      })),
    [patch],
  );

  const value = useMemo<Store>(
    () => ({
      hydrated,
      ...state,
      theme,
      toggleTheme: () =>
        patch((s) =>
          s.user
            ? {
                ...s,
                user: {
                  ...s.user,
                  preferences: {
                    ...s.user.preferences,
                    theme: s.user.preferences.theme === "dark" ? "light" : "dark",
                  },
                },
              }
            : s,
        ),
      signIn: (name, email) =>
        setState(() =>
          seedState({
            ...defaultUser,
            id: uid(),
            name: name || defaultUser.name,
            email: email || defaultUser.email,
            createdAt: iso(),
          }),
        ),
      signOut: () => {
        document.documentElement.classList.remove("dark");
        setState(seedState(null));
      },
      updateUser: (p) => patch((s) => (s.user ? { ...s, user: { ...s.user, ...p } } : s)),
      updatePreferences: (p) =>
        patch((s) =>
          s.user
            ? { ...s, user: { ...s.user, preferences: { ...s.user.preferences, ...p } } }
            : s,
        ),
      addTask: (t) =>
        patch((s) => ({ ...s, tasks: [{ ...t, id: uid(), createdAt: iso() }, ...s.tasks] })),
      addTasks: (list) =>
        patch((s) => ({
          ...s,
          tasks: [...list.map((t) => ({ ...t, id: uid(), createdAt: iso() })), ...s.tasks],
        })),
      updateTask: (id, p) =>
        patch((s) => ({
          ...s,
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...p } : t)),
        })),
      deleteTask: (id) =>
        patch((s) => ({ ...s, tasks: s.tasks.filter((t) => t.id !== id) })),
      toggleTask: (id) =>
        patch((s) => ({
          ...s,
          tasks: s.tasks.map((t) =>
            t.id === id
              ? t.status === "completed"
                ? { ...t, status: "todo" as const, completedAt: undefined }
                : { ...t, status: "completed" as const, completedAt: iso() }
              : t,
          ),
        })),
      saveEmail: (e) =>
        patch((s) => ({ ...s, emails: [{ ...e, id: uid(), createdAt: iso() }, ...s.emails] })),
      saveMeeting: (m) =>
        patch((s) => ({ ...s, meetings: [{ ...m, id: uid() }, ...s.meetings] })),
      logActivity,
    }),
    [state, hydrated, theme, patch, logActivity],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside AppProvider");
  return ctx;
}
