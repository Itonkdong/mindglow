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
    <main className="page assistant-page">
      <section className="assistant-hero">
        <div>
          <span className="eyebrow">Support space</span>
          <h1>Wellbeing assistant</h1>
          <p>A gentle place to sort through stress, school pressure, sleep worries, or whatever is sitting heavily today.</p>
        </div>
        <aside className="assistant-note">
          <strong>Before you start</strong>
          <p>I am a supportive wellbeing assistant, not a replacement for a real psychologist or emergency service.</p>
        </aside>
      </section>

      <section className="assistant-workspace">
        <aside className="assistant-sidebar">
          <span className="eyebrow">Try asking</span>
          <h2>Conversation starters</h2>
          <p>Pick one if you do not know how to begin. You can always write it your own way.</p>
          <div className="prompt-row">{prompts.map((prompt) => <button key={prompt} className="chip" onClick={() => submit(prompt)}>{prompt}</button>)}</div>
        </aside>

        <section className="chat-panel">
          <div className="chat-heading">
            <div>
              <span className="eyebrow">Chat</span>
              <h2>What is on your mind?</h2>
            </div>
          </div>
          <div className="messages">
            {messages.length === 0 && <div className="assistant-empty"><h3>Start with one honest sentence.</h3><p>You do not need to explain everything perfectly. A small beginning is enough.</p></div>}
            {messages.map((message) => <div key={message.id} className={`message ${message.sender}`}>{message.content}</div>)}
          </div>
          <form className="chat-input" onSubmit={(event) => { event.preventDefault(); submit(); }}>
            <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Share what is on your mind" />
            <button className="icon-btn" disabled={sending} title="Send"><Send size={18} /></button>
          </form>
        </section>
      </section>
    </main>
  );
}
