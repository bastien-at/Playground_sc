import * as React from "react";

type DocumentationBannerProps = {
  className?: string;
  titleLeft: string;
  titleRight: string;
  description: string;
  lastUpdate: string;
};

export function DocumentationBanner({
  className,
  titleLeft,
  titleRight,
  description,
  lastUpdate,
}: DocumentationBannerProps) {
  return (
    <div
      className={
        className ??
        "w-full rounded-2xl bg-[#B0C9CE] px-6 py-6 md:px-10 md:py-8"
      }
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-[75px] w-[75px] items-center justify-center rounded-full bg-white">
            <span className="text-2xl">📄</span>
          </div>

          <div className="min-w-0">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#142129] md:text-5xl md:leading-[56px]">
              <span className="font-normal">{titleLeft}</span>
              <span className="px-2 font-normal">→</span>
              <span>{titleRight}</span>
            </h2>
            <p className="mt-2 max-w-3xl text-base text-[#687787] md:text-xl md:leading-6">
              {description}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <p className="font-display text-base font-extrabold text-[#142129] md:text-xl">
            Last update
          </p>
          <p className="mt-1 font-display text-base font-semibold text-[#142129] md:text-xl">
            ✅ {lastUpdate}
          </p>
        </div>
      </div>
    </div>
  );
}
