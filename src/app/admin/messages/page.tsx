"use client";

import { useState, useEffect } from "react";

type Message = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "pending" | "answered" | "closed";
  reply: string | null;
  repliedAt: string | null;
  createdAt: string;
};

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (search) params.set("search", search);
      params.set("page", String(page));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/contact?${params}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
        setTotalPages(data.pagination.pages);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [statusFilter, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchMessages();
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/contact/${id}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      }
    );
    fetchMessages();
    if (selected?._id === id) setSelected((prev) => prev ? { ...prev, status: status as Message["status"] } : null);
  };

  const sendReply = async () => {
    if (!selected || !replyText.trim()) return;
    setSending(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/contact/${selected._id}/reply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ reply: replyText }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setReplyText("");
        fetchMessages();
      }
    } finally {
      setSending(false);
    }
  };

  const statusColor = (s: string) => {
    switch (s) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "answered": return "bg-green-100 text-green-800";
      case "closed": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Please login as admin to access this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Contact Messages</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Search
            </button>
          </form>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="answered">Answered</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No messages found.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  onClick={() => setSelected(msg)}
                  className={`p-4 bg-white rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selected?._id === msg._id ? "ring-2 ring-blue-500 border-blue-500" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{msg.subject}</h3>
                      <p className="text-sm text-gray-500">{msg.name} &lt;{msg.email}&gt;</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(msg.status)}`}>
                      {msg.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{msg.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(msg.createdAt).toLocaleString()}</p>
                </div>
              ))}

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 pt-4">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span className="px-3 py-1 text-sm text-gray-600">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              {selected ? (
                <div className="bg-white rounded-lg border p-6 sticky top-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Message Details</h2>
                    <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">&times;</button>
                  </div>

                  <div className="space-y-3 mb-6 text-sm">
                    <div><span className="font-medium text-gray-500">From:</span> <span className="text-gray-800">{selected.name}</span></div>
                    <div><span className="font-medium text-gray-500">Email:</span> <a href={`mailto:${selected.email}`} className="text-blue-600 hover:underline">{selected.email}</a></div>
                    <div><span className="font-medium text-gray-500">Subject:</span> <span className="text-gray-800">{selected.subject}</span></div>
                    <div><span className="font-medium text-gray-500">Date:</span> <span className="text-gray-800">{new Date(selected.createdAt).toLocaleString()}</span></div>
                  </div>

                  <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{selected.message}</p>
                  </div>

                  <div className="flex gap-2 mb-6">
                    {["pending", "answered", "closed"].map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(selected._id, s)}
                        disabled={selected.status === s}
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          selected.status === s
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {selected.reply && (
                    <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs font-medium text-blue-600 mb-1">Your reply ({selected.repliedAt ? new Date(selected.repliedAt).toLocaleString() : ""})</p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{selected.reply}</p>
                    </div>
                  )}

                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                    placeholder="Write a reply..."
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                  />
                  <button
                    onClick={sendReply}
                    disabled={sending || !replyText.trim()}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {sending ? "Sending..." : "Send Reply"}
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-lg border p-6 text-center text-gray-400">
                  Select a message to view details
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
