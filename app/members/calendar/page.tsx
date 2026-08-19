import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member calendar",
  robots: { index: false, follow: false }
};

const confirmedEvents: Array<{ date: string; title: string; time?: string }> = [];

function monthData(now = new Date()) {
  const year = now.getFullYear();
  const month = now.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const mondayIndex = (first.getDay() + 6) % 7;
  const days: Array<number | null> = Array.from({ length: mondayIndex }, () => null);
  for (let day = 1; day <= last.getDate(); day += 1) days.push(day);
  while (days.length % 7 !== 0) days.push(null);
  return {
    year,
    month,
    label: first.toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
    days
  };
}

export default function MemberCalendarPage() {
  const calendar = monthData();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === calendar.year && today.getMonth() === calendar.month;
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <main className="member-main">
      <div className="container">
        <header className="member-page-head">
          <p className="eyebrow">Carer’s Circle calendar</p>
          <h1>Sessions and member events in one place.</h1>
          <p className="lede">Confirmed Q&amp;A sessions, workshops and member events will appear here. Dates are only published once they have been confirmed by The Clara Path.</p>
        </header>

        <section className="member-calendar" aria-labelledby="calendar-month">
          <div className="calendar-head">
            <div>
              <p className="eyebrow">Member calendar</p>
              <h2 id="calendar-month">{calendar.label}</h2>
            </div>
            <a className="button button-secondary" href="/members/events">Event details</a>
          </div>

          <div className="calendar-grid calendar-weekdays" aria-hidden="true">
            {weekdays.map((day) => <div key={day}>{day}</div>)}
          </div>
          <div className="calendar-grid">
            {calendar.days.map((day, index) => {
              if (day === null) return <div className="calendar-day is-empty" key={`empty-${index}`} />;
              const dateKey = `${calendar.year}-${String(calendar.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const dayEvents = confirmedEvents.filter((event) => event.date === dateKey);
              const isToday = isCurrentMonth && day === today.getDate();
              return (
                <div className={`calendar-day${isToday ? " is-today" : ""}`} key={dateKey}>
                  <span className="calendar-date">{day}</span>
                  {dayEvents.map((event) => (
                    <div className="calendar-event" key={`${dateKey}-${event.title}`}>
                      <strong>{event.title}</strong>
                      {event.time ? <span>{event.time}</span> : null}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </section>

        {confirmedEvents.length === 0 ? (
          <aside className="calendar-empty" role="status">
            <strong>No confirmed member events yet.</strong>
            <p>The calendar is ready. As soon as dates are confirmed, they can be published here with joining or booking details.</p>
          </aside>
        ) : null}

        <style>{`
          .member-calendar{margin-top:32px;padding:26px;border:1px solid #dce3ef;border-radius:18px;background:#fff;box-shadow:0 10px 30px rgba(16,43,108,.06)}
          .calendar-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:22px}.calendar-head h2{margin:0;font-size:1.8rem}.calendar-head .eyebrow{margin-bottom:5px}
          .calendar-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:7px}.calendar-weekdays{margin-bottom:7px;color:#56627b;font-size:.78rem;font-weight:850;text-align:center}.calendar-weekdays div{padding:7px 4px}
          .calendar-day{min-height:112px;padding:10px;border:1px solid #e2e8f2;border-radius:10px;background:#fbfcff}.calendar-day.is-empty{border-color:transparent;background:transparent}.calendar-day.is-today{border-color:#4d7c0f;box-shadow:inset 0 0 0 1px #4d7c0f}.calendar-date{display:grid;width:28px;height:28px;place-items:center;border-radius:50%;color:#102b6c;font-size:.86rem;font-weight:850}.is-today .calendar-date{color:#fff;background:#4d7c0f}.calendar-event{display:grid;gap:2px;margin-top:7px;padding:7px;border-radius:8px;color:#102b6c;background:#e8f0ff;font-size:.74rem}.calendar-event span{color:#56627b}
          .calendar-empty{margin-top:18px;padding:20px 22px;border-left:4px solid #4d7c0f;border-radius:8px;background:#f1f8e9}.calendar-empty strong{color:#102b6c}.calendar-empty p{margin:6px 0 0;color:#56627b}
          @media(max-width:720px){.member-calendar{padding:16px;overflow-x:auto}.calendar-head{align-items:flex-start;flex-direction:column}.calendar-grid{min-width:680px}.calendar-day{min-height:95px}}
        `}</style>
      </div>
    </main>
  );
}
