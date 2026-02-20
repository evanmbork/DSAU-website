export default function HowToHelp() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">How to Help</h1>

      <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Quick actions</h2>
        <ul className="list-disc pl-5 text-slate-700 space-y-2">
          <li>Donate to vetted humanitarian or defense support organizations.</li>
          <li>Attend events and bring friends.</li>
          <li>Share accurate information and challenge misinformation.</li>
          <li>Volunteer for club projects (fundraising, outreach, design, writing).</li>
        </ul>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Want to collaborate?</h2>
        <p className="mt-2 text-slate-700">
          Email us from the Contact page and we’ll respond quickly.
        </p>
      </div>
    </div>
  );
}
