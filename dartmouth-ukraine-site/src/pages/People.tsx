export default function People() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">People</h1>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-slate-700">
          Add your leadership roles + members here. (We can pull this from Sanity later too,
          but hardcoding is fine to start.)
        </p>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <PersonCard name="President" details="Name TBD" />
          <PersonCard name="Treasurer" details="Name TBD" />
          <PersonCard name="Events" details="Name TBD" />
          <PersonCard name="Comms / Writing" details="Name TBD" />
        </div>
      </div>
    </div>
  );
}

function PersonCard({ name, details }: { name: string; details: string }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="font-semibold text-slate-900">{name}</div>
      <div className="text-slate-700">{details}</div>
    </div>
  );
}
