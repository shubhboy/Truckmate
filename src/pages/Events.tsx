"use client";
import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import * as Collapsible from "@radix-ui/react-collapsible";
import { CalendarDays, ChevronUp, ChevronDown, Map } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function EventsTable({ events, title }: { events: any[]; title: string }) {
  const [openRow, setOpenRow] = React.useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setOpenRow(openRow === index ? null : index);
  };

  const openMap = (map_link: string | null) => {
    if (map_link) window.open(map_link, "_blank");
  };

  if (!events || events.length === 0) {
    return (
      <div className="text-slate-400 text-center py-8">No events found.</div>
    );
  }
  return (
    <div className="w-full max-w-4xl mx-auto mb-10">
      <h2 className="text-lg font-semibold text-center mb-4">{title}</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-slate-900 text-slate-100">
          <thead>
            <tr>
              <th />
              <th className="py-2 px-4 text-left">Event Name</th>
              <th className="py-2 px-4 text-center">Game</th>
              <th className="py-2 px-4 text-center">Server</th>
              <th className="py-2 px-4 text-center">Depature City</th>
              <th className="py-2 px-4 text-center">Arrival City</th>
              <th className="py-2 px-4 text-center">Map</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => {
              const meetupDate = event.meetup_at ? new Date(event.meetup_at) : null;
              const formattedDate = meetupDate ? meetupDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }) : 'NA';
              return (
                <React.Fragment key={event.id}>
                  <tr className="border-b border-slate-700">
                    <td className="py-2 px-2">
                      <button
                        aria-label="expand row"
                        onClick={() => handleRowClick(index)}
                        className="focus:outline-none"
                      >
                        {openRow === index ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </td>
                    <td className="py-2 text-sm px-4">{event.name}</td>
                    <td className="py-2 text-sm px-4 text-center">{event.game}</td>
                    <td className="py-2 text-sm px-4 text-center">{event.server.name}</td>
                    <td className="py-2 text-sm px-4 text-center">{event.departure.city}</td>
                    <td className="py-2 text-sm px-4 text-center">{event.arrive.city}</td>
                    <td className="py-2 text-sm px-4 text-center">
                      <button
                        onClick={() => openMap(event.map)}
                        className="text-cyan-400 hover:text-cyan-500"
                      >
                        <Map />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={8} className="p-0">
                      <Collapsible.Root open={openRow === index}>
                        <Collapsible.Content className="bg-slate-700/50">

                            <CardHeader className="pb-2">
                              <CardTitle className="text-slate-100 flex items-center text-base">
                                Attendees
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <div className="text-sm text-slate-400">Confirmed</div>
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">{event.attendances.confirmed}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="text-sm text-slate-400">Unsure</div>
                                  <Badge className="bg-red-500/20 text-red-400 border-red-500/50">{event.attendances.unsure}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="text-sm text-slate-400">VTC</div>
                                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">{event.attendances.vtcs}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="text-sm text-cyan-400">{formattedDate}</div>
                                  <div className="text-sm text-cyan-400">
                                        <span className="text-slate-500">Departure Time</span>  {new Date(event.start_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                  </div>
                                </div>
                              </div>
                            </CardContent>

                        </Collapsible.Content>
                      </Collapsible.Root>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Events() {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/eventsapi');
        if (!response.ok) throw new Error("Network response was not ok");
        const apiData = await response.json();
        setData(apiData);
      } catch (error: any) {
        setError('Error fetching data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-100 flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-cyan-500" />
              Convoy / Events
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-10 pb-6">
          {loading && (
            <div className="text-cyan-400 text-center py-8">Loading...</div>
          )}
          {error && (
            <div className="text-red-400 text-center py-8">{error}</div>
          )}
          {!loading && !error && data && (
            <>
              <EventsTable events={data.featured || []} title="Featured Events" />
              <EventsTable events={data.today || []} title="Today's Events" />
              <EventsTable events={data.upcoming || []} title="Upcoming Events" />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}