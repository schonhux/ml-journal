import type { Metadata } from 'next';


export const metadata: Metadata = { title: 'Papers — Schon Huxley' };

export default function PapersIndex() {
  return (
    <>
      <h1 className="text-3xl font-semibold">Papers</h1>
      <div className="prose prose-zinc mt-4 max-w-none">
        <p>
          Coming soon: long-form write-ups with math and code. First article will cover
         my point of view of Machine Learning vs. AI that I have been working on.  Followed by a calibrated probabilities in LightGBM for real-time sports inference.
        </p>
      </div>
    </>
  );
}
