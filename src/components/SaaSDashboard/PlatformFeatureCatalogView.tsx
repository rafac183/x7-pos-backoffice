import React, { useState, useEffect } from 'react';
import { saasService } from '../../services/saasService';
import type { PlatformFeature } from '../../types/subscription';

interface PlatformFeatureCatalogViewProps {
  onNavigate?: (view: string) => void;
}

export const PlatformFeatureCatalogView: React.FC<PlatformFeatureCatalogViewProps> = () => {
  const [features, setFeatures] = useState<PlatformFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    saasService.getFeatures()
      .then((data) => setFeatures(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <span className="material-symbols-outlined text-[#d51f2c] text-4xl animate-spin">
          progress_activity
        </span>
        <span className="ml-3 text-[#5f5e5e] text-sm font-medium">Loading feature catalog...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-300 bg-red-50 p-8 text-center">
        <span className="material-symbols-outlined text-red-500 text-4xl" aria-hidden="true">report</span>
        <p className="mt-3 text-red-700 font-medium">Failed to load feature catalog.</p>
        <p className="text-red-500 text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (features.length === 0) {
    return (
      <div className="bg-white border border-[#e8e2d8] p-16 flex flex-col items-center text-center">
        <span className="material-symbols-outlined text-[#d51f2c] text-6xl">featured_play_list</span>
        <p className="text-[#5f5e5e] mt-4 max-w-sm text-sm leading-relaxed">
          No feature definitions found. Click 'Create Feature' to establish your first system capability flag.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0 border border-[#e8e2d8] overflow-hidden">
      {/* Header block */}
      <div className="bg-[#222222] px-6 py-4">
        <h2 className="text-[13px] font-black uppercase tracking-widest text-white">
          PLATFORM FEATURE CATALOG MASTER
        </h2>
        <p className="text-white/50 text-[11px] mt-0.5">
          Feature flags and entitlement definitions for this platform.
        </p>
        <div className="grid grid-cols-[2fr_3fr_1fr_1fr] gap-4 mt-4 px-0">
          {['FEATURE IDENTITY', 'SCOPE DEFINITION', 'UNIT', 'STATUS'].map((col) => (
            <span
              key={col}
              className="text-[10px] font-bold uppercase tracking-widest text-white/40"
            >
              {col}
            </span>
          ))}
        </div>
      </div>

      {/* Data rows */}
      {features.map((feature) => (
        <div
          key={feature.id}
          className="grid grid-cols-[2fr_3fr_1fr_1fr] gap-4 border-b border-[#e8e2d8] px-6 py-4 bg-white hover:bg-[#f9f7f4] transition-colors items-center"
        >
          {/* Feature Identity */}
          <div className="min-w-0">
            <p className="font-bold text-[#1d1c17] text-sm leading-tight">{feature.name}</p>
            <code className="text-[11px] text-[#5f5e5e] font-mono">feature_{feature.id}</code>
          </div>

          {/* Scope Definition */}
          <div className="min-w-0">
            <p className="text-sm text-[#5f5e5e] leading-snug">{feature.description}</p>
          </div>

          {/* Unit tag */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest border border-[#222222] px-2 py-0.5 text-[#222222] font-mono">
              [{feature.Unit.toLowerCase()}]
            </span>
          </div>

          {/* Status badge */}
          <div>
            {feature.status === 'active' ? (
              <span className="bg-emerald-500 text-white text-[10px] font-bold uppercase px-2 py-0.5">
                active
              </span>
            ) : (
              <span className="bg-[#444444] text-white text-[10px] font-bold uppercase px-2 py-0.5">
                inactive
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
