# AI WorkFlow Hub

Absolutely — here’s a detailed prompt you can paste into an AI app builder such as Lovable, Bolt, Replit, or another code-generation tool.

 AI Workplace Productivity Assistant — App Builder Prompt

Build a professional, modern, responsive SaaS web application called **“AI Workplace Productivity Assistant”**.

 The application should help professionals and teams save time by using AI to generate emails, summarize meeting notes, and organize tasks.

 ## 1\. Overall Product Requirements

 Create a polished workplace productivity platform with:

 - Responsive design for desktop, tablet, and mobile.
- Clean, modern SaaS-style UI.
- Professional business aesthetic.
- Fast and intuitive navigation.
- Accessible typography, spacing, buttons, and form controls.
- Light mode and dark mode.
- Smooth but subtle animations and transitions.
- Toast notifications for successful actions and errors.
- Loading states and skeleton loaders wherever appropriate.
- Empty states with useful guidance.
- Fully functional frontend interactions rather than static mockups.

 Use a consistent visual system with:

 - Primary color: blue or indigo.
- Neutral white/gray backgrounds.
- Rounded cards and buttons.
- Subtle shadows and borders.
- Modern icons.
- Clear visual hierarchy.
- Responsive sidebar navigation on desktop and collapsible navigation on mobile.

 ## 2\. Main Application Layout

 Create an authenticated application dashboard with the following navigation:

 - Dashboard
- AI Email Generator
- Meeting Summarizer
- Task Planner
- Calendar
- Activity
- Settings

 Include a user profile section at the bottom of the sidebar with:

 - Avatar
- User name
- Email
- Account/settings menu
- Logout

 On mobile, convert the sidebar into a hamburger menu or bottom navigation.

 ## 3\. Dashboard

 Create a professional dashboard showing an overview of the user's productivity.

 At the top:

 **“Good morning, \[User Name\]”**

 Subtitle:

 **“Here’s your productivity overview for today.”**

 Include summary cards:

 - Tasks completed
- Tasks remaining
- Meetings today
- Emails generated
- Productivity percentage

 Add a **Quick Actions** section with large cards/buttons:

 - ✉️ Generate Email
- 📝 Summarize Meeting
- ✅ Create Task
- 📅 View Calendar

 Add a **Today's Tasks** section showing:

 - Task name
- Priority
- Due time/date
- Status
- Completion checkbox

 Add a **Upcoming Meetings** section showing:

 - Meeting title
- Time
- Participants
- Meeting status

 Add a productivity analytics section with a simple chart showing completed tasks and productivity trends over the last 7 days.

 ## 4\. AI Email Generator

 Create a dedicated **AI Email Generator** page.

 The interface should have a clean two-column layout on desktop and a stacked layout on mobile.

 ### Left panel — Email Input

 Include:

 - Recipient name
- Email purpose
- Tone selector:
  - Professional
  - Friendly
  - Formal
  - Concise
  - Persuasive
- Email length:
  - Short
  - Medium
  - Detailed
- Subject field
- Additional context textarea

 Add a large button:

 **“Generate Email”**

 ### Right panel — Generated Email

 Display:

 - Generated subject
- Generated email body
- Copy button
- Regenerate button
- Edit button
- Save Draft button

 Add formatting controls for:

 - Bold
- Italic
- Bullet points

 Include example prompts such as:

 - “Write a professional follow-up email after a client meeting.”
- “Ask my manager for two days of leave.”
- “Send a polite reminder about an overdue invoice.”

 The generated email should sound natural, professional, and human.

 ## 5\. Meeting Notes Summarizer

 Create a **Meeting Summarizer** page.

 Allow users to either:

 - Paste meeting notes into a textarea.
- Upload a text/document file.
- Enter meeting transcript text.

 Include fields for:

 - Meeting title
