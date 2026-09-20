export type Priority = "high" | "medium" | "low";
export type TaskStatus = "todo" | "in-progress" | "completed";
export type Tone = "professional" | "friendly" | "formal" | "concise" | "persuasive";
export type EmailLength = "short" | "medium" | "detailed";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  preferences: {
    theme: "light" | "dark";
    defaultTone: Tone;
    defaultPriority: Priority;
    writingStyle: string;
    defaultLength: EmailLength;
    aiSuggestions: boolean;
    emailNotifications: boolean;
    taskReminders: boolean;
    meetingReminders: boolean;
    productivityReports: boolean;
  };
}

export interface EmailDraft {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  tone: Tone;
  createdAt: string;
}

export interface ActionItem {
  id: string;
  task: string;
  assignee: string;
  dueDate: string;
  priority: Priority;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time?: string;
  participants: string[];
  notes?: string;
  summary?: string;
  keyPoints?: string[];
  decisions?: string[];
  actionItems?: ActionItem[];
  followUps?: string[];
  status?: "upcoming" | "completed";
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
  assignee: string;
  tags: string[];
  createdAt: string;
  completedAt?: string;
}

export type ActivityType =
  | "email"
  | "meeting"
  | "task-created"
  | "task-completed"
  | "meeting-added"
  | "ai-plan";

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  timestamp: string;
}

export interface Reminder {
  id: string;
  title: string;
  date: string;
}
