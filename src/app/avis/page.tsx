"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

interface Review {
  _id: string;
  user?: { name: string; avatar?: string } | null;
  guestName?: string;
  rating: number;
  comment: string;
  adminReply?: string;
  repliedAt?: string;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const ratingLabels = {
  1: "poor",
  2: "fair",
  3: "good",
  4: "veryGood",
  5: "excellent",
} as const;
export default function AvisPage() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRating, setFormRating] = useState(0);
  const [formComment, setFormComment] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((ref) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting)
              entry.target.classList.add("animate-fade-in-up");
          },
          { threshold: 0.1 },
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [reviews]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/api/reviews/approved`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success) setReviews(data.data || []);
      else setError(data.message || "Failed to load reviews");
    } catch {
      setError("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (
    rating: number,
    interactive = false,
    size = "w-5 h-5",
  ) => (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <button
          key={i}
          type={interactive ? "button" : undefined}
          onClick={interactive ? () => setFormRating(i + 1) : undefined}
          className={interactive ? "cursor-pointer focus:outline-none" : ""}
        >
          <svg
            className={`${size} ${i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const getDisplayName = (r: Review) => {
    if (r.user?.name) return r.user.name;
    if (r.guestName) return r.guestName;
    return "Anonymous";
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    return (
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    ).toFixed(1);
  };

  const getRatingCount = (rating: number) =>
    reviews.filter((r) => Math.floor(r.rating) === rating).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setFormError("Name is required");
      return;
    }
    if (formRating === 0) {
      setFormError("Please select a rating");
      return;
    }
    if (!formComment.trim()) {
      setFormError("Please write a comment");
      return;
    }

    setFormSubmitting(true);
    setFormError("");
    try {
      const res = await fetch(`${API_URL}/api/reviews/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail || undefined,
          rating: formRating,
          comment: formComment,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormSuccess(true);
        setFormName("");
        setFormEmail("");
        setFormRating(0);
        setFormComment("");
        setTimeout(() => setFormSuccess(false), 4000);
        fetchReviews();
      } else {
        setFormError(data.message || "Failed to submit review");
      }
    } catch {
      setFormError("Failed to submit review");
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen transition-theme">
      {/* Header */}
      <section
        className={`relative py-20 overflow-hidden ${isDark ? "bg-dark-900" : "bg-light-100"}`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{t.avisPage.title}</span>
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-dark-600"}`}
          >
            {t.avisPage.subtitle}
          </p>
        </div>
      </section>

      {/* Stats + Reviews */}
      {!loading && !error && reviews.length > 0 && (
        <>
          <div className="container mx-auto px-6 -mt-10 relative z-10">
            <div
              className={`max-w-4xl mx-auto p-8 rounded-2xl shadow-xl border ${
                isDark
                  ? "bg-dark-800 border-white/10"
                  : "bg-white border-dark-200"
              }`}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gradient">
                    {getAverageRating()}
                  </div>
                  <div className="flex justify-center mt-2">
                    {renderStars(Math.round(Number(getAverageRating())))}
                  </div>
                  <p
                    className={`text-sm mt-1 ${isDark ? "text-white/50" : "text-dark-500"}`}
                  >
                    {reviews.length} {t.avisPage.reviews}
                  </p>
                </div>
                <div className="flex-1 w-full space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = getRatingCount(star);
                    const pct =
                      reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span
                          className={`text-sm w-3 ${isDark ? "text-white/70" : "text-dark-600"}`}
                        >
                          {star}
                        </span>
                        <svg
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <div
                          className={`flex-1 h-2 rounded-full ${isDark ? "bg-white/10" : "bg-gray-200"}`}
                        >
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span
                          className={`text-sm w-8 text-right ${isDark ? "text-white/50" : "text-dark-500"}`}
                        >
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-6 py-16">
            <div className="max-w-4xl mx-auto space-y-6">
              {reviews.map((review, index) => (
                <div
                  key={review._id}
                  ref={(el) => {
                    sectionRefs.current[index] = el;
                  }}
                  className={`p-6 rounded-2xl border opacity-0 transition-all duration-700 ${
                    isDark
                      ? "bg-dark-800/50 border-white/10 hover:border-white/20"
                      : "bg-white border-dark-200 hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                        isDark
                          ? "bg-primary/20 text-primary"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {getInitials(getDisplayName(review))}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <h3
                          className={`font-semibold ${isDark ? "text-white" : "text-dark-800"}`}
                        >
                          {getDisplayName(review)}
                        </h3>
                        {renderStars(review.rating)}
                      </div>
                      <p
                        className={`mt-3 leading-relaxed ${isDark ? "text-white/70" : "text-dark-600"}`}
                      >
                        {review.comment}
                      </p>
                      {review.adminReply && (
                        <div
                          className={`mt-4 p-4 rounded-xl border-l-4 border-primary ${
                            isDark ? "bg-white/5" : "bg-primary/5"
                          }`}
                        >
                          <p className="text-xs font-semibold mb-1 text-primary">
                            {t.avisPage.adminReply}
                          </p>
                          <p
                            className={`text-sm ${isDark ? "text-white/60" : "text-dark-600"}`}
                          >
                            {review.adminReply}
                          </p>
                        </div>
                      )}
                      <p
                        className={`text-xs mt-3 ${isDark ? "text-white/40" : "text-dark-400"}`}
                      >
                        {new Date(review.createdAt).toLocaleDateString(
                          t.avisPage.title === "Client Reviews"
                            ? "en-US"
                            : "fr-FR",
                          { year: "numeric", month: "long", day: "numeric" },
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {loading && (
        <div className="container mx-auto px-6 py-20 text-center">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-32 rounded-xl ${isDark ? "bg-white/10" : "bg-gray-200"}`}
              />
            ))}
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="container mx-auto px-6 py-20 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && reviews.length === 0 && (
        <div className="container mx-auto px-6 py-20 text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <p
            className={`text-lg ${isDark ? "text-white/60" : "text-dark-600"}`}
          >
            {t.avisPage.noReviews}
          </p>
        </div>
      )}

      {/* Submit Form */}
      <section
        className={`py-16 border-t ${isDark ? "border-white/10" : "border-dark-200"}`}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-gradient">{t.avisPage.giveYour}</span>{" "}
                {t.avisPage.opinion}
              </h2>
              <p className={`${isDark ? "text-white/60" : "text-dark-600"}`}>
                {t.avisPage.description}
              </p>
            </div>

            {formSuccess ? (
              <div
                className={`p-8 rounded-2xl text-center border ${
                  isDark
                    ? "bg-green-500/10 border-green-500/30"
                    : "bg-green-50 border-green-200"
                }`}
              >
                <svg
                  className="w-12 h-12 mx-auto mb-3 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold mb-2">
                  {t.avisPage.thankYou}
                </h3>
                <p className={isDark ? "text-white/60" : "text-dark-600"}>
                  {t.avisPage.successMessage}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={`p-8 rounded-2xl border ${
                  isDark
                    ? "bg-dark-800/50 border-white/10"
                    : "bg-white border-dark-200"
                }`}
              >
                {formError && (
                  <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                    {formError}
                  </div>
                )}

                <div className="mb-6">
                  <label
                    className={`block text-sm font-medium mb-2 ${isDark ? "text-white/70" : "text-dark-700"}`}
                  >
                    {t.avisPage.name}
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                      isDark
                        ? "bg-dark-700 border-white/10 text-white placeholder-white/40"
                        : "bg-gray-50 border-dark-200 text-dark-800 placeholder-gray-400"
                    }`}
                    placeholder={t.avisPage.namePlaceholder}
                  />
                </div>

                <div className="mb-6">
                  <label
                    className={`block text-sm font-medium mb-2 ${isDark ? "text-white/70" : "text-dark-700"}`}
                  >
                    {t.avisPage.email}
                  </label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                      isDark
                        ? "bg-dark-700 border-white/10 text-white placeholder-white/40"
                        : "bg-gray-50 border-dark-200 text-dark-800 placeholder-gray-400"
                    }`}
                    placeholder={t.avisPage.emailPlaceholder}
                  />
                </div>

                <div className="mb-6">
                  <label
                    className={`block text-sm font-medium mb-3 ${isDark ? "text-white/70" : "text-dark-700"}`}
                  >
                    {t.avisPage.rating}
                  </label>
                  <div className="flex items-center gap-1">
                    {renderStars(formRating, true, "w-8 h-8")}
                    <span
                      className={`ml-3 text-sm ${isDark ? "text-white/50" : "text-dark-500"}`}
                    >
                      {formRating === 0
                        ? t.avisPage.clickToRate
                        : t.avisPage[ratingLabels[formRating as keyof typeof ratingLabels]]}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    className={`block text-sm font-medium mb-2 ${isDark ? "text-white/70" : "text-dark-700"}`}
                  >
                    {t.avisPage.comment}
                  </label>
                  <textarea
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none ${
                      isDark
                        ? "bg-dark-700 border-white/10 text-white placeholder-white/40"
                        : "bg-gray-50 border-dark-200 text-dark-800 placeholder-gray-400"
                    }`}
                    placeholder={t.avisPage.commentPlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50"
                >
                  {formSubmitting ? t.avisPage.submitting : t.avisPage.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
