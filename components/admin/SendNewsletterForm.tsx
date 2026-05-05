"use client";

import { useState } from "react";
import type { PostMeta } from "@/lib/blog";

type Result = { sent: number; failed: number; errors: string[] };

export default function SendNewsletterForm({
  posts,
  subscriberCount,
}: {
  posts: PostMeta[];
  subscriberCount: number;
}) {
  const [slug, setSlug] = useState(posts[0]?.slug ?? "");
  const [subject, setSubject] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const selectedPost = posts.find((p) => p.slug === slug);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!slug) return;

    const confirmed = window.confirm(
      `Send "${selectedPost?.title}" to ${subscriberCount} confirmed subscribers?`
    );
    if (!confirmed) return;

    setStatus("loading");
    setResult(null);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/send-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          subject: subject.trim() || undefined,
          preview_text: previewText.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Unknown error.");
      } else {
        setStatus("done");
        setResult(data);
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(String(err));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Post selector */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Blog post</label>
        <select
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        >
          {posts.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title} — {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </option>
          ))}
        </select>
        {selectedPost && (
          <p className="text-xs text-slate-400 mt-0.5">{selectedPost.description}</p>
        )}
      </div>

      {/* Optional subject */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          Subject line <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={selectedPost?.title ?? "Leave blank to use post title"}
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Optional preview text */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          Preview text <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <input
          type="text"
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          placeholder={selectedPost?.description ?? "Leave blank to use post description"}
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Subscriber count */}
      <p className="text-sm text-slate-500 bg-slate-50 rounded-lg px-4 py-3 border border-slate-100">
        Sending to <strong className="text-slate-800">{subscriberCount}</strong> confirmed subscriber{subscriberCount !== 1 ? "s" : ""}
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading" || subscriberCount === 0}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors"
      >
        {status === "loading" ? "Sending…" : "Send Newsletter"}
      </button>

      {/* Result */}
      {status === "done" && result && (
        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
          ✓ Sent to <strong>{result.sent}</strong> subscriber{result.sent !== 1 ? "s" : ""}.
          {result.failed > 0 && (
            <span className="text-amber-700"> {result.failed} failed.</span>
          )}
        </div>
      )}
      {status === "error" && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          Error: {errorMsg}
        </div>
      )}
    </form>
  );
}
