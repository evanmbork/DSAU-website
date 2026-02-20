export default function Home() {
  return (
    <div className="space-y-16">

      {/* HERO */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
          Dartmouth Student Alliance for Ukraine
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Supporting Ukraine through advocacy and action.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <a
            href="/help"
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
          >
            Get Involved
          </a>

          <a
            href="/news"
            className="px-6 py-3 border border-slate-300 rounded-md font-medium hover:bg-slate-50 transition"
          >
            See Our Impact
          </a>
        </div>
      </section>

      {/* MISSION */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Our Mission
          </h2>

          <p className="text-slate-600 leading-relaxed">
            We aim to raise awareness about the ongoing war in Ukraine,
            support humanitarian efforts, and create meaningful dialogue
            on campus about Ukrainian cluture and sovereignty.
          </p>

          <p className="text-slate-600 leading-relaxed">
            Through events, partnerships, and advocacy, we connect
            Dartmouth students to the realities of modern Ukraine.
          </p>
        </div>

        <div className="bg-slate-100 rounded-lg p-8">
          <h3 className="font-semibold text-slate-900 mb-4">
            What We Do
          </h3>

          <ul className="space-y-3 text-slate-600">
            <li>• Publish articles and campus commentary</li>
            <li>• Organize fundraisers and events</li>
            <li>• Partner with Ukrainian organizations</li>
            <li>• Support students with Ukrainian heritage</li>
          </ul>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-slate-900 text-white rounded-xl p-12 text-center space-y-6">
        <h2 className="text-3xl font-semibold">
          Stand with Ukraine.
        </h2>

        <p className="text-slate-300 max-w-xl mx-auto">
          Whether you're Ukrainian or simply care about democracy and
          sovereignty, there's a place for you in the club.
        </p>

        <a
          href="/contact"
          className="inline-block px-6 py-3 bg-white text-slate-900 rounded-md font-medium hover:bg-slate-100 transition"
        >
          Join the Alliance
        </a>
      </section>

    </div>
  );
}