- Date
- Participants
- Optional meeting context

 Add a prominent:

 **“Summarize Meeting”**

 button.

 After processing, display the results in separate cards:

 ### Meeting Summary

 A concise overview of the meeting.

 ### Key Discussion Points

 Bullet-point list of important topics.

 ### Decisions Made

 Clearly identify decisions reached during the meeting.

 ### Action Items

 Show:

 - Task
- Assigned person
- Due date
- Priority

 ### Follow-Up Questions

 List unresolved questions or issues.

 Provide buttons to:

 - Copy Summary
- Download Summary
- Create Tasks From Action Items
- Regenerate Summary

 Make the action items interactive so the user can send them directly to the Task Planner.

 ## 6\. Task Planner

 Create a full-featured **Task Planner**.

 Allow users to:

 - Create tasks
- Edit tasks
- Delete tasks
- Complete tasks
- Assign priorities
- Set due dates
- Add descriptions
- Add tags
- Assign tasks to people
- Filter tasks
- Search tasks

 Task priorities:

 - 🔴 High
- 🟡 Medium
- 🟢 Low

 Task statuses:

 - To Do
- In Progress
- Completed

 Provide multiple views:

 - List View
- Kanban Board
- Calendar View

 The Kanban board should have columns:

 **To Do → In Progress → Completed**

 Allow drag-and-drop between columns.

 Each task card should display:

 - Task title
- Short description
- Priority
- Due date
- Assignee
- Tags
- Completion status

 Add a floating or prominent **“+ New Task”** button.

 ## 7\. AI Task Planning

 Add an AI-powered task planning feature.

 Allow the user to enter a goal such as:

 > “Prepare the quarterly business presentation.”

 The AI should break the goal into smaller actionable tasks.

 For example:

 - Collect quarterly performance data
- Analyze sales results
- Create presentation outline
- Build presentation slides
- Review presentation
- Schedule presentation rehearsal

 Allow the user to review, edit, and approve the generated tasks before adding them to the Task Planner.

 ## 8\. Calendar

 Create a simple productivity calendar.

 Show:

 - Meetings
- Task deadlines
- Reminders
- Important events

 Support:

 - Month view
- Week view
- Day view

 Use different colors for meetings, tasks, and reminders.

 Allow users to click an event to view its details.

 ## 9\. Activity Page

 Create an activity timeline showing recent actions such as:

 - Email generated
- Meeting summarized
- Task created
- Task completed
- Meeting added
- AI task plan created

 Each activity should display:

 - Icon
- Description
- Timestamp

 ## 10\. Settings

 Create a professional settings page with sections:

 ### Profile

 - Name
- Email
- Profile photo

 ### Preferences

 - Theme
- Default email tone
- Default task priority
- Notification preferences

 ### Notifications

 - Email notifications
- Task reminders
- Meeting reminders
- Productivity reports

 ### AI Preferences

 - Writing style
- Default response length
- AI suggestions toggle

 ### Security

 - Change password
- Two-factor authentication
- Active sessions

 ## 11\. AI Experience

 Create a consistent AI interaction system throughout the application.

 Use a subtle AI indicator such as:

 **✨ AI Assistant**

 Show AI processing states such as:

 **“AI is analyzing your notes…”**

 **“Generating your email…”**

 **“Creating your task plan…”**

 Use streaming-style or animated loading indicators where appropriate.

 AI results should be editable before users save or apply them.

 ## 12\. Data Model

 Design the application around these core entities:

 ### User

 - id
- name
- email
- avatar
- preferences
- createdAt

 ### Email

 - id
- userId
- recipient
- subject
- body
- tone
- createdAt

 ### Meeting

 - id
- userId
- title
- date
- participants
- notes
- summary
- decisions
- actionItems

 ### Task

 - id
- userId
- title
- description
- status
- priority
- dueDate
- assignee
- tags
- createdAt
- completedAt

 ### Activity

 - id
