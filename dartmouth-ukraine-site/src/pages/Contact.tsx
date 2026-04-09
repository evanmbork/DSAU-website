export default function Contact() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Contact Us</h1>

      <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-5">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Club President</p>
          <a
            href="mailto:oleksandra.gol'dina.29@dartmouth.edu"
            className="mt-1 block text-base font-medium text-blue-700 hover:underline break-all"
          >
            oleksandra.gol'dina.29@dartmouth.edu
          </a>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Faculty Advisor</p>
          <a
            href="mailto:victoria.somoff@dartmouth.edu"
            className="mt-1 block text-base font-medium text-blue-700 hover:underline break-all"
          >
            victoria.somoff@dartmouth.edu
          </a>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Instagram</p>
          <a
            href="https://www.instagram.com/dartmouth.ukraine.alliance/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-base font-medium text-blue-700 hover:underline"
          >
            @dartmouth.ukraine.alliance
          </a>
        </div>
      </div>
    </div>
  )
}
