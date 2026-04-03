'use client';

import { StepsInteractive } from '@/components/ui/StepsInteractive';

export function MethodologySection() {
  return (
    <div id="metodologia" className="relative z-10 bg-[#f4f4f4] text-[#05050a] py-24 border-y border-black/5">
      <div className="max-w-[1120px] mx-auto px-6 xl:px-0">
        <StepsInteractive />
      </div>
    </div>
  );
}
