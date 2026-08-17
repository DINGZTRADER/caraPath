const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function monthCells(date = new Date()) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const first = new Date(Date.UTC(year, month, 1));
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const mondayIndex = (first.getUTCDay() + 6) % 7;
  return {
    label: first.toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }),
    cells: [...Array(mondayIndex).fill(null), ...Array.from({ length: days }, (_, index) => index + 1)] as Array<number | null>
  };
}

export default function MemberCalendarPage() {
  const calendar = monthCells();

  return (
    <main className="member-main">
      <section className="calendar-card">
        <div className="calendar-head">
          <div>
            <p className="eyebrow">Carer’s Circle calendar</p>
            <h1>{calendar.label}</h1>
          </div>
          <a href="/members/events">View event details</a>
        </div>
        <div className="calendar-grid" role="grid" aria-label={`${calendar.label} member calendar`}>
          {weekdays.map((day) => <div className="calendar-weekday" role="columnheader" key={day}>{day}</div>)}
          {calendar.cells.map((day, index) => day ? (
            <div className="calendar-day" role="gridcell" key={`${day}-${index}`}><strong>{day}</strong></div>
          ) : (
            <div className="calendar-day empty" aria-hidden="true" key={`empty-${index}`} />
          ))}
        </div>
        <p className="calendar-empty">No confirmed member events yet. Confirmed Q&amp;A sessions and workshops will appear here once scheduled.</p>
      </section>
    </main>
  );
}
