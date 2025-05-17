"use client";
import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Truck, ChevronUp, ChevronDown, MessageCircleMore, BadgeCheck } from "lucide-react";

function VtcTable({ vtcs, title }: { vtcs: any[]; title: string }) {
  const [openRow, setOpenRow] = React.useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setOpenRow(openRow === index ? null : index);
  };

  const openDiscord = (discordUrl: string | null) => {
    if (discordUrl) window.open(discordUrl, "_blank");
  };

  if (!vtcs || vtcs.length === 0) {
    return (
      <div className="text-slate-400 text-center py-8">No VTCs found.</div>
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
              <th className="py-2 px-4 text-left">VTC Name</th>
              <th className="py-2 px-4 text-center">Owner</th>
              <th className="py-2 px-4 text-center">Slogan</th>
              <th className="py-2 px-4 text-center">Member Count</th>
              <th className="py-2 px-4 text-center">Discord</th>
            </tr>
          </thead>
          <tbody>
            {vtcs.map((vtc, index) => (
              <React.Fragment key={index}>
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
                  <td className="py-2 px-4 flex items-center">
                    <span>{vtc.name}</span>
                    {vtc.verified && (
                      <span
                        className="ml-2 text-blue-500"
                        title="Verified"
                      >
                        <BadgeCheck/>
                      </span>
                    )}
                  </td>
                  <td className="py-2 text-sm px-4 text-center">{vtc.owner_username}</td>
                  <td className="py-2 text-sm px-4 text-center">{vtc.slogan}</td>
                  <td className="py-2 text-sm px-4 text-center">{vtc.members_count}</td>
                  <td className="py-2 px-4 text-center">
                    {vtc.socials?.discord ? (
                      <button
                        aria-label="open discord"
                        onClick={() => openDiscord(vtc.socials.discord)}
                        className="text-indigo-400 hover:text-indigo-200"
                      >
                        <MessageCircleMore/>
                      </button>
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} className="p-0">
                    <Collapsible.Root open={openRow === index}>
                      <Collapsible.Content>
                        <div className="bg-slate-800 px-6 py-4">
                          <div className="flex flex-wrap gap-6">
                            <div>
                              <span className="font-semibold">Recruitment:</span> {vtc.recruitment}
                            </div>
                            <div>
                              <span className="font-semibold">Language:</span> {vtc.language}
                            </div>
                            <div>
                              <span className="font-semibold">Verified:</span> {vtc.verified ? "Yes" : "No"}
                            </div>
                            <div>
                              <span className="font-semibold">Created:</span> {vtc.created ? new Date(vtc.created).toLocaleDateString() : "-"}
                            </div>
                          </div>
                        </div>
                      </Collapsible.Content>
                    </Collapsible.Root>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Vtc() {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/vtcapi');
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setData(data);
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
              <Truck className="mr-2 h-5 w-5 text-cyan-500" />
              VTCs
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
              <VtcTable vtcs={data.recent || []} title="Recent VTCs" />
              <VtcTable vtcs={data.featured || []} title="Featured VTCs" />
              <VtcTable vtcs={data.featured_cover || []} title="Featured Cover VTCs" />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}