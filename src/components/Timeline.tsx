"use client";

type Item = {
  date: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
};

export default function Timeline({ items }: { items: Item[] }) {
  return (
    <div className="relative">
      {/* vertical line */}
      <div className="absolute left-4 top-0 h-full w-px bg-white/15 md:left-1/2" />

      <ul className="space-y-8">
        {items.map((it, i) => (
          <li key={i} className="relative grid grid-cols-[auto_1fr] md:grid-cols-2 md:gap-6">
            {/* date (left column at md) */}
            <div className="pr-6 md:text-right md:pr-8">
              <div className="inline-block rounded-md border border-white/15 bg-white/5 px-2 py-1 text-xs text-white/80">
                {it.date}
              </div>
            </div>

            {/* dot + card (right column) */}
            <div className="relative">
              {/* dot anchored to the vertical line */}
              <span className="absolute -left-[27px] md:-left-[calc(50%+7px)] top-2 inline-block h-3 w-3 rounded-full bg-white/70 ring-4 ring-white/10" />
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="font-medium">{it.title}</div>
                {it.subtitle && (
                  <div className="text-sm text-white/70">{it.subtitle}</div>
                )}
                {it.bullets && it.bullets.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 text-sm text-white/85 space-y-1">
                    {it.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
