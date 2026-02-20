import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">
          Dartmouth Student Alliance for Ukraine
        </h1>
        <p className="mt-3 text-slate-700 max-w-2xl">
          We support Ukraine through education, community events, fundraising, and advocacy.
          This site shares our latest updates, projects, and ways to help.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            to="/news"
            className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
          >
            Read updates
          </Link>
          <Link
            to="/help"
            className="inline-flex items-center rounded-lg border px-4 py-2 text-slate-900 hover:bg-slate-50"
          >
            How to help
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <Card title="Articles / News" to="/news">
          Announcements, statements, and event recaps.
        </Card>
        <Card title="Projects" to="/projects">
          Previous initiatives, fundraisers, and collaborations.
        </Card>
        <Card title="People" to="/people">
          Club members, roles, and how to get involved.
        </Card>
      </section>
    </div>
  );
}

function Card({ title, to, children }: { title: string; to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="rounded-2xl border bg-white p-6 shadow-sm hover:bg-slate-50">
      <div className="text-lg font-semibold text-slate-900">{title}</div>
      <div className="mt-2 text-slate-700">{children}</div>
    </Link>
  );
}