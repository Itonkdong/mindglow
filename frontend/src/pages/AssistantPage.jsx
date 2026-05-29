import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { createSession, listMessages, listSessions, sendMessage } from "../api/chatApi";

const prompts = ["I feel stressed about school", "Help me calm down", "Why am I anxious today?", "Give me a breathing exercise", "What can I do before sleep?", "Can you look at my recent wellness data?"];

export default function AssistantPage() {
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);

  async function ensureSession() {
    const { data } = await listSessions();
    if (data[0]) return data[0];
    const created = await createSession();
    return created.data;
  }

  async function load() {
    const active = await ensureSession();
    setSession(active);
    const response = await listMessages(active.id);
    setMessages(response.data);
  }

  async function submit(text = content) {
    if (!text.trim() || !session) return;
    setSending(true);
    setContent("");
    setMessages((current) => [...current, { id: `local-${Date.now()}`, sender: "user", content: text }]);
    const { data } = await sendMessage(session.id, text);
    setMessages((current) => [...current, data]);
    setSending(false);
  }

  useEffect(() => { load(); }, []);
  return (
    <main className="page assistant-layout">
      <section className="chat-panel">
        <h1>Wellbeing assistant</h1>
        <p className="disclaimer">I am a supportive wellbeing assistant, not a replacement for a real psychologist or emergency service.</p>
        <div className="prompt-row">{prompts.map((prompt) => <button key={prompt} className="chip" onClick={() => submit(prompt)}>{prompt}</button>)}</div>
        <div className="messages">{messages.map((message) => <div key={message.id} className={`message ${message.sender}`}>{message.content}</div>)}</div>
        <form className="chat-input" onSubmit={(event) => { event.preventDefault(); submit(); }}>
          <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Share what is on your mind" />
          <button className="icon-btn" disabled={sending} title="Send"><Send size={18} /></button>
        </form>
      </section>
    </main>
  );
}
