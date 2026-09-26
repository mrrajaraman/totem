import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ARTICLES_DATA } from '../data/articlesData';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const BlogPage: React.FC = () => {
  const featured = ARTICLES_DATA[0];
  const others = ARTICLES_DATA.slice(1);

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Totem Journal"
          title="TEAM OUTINGS, PARTIES &amp;"
          highlight="THE FUTURE OF PLAY."
          lede="Field guides, offsite strategies, and inside operational perspectives from our Koramangala free-roam arena."
        />

        {/* Featured Editorial Post */}
        {featured && (
          <div className="mb-16 rounded-3xl overflow-hidden border border-[#2B2B2B] bg-[#0E0E0E] grid grid-cols-1 lg:grid-cols-12 group hover:border-[#39FF14]/50 transition-all duration-300 shadow-2xl">
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
              <img
                src={featured.heroImage}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.75] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-transparent to-transparent" />
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="electric">{featured.category}</Badge>
                  <span className="font-mono text-xs text-[#71717A] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featured.readTime}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-4 group-hover:text-[#39FF14] transition-colors">
                  <Link to={`/blog/${featured.slug}`}>
                    {featured.title}
                  </Link>
                </h3>

                <p className="text-sm text-[#A3A3A3] leading-relaxed mb-6 font-normal">
                  {featured.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-[#1C1C1C] flex items-center justify-between">
                <span className="font-mono text-xs text-[#71717A]">
                  {featured.date}
                </span>

                <Link
                  to={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#39FF14] group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {others.map((art) => (
            <article
              key={art.id}
              className="rounded-2xl border border-[#222222] bg-[#0A0A0A] overflow-hidden flex flex-col justify-between hover:border-white/30 transition-all group hover:-translate-y-1"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={art.heroImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.7]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-wider bg-black/80 text-[#39FF14] px-2.5 py-1 rounded-full border border-white/10">
                    {art.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-[#71717A] mb-2">
                    <span>{art.date}</span>
                    <span>·</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#39FF14] transition-colors">
                    <Link to={`/blog/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h4>

                  <p className="text-xs text-[#A3A3A3] leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <Link
                  to={`/blog/${art.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-mono text-[#39FF14] hover:underline"
                >
                  <span>Read article</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
