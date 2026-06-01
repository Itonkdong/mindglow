import { Lightbulb, MessageCircle, Plus, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createSession, listMessages, listSessions, sendMessage } from "../api/chatApi";

const prompts = ["I feel stressed about school", "Help me calm down", "Why am I anxious today?", "Give me a breathing exercise", "What can I do before sleep?", "Can you look at my recent wellness data?"];

function formatSessionDate(value) {
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function AssistantPage() {
  const [sessions, setSessions] = useState([]);
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [sending, setSending] = useState(false);
  const drawerRef = useRef(null);
  const inputRef = useRef(null);
  const lastMessageRef = useRef(null);

  async function loadSessions() {
    const { data } = await listSessions();
    setSessions(data);
    return data;
  }

  async function ensureSession(existingSessions) {
    if (existingSessions[0]) return existingSessions[0];
    const created = await createSession();
    setSessions([created.data]);
    return created.data;
  }

  async function openSession(active) {
    setSession(active);
    setLoadingMessages(true);
    const response = await listMessages(active.id);
    setMessages(response.data);
    setLoadingMessages(false);
  }

  async function startNewSession() {
    const { data } = await createSession();
    setSessions((current) => [data, ...current]);
    await openSession(data);
  }

  async function load() {
    const loadedSessions = await loadSessions();
    const active = await ensureSession(loadedSessions);
    await openSession(active);
  }

  async function submit(text = content) {
    if (!text.trim() || !session) return;
    setSending(true);
    setContent("");
    setMessages((current) => [...current, { id: `local-${Date.now()}`, sender: "user", content: text }]);
    try {
      const { data } = await sendMessage(session.id, text);
      setMessages((current) => [...current, data]);
      await loadSessions();
    } finally {
      setSending(false);
    }
  }

  function useSuggestion(prompt) {
    setContent(prompt);
    if (drawerRef.current) drawerRef.current.open = false;
    inputRef.current?.focus();
  }

  useEffect(() => { load(); }, []);
  useEffect(() => {
    if (!loadingMessages) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [messages.length, loadingMessages, sending]);

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
          <div className="assistant-session-head">
            <div>
              <span className="eyebrow">Conversations</span>
              <h2>Your chats</h2>
            </div>
            <button className="icon-btn" onClick={startNewSession} title="Start new chat"><Plus size={18} /></button>
          </div>
          <div className="session-list">
            {sessions.map((item) => (
              <button key={item.id} className={session?.id === item.id ? "session-item active" : "session-item"} onClick={() => openSession(item)}>
                <MessageCircle size={17} />
                <span>{item.title}</span>
                <small>{formatSessionDate(item.updated_at)}</small>
              </button>
            ))}
          </div>
        </aside>

        <section className="chat-panel">
          <div className="chat-heading">
            <div>
              <span className="eyebrow">Chat</span>
              <h2>{session?.title || "What is on your mind?"}</h2>
            </div>
          </div>
          <div className="messages">
            {loadingMessages && <div className="assistant-empty"><h3>Loading conversation...</h3><p>Bringing your chat back into view.</p></div>}
            {!loadingMessages && messages.length === 0 && <div className="assistant-empty"><h3>Start with one honest sentence.</h3><p>You do not need to explain everything perfectly. A small beginning is enough.</p></div>}
            {messages.map((message, index) => <div key={message.id} ref={index === messages.length - 1 ? lastMessageRef : null} className={`message ${message.sender}`}>{message.content}</div>)}
            {sending && <div ref={lastMessageRef} className="message assistant typing-message" aria-label="Assistant is typing"><span /><span /><span /></div>}
          </div>
          <details className="prompt-drawer" ref={drawerRef}>
            <summary>
              <Lightbulb size={17} />
              <span>Suggestions</span>
            </summary>
            <div className="prompt-row">{prompts.map((prompt) => <button key={prompt} type="button" className="chip" onClick={() => useSuggestion(prompt)}>{prompt}</button>)}</div>
          </details>
          <form className="chat-input" onSubmit={(event) => { event.preventDefault(); submit(); }}>
            <input ref={inputRef} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Share what is on your mind" />
            <button className="icon-btn" disabled={sending} title="Send"><Send size={18} /></button>
          </form>
        </section>
      </section>
    </main>
  );
}
