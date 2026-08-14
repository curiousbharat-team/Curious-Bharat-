import React, { useState } from 'react';
import { Batch, AdvertisementBanner } from '../../types';
import { Star, Users, Lock, Play, Sparkles, BookOpen, Compass, CheckCircle2 } from 'lucide-react';

interface StudyTabProps {
  batches: Batch[];
  banners: AdvertisementBanner[];
  purchasedBatchIds: string[];
  onSelectBatch: (batch: Batch) => void;
  onOpenPaymentModal: (batch: Batch) => void;
}

export const StudyTab: React.FC<StudyTabProps> = ({
  batches,
  banners,
  purchasedBatchIds,
  onSelectBatch,
  onOpenPaymentModal,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Physics & Cosmos', 'Chemistry & Matter', 'Biology & Life', 'Maths & Logic'];

  const filteredBatches = batches.filter((b) => {
    if (selectedFilter === 'All') return true;
    return b.category === selectedFilter;
  });

  const handleImageError = (batchId: string) => {
    setImageErrorMap((prev) => ({ ...prev, [batchId]: true }));
  };

  return (
    <div className="space-y-4 pb-20">
      
      {/* Subject Filter Chips */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-none py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              selectedFilter === cat
                ? 'bg-[#B85B14] border-[#B85B14] text-white shadow-xs'
                : 'bg-white border-[#E6DCCF] text-[#7A6B63] hover:text-[#382820] hover:border-[#D9C4B0]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {filteredBatches.map((batch) => {
          const isUnlocked = !batch.isPaid || purchasedBatchIds.includes(batch.id);
          const bannerImgUrl = batch.heroImageUrl || batch.thumbnailUrl;
          const hasValidImage = bannerImgUrl && !imageErrorMap[batch.id];

          return (
            <div
              key={batch.id}
              className="bg-white border border-[#E6DCCF] rounded-2xl overflow-hidden hover:border-[#B85B14]/40 transition-all shadow-xs group"
            >
              {/* Batch Top Header: Title & Status Tag */}
              <div className="px-4 pt-3.5 pb-2 flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-black text-[#382820] leading-snug tracking-tight">
                      {batch.title}
                    </h3>
                  </div>
                  {batch.subtitle && (
                    <p className="text-[11px] text-[#7A6B63] font-semibold mt-0.5">
                      {batch.subtitle}
                    </p>
                  )}
                </div>
                <span className="shrink-0 text-[10px] font-black px-2 py-0.5 rounded-lg bg-[#FAF0E6] text-[#B85B14] border border-[#EAC8A9] uppercase tracking-wider">
                  New
                </span>
              </div>

              {/* Hero Poster Banner Image (Inspired by EdTech Poster Banners) */}
              <div className="px-3.5 py-1">
                <div className="relative w-full aspect-[16/8] sm:aspect-[16/7] rounded-xl overflow-hidden bg-gradient-to-r from-[#2B1B14] via-[#4A2E1F] to-[#703D1A] border border-[#E6DCCF]/80 shadow-inner flex flex-col justify-between">
                  {hasValidImage ? (
                    <>
                      <img
                        src={bannerImgUrl}
                        alt={batch.title}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(batch.id)}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      {/* Gradient overlay for poster clarity and typography legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50 pointer-events-none" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B85B14] via-[#C86D27] to-[#D99B5A] opacity-90" />
                  )}

                  {/* Top Overlay Strip: Tag + Rating */}
                  <div className="relative z-10 p-2.5 flex items-center justify-between">
                    <span className="text-[9px] font-black px-2 py-0.5 rounded bg-black/50 backdrop-blur-md border border-white/20 text-white uppercase tracking-wider shadow-xs">
                      {batch.thumbnailTag || batch.category}
                    </span>
                    <div className="flex items-center space-x-1 text-[10px] font-extrabold bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-white border border-white/10">
                      <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
                      <span>{batch.rating || 4.9}</span>
                    </div>
                  </div>

                  {/* Center/Bottom Poster Details */}
                  <div className="relative z-10 px-3 pb-2.5 pt-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-emerald-300 uppercase tracking-widest px-2 py-0.5 rounded bg-black/40 border border-emerald-400/30">
                        Hinglish / English
                      </span>
                      <span className="text-[9px] font-bold text-white/90">
                        {batch.educatorName || 'Priyanshu Tiwari'}
                      </span>
                    </div>
                    {/* Bottom Features Strip */}
                    <div className="text-[8px] sm:text-[9px] font-bold text-white/80 bg-black/60 backdrop-blur-xs py-0.5 px-2 rounded-md tracking-tight uppercase truncate">
                      RECORDING OF LECTURES • VISUAL GUIDES • DPPS • TEST SERIES
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3.5 space-y-3">
                <p className="text-[11px] text-[#7A6B63] font-medium line-clamp-2 leading-relaxed">
                  {batch.description}
                </p>

                {/* Lessons & Tests count */}
                <div className="flex items-center justify-between text-xs py-1.5 px-3 bg-[#FAF6F0] rounded-xl border border-[#EFE5D8]">
                  <span className="text-[11px] font-bold text-[#7A6B63]">
                    Curriculum Content
                  </span>
                  <span className="text-[11px] font-bold text-[#382820]">
                    {batch.contents?.length || 0} Lessons & Tests
                  </span>
                </div>

                {/* Price & Action Button */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    {batch.isPaid ? (
                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-base font-black text-[#382820]">₹{batch.price}</span>
                        {batch.originalPrice && (
                          <span className="text-xs text-[#7A6B63] line-through">₹{batch.originalPrice}</span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-[#4D6B40]">₹ FREE</span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#EEF4EC] text-[#4D6B40] border border-[#D5E3D1]">
                          100% Free For Students
                        </span>
                      </div>
                    )}
                  </div>

                  {isUnlocked ? (
                    <button
                      onClick={() => onSelectBatch(batch)}
                      className="px-4 py-2 bg-[#4D6B40] hover:bg-[#3D5732] text-white font-black rounded-xl text-xs flex items-center space-x-1.5 shadow-xs active:scale-95 transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Study</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenPaymentModal(batch)}
                      className="px-4 py-2 bg-[#B85B14] hover:bg-[#A04812] text-white font-black rounded-xl text-xs flex items-center space-x-1.5 shadow-xs active:scale-95 transition-all cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Enroll Now</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