- userId
- type
- description
- timestamp

 ## 13\. Backend and AI Integration

 Structure the application so it can connect to a real backend and AI provider.

 Use secure API endpoints for:

 - Email generation
- Meeting summarization
- Task generation
- Authentication
- CRUD operations
- User preferences

 Do not expose API keys or secrets in frontend code.

 Use environment variables for API credentials.

 Create clean service/API abstraction layers so the AI provider can be replaced later without rewriting the UI.

 If no real AI API is configured, provide realistic mock responses so the complete interface can still be demonstrated.

 ## 14\. Authentication

 Create:

 - Sign Up
- Login
- Forgot Password
- Logout
- Remember Me

 After login, redirect the user to the Dashboard.

 Use protected routes for authenticated pages.

 ## 15\. Responsive Design

 The application must work exceptionally well on:

 - Desktop
- Laptop
- Tablet
- Mobile

 Desktop:

 - Persistent sidebar
- Multi-column dashboard
- Two-column AI interfaces

 Tablet:

 - Collapsible sidebar
- Responsive cards

 Mobile:

 - Single-column layouts
- Bottom navigation or hamburger menu
- Full-width inputs and buttons
- Horizontally scrollable tabs where appropriate
- Touch-friendly controls

 Do not allow horizontal page overflow.

 ## 16\. UX Details

 Add polished micro-interactions:

 - Button hover states
- Card hover states
- Smooth page transitions
- Dropdown animations
- Modal animations
- Drag-and-drop feedback
- Toast notifications
- Confirmation dialogs for destructive actions

 Use clear validation messages.

 For example:

 **“Please enter some meeting notes before generating a summary.”**

 For successful actions:

 **“Meeting summary generated successfully.”**

 **“Task added to your planner.”**

 ## 17\. Landing Page

 Before authentication, create a professional marketing landing page.

 Hero headline:

 **“Work Smarter With Your AI Productivity Assistant.”**

 Subtitle:

 **“Generate better emails, turn meetings into actionable tasks, and organize your work with AI.”**

 Primary CTA:

 **“Get Started Free”**

 Secondary CTA:

 **“Explore Features”**

 Include sections for:

 - AI Email Generator
- Meeting Summarizer
- Smart Task Planner
- Productivity Dashboard
- How It Works
- Benefits
- Testimonials
- Pricing
- FAQ
- Final CTA

 Keep the landing page professional and suitable for a modern B2B SaaS product.

 ## 18\. Technical Quality

 Use a scalable component architecture.

 Create reusable components for:

 - Buttons
- Cards
- Modals
- Forms
- Inputs
- Dropdowns
- Tabs
- Tables
- Task cards
- AI result cards
- Toast notifications
- Loading states
- Empty states

 Use clean, maintainable code.

 Avoid duplicated components and unnecessary complexity.

 Ensure:

 - Semantic HTML
- Keyboard accessibility
- Good color contrast
- Proper form labels
- Responsive typography
- Accessible interactive elements

 ## 19\. Final Product Goal

 The final application should feel like a **real production-ready AI workplace SaaS product**, not a basic demo.

 Prioritize:

 1. Excellent UX
2. Professional visual design
3. Responsive behavior
4. Functional interactions
5. AI-powered workflows
6. Clear information architecture
7. Accessibility
8. Scalable architecture

 The three core workflows must feel especially polished:

 **Generate Email → Edit → Copy/Save**

 **Meeting Notes → AI Summary → Action Items → Create Tasks**

 **Goal → AI Task Breakdown → Review → Add to Task Planner**

 Build the application so these workflows can be demonstrated end-to-end with realistic sample data even before a production AI backend is connected.

 If you're using **Lovable, Bolt, Replit, or Cursor**, I can also turn this into a more technical prompt specifically optimized for that platform, including the recommended tech stack, database schema, API structure, and UI component requirements.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://flow-ai-tool.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4c34d13b-db80-47fe-af51-844c0adbaee0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
