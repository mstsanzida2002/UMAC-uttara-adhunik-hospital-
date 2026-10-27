"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

export type ContentMap = Record<string, string>;
export type ImageMap = Record<string, string>;

// Default image mappings for every key known in the system
export const DEFAULT_IMAGES: ImageMap = {
  "hero-bg": "/images/hero-bg.jpg",
  "hero-bg-2": "/images/about-banner.jpg",
  "hero-bg-3": "/images/finddept-bg.jpg",
  "hero-bg-4": "/images/admission-bg.jpg",
  "about-1": "/images/about-1.jpg",
  "about-2": "/images/about-2.jpg",
  "about-banner": "/images/about-banner.jpg",
  "principal-photo": "/images/principal-photo.jpg",
  "principal-signature": "/images/principal-signature.png",
  "facility-hostel": "/images/facility-hostel.jpg",
  "finddept-bg": "/images/finddept-bg.jpg",
  "finddept-doctor": "/images/finddept-doctor.jpg",
  "finddept-student1": "/images/finddept-student1.jpg",
  "finddept-student2": "/images/finddept-student2.jpg",
  "admission-bg": "/images/admission-bg.jpg",
  "admission-aid-bg": "/images/admission-aid-bg.jpg",
  "metrics-bg": "/images/metrics-bg.jpg",
  "sustainability-1": "/images/sustainability-1.jpg",
  "sustainability-2": "/images/sustainability-2.jpg",
  "visit-uamc-bg": "/images/visit-uamc-bg.jpg",
  "footer-post-1": "/images/footer-post-1.webp",
  "footer-post-2": "/images/footer-post-2.webp",
  "logo": "/images/uamc-logo-round.png",
  "college-emblem": "/assets/college-emblem.png",
};

interface SiteDataContextType {
  content: ContentMap;
  images: ImageMap;
  c: (key: string, fallback?: string) => string;
  img: (key: string, fallback?: string) => string;
  refresh: () => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ContentMap>({});
  const [images, setImages] = useState<ImageMap>(DEFAULT_IMAGES);

  const fetchAll = useCallback(async () => {
    try {
      // 1. Fetch content
      const contentRes = await fetch("/api/admin/content", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (contentRes.ok) {
        const data = await contentRes.json();
        const map: ContentMap = {};
        for (const item of data.items || []) {
          map[item.key] = item.value;
        }
        setContent(map);
      }
    } catch (e) {
      console.warn("[SiteDataProvider] failed to fetch content", e);
    }

    try {
      // 2. Fetch images
      const imagesRes = await fetch("/api/admin/images", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (imagesRes.ok) {
        const data = await imagesRes.json();
        const map: ImageMap = { ...DEFAULT_IMAGES };
        for (const item of data.images || []) {
          if (item.key && item.url) {
            map[item.key] = item.url;
          }
        }
        setImages(map);
      }
    } catch (e) {
      console.warn("[SiteDataProvider] failed to fetch images", e);
    }
  }, []);

  useEffect(() => {
    fetchAll();

    const handleUpdate = () => {
      fetchAll();
    };

    window.addEventListener("site-data-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("site-data-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [fetchAll]);

  const c = useCallback(
    (key: string, fallback?: string): string => {
      return content[key] ?? fallback ?? "";
    },
    [content]
  );

  const img = useCallback(
    (key: string, fallback?: string): string => {
      return images[key] ?? fallback ?? DEFAULT_IMAGES[key] ?? "";
    },
    [images]
  );

  const value = useMemo(
    () => ({
      content,
      images,
      c,
      img,
      refresh: fetchAll,
    }),
    [content, images, c, img, fetchAll]
  );

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    return {
      content: {},
      images: DEFAULT_IMAGES,
      c: (key: string, fallback?: string) => fallback ?? "",
      img: (key: string, fallback?: string) => fallback ?? DEFAULT_IMAGES[key] ?? "",
      refresh: async () => {},
    };
  }
  return ctx;
}

export function useSiteContent(fallbacks: ContentMap = {}) {
  const ctx = useContext(SiteDataContext);
  // If provider is present, use it
  if (ctx) {
    const c = (key: string, fallback?: string): string => {
      const val = ctx.content[key];
      if (val !== undefined && val !== "") return val;
      return fallback ?? fallbacks[key] ?? "";
    };
    return { c, content: ctx.content, refresh: ctx.refresh };
  }

  // Fallback for standalone usage
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [map, setMap] = useState<ContentMap>(fallbacks);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetch("/api/admin/content", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        const fresh: ContentMap = {};
        for (const item of data.items || []) {
          fresh[item.key] = item.value;
        }
        setMap({ ...fallbacks, ...fresh });
      })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const c = (key: string, fallback?: string): string =>
    map[key] ?? fallback ?? fallbacks[key] ?? "";

  return { c, content: map };
}

export function useSiteImages(fallbacks: ImageMap = {}) {
  const ctx = useContext(SiteDataContext);
  if (ctx) {
    const img = (key: string, fallback?: string): string => {
      const val = ctx.images[key];
      if (val !== undefined && val !== "") return val;
      return fallback ?? fallbacks[key] ?? DEFAULT_IMAGES[key] ?? "";
    };
    return { img, images: ctx.images, refresh: ctx.refresh };
  }

  // Standalone fallback
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [images, setImages] = useState<ImageMap>({ ...DEFAULT_IMAGES, ...fallbacks });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetch("/api/admin/images", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        const fresh: ImageMap = { ...DEFAULT_IMAGES, ...fallbacks };
        for (const item of data.images || []) {
          if (item.key && item.url) {
            fresh[item.key] = item.url;
          }
        }
        setImages(fresh);
      })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const img = (key: string, fallback?: string): string =>
    images[key] ?? fallback ?? fallbacks[key] ?? DEFAULT_IMAGES[key] ?? "";

  return { img, images };
}
