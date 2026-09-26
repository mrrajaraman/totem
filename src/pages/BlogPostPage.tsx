import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ARTICLES_DATA } from '../data/articlesData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, ArrowRight, Clock, Calendar, Share2, BookOpen } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = ARTICLES_DATA.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const related = ARTICLES_DATA.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <article className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#A3A3A3] hover:text-[#39FF14] mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Totem Journal</span>
        </Link>

        {/* Header Metadata */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <Badge variant="electric">{article.category}</Badge>
            <span className="font-mono text-xs text-[#71717A] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
            <span className="font-mono text-xs text-[#71717A] flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {article.date}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.08]">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[#A3A3A3] leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Hero Poster */}
        <div className="rounded-3xl overflow-hidden border border-[#222222] bg-[#0E0E0E] mb-12 aspect-[16/9]">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05]"
          />
        </div>

        {/* Article Body Content */}
        <div className="prose prose-invert max-w-none space-y-6 text-[#C9C6C1] text-base leading-relaxed font-normal mb-16">
          {article.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Author / Editorial Box */}
        <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-[#222222] flex items-center justify-between gap-4 mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#39FF14] font-semibold block">
              Totem Operational Insights
            </span>
            <p className="text-xs text-[#A3A3A3] mt-0.5">
              Authored by the team at Totem · Anvio VR Arena, Koramangala 6th Block, Bangalore.
            </p>
          </div>

          <Button
            href="https://wa.me/917337838303?text=Hi%20Totem%2C%20I%20read%20your%20journal%20article."
            isExternal
            variant="secondary"
            size="sm"
          >
            Ask a Question
          </Button>
        </div>

        {/* Bottom Booking Conversion Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0E0E0E] border border-[#39FF14]/40 text-center mb-16 shadow-[0_0_30px_-10px_rgba(57,255,20,0.2)]">
          <h3 className="text-2xl font-bold text-white mb-2">
            Experience Free-Roam VR First-Hand
          </h3>
          <p className="text-xs sm:text-sm text-[#A3A3A3] max-w-lg mx-auto mb-6">
            Private arena sessions in Koramangala starting from ₹799/person. Bring your team, squad, or friends.
          </p>
          <Button to="/booking" variant="primary" size="md">
            Reserve Your Session Now
          </Button>
        </div>

        {/* Related Reads */}
        {related.length > 0 && (
          <div className="pt-12 border-t border-[#222222]">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#71717A] mb-6">
              More from the Journal
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/blog/${r.slug}`}
                  className="p-6 rounded-2xl bg-[#080808] border border-[#222222] hover:border-[#39FF14]/40 transition-colors group"
                >
                  <span className="font-mono text-[10px] uppercase text-[#39FF14] block mb-2">
                    {r.category}
                  </span>
                  <h5 className="text-base font-bold text-white group-hover:text-[#39FF14] transition-colors leading-snug mb-2">
                    {r.title}
                  </h5>
                  <p className="text-xs text-[#A3A3A3] line-clamp-2">
                    {r.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
