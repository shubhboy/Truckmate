"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, LockOpen, Star, Truck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUser, Search, MessageSquare, } from "lucide-react";

export default function Playerinfo() {
  const [data, setData] = useState<any>(null);
  const [inputId, setInputId] = useState(""); // For the input box
  const [truckersMPId, setTruckersMPId] = useState(""); // For the searched ID
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data when truckersMPId changes
  useEffect(() => {
    if (!truckersMPId) return;
    setLoading(true);
    setError(null);
    setData(null);
    fetch(`/api/playerapi?truckersMPId=${truckersMPId}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(res.error);
          setData(null);
        } else {
          setData(res.response || res);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch player info.");
        setData(null);
        setLoading(false);
      });
  }, [truckersMPId]);

  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
       <CardHeader className="border-b border-slate-700/50">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <CardTitle className="text-slate-100 flex items-center text-lg sm:text-xl">
      <CircleUser className="mr-2 h-5 w-5 text-cyan-500" />
      Player Information
    </CardTitle>
    <form
      className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:w-auto"
      onSubmit={e => {
        e.preventDefault();
        setTruckersMPId(inputId.trim());
      }}
    >
      <div className="flex items-center space-x-1 bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm w-full sm:w-auto">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Enter Player ID..."
          className="bg-transparent border-none focus:outline-none text-sm w-full sm:w-40 placeholder:text-slate-500"
          value={inputId}
          onChange={e => setInputId(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="px-3 py-1 rounded bg-cyan-600 text-white text-sm hover:bg-cyan-700 w-full sm:w-auto"
      >
        Search
      </button>
    </form>
  </div>
</CardHeader>
        <CardContent className="py-8">
          {loading && (
            <div className="flex justify-center items-center h-32 text-cyan-400 font-mono">
              Loading player info...
            </div>
          )}
          {error && (
            <div className="flex justify-center items-center h-32 text-red-400 font-mono">
              {error}
            </div>
          )}
          {!loading && !error && data && (
            <>
              <div className="relative">
                <div className="h-[12.625rem] bg-gradient-to-r from-blue-500 to-blue-700">
                  <img
                    src="/user-bg.png?height=202&width=800"
                    alt="Profile background"
                    className="h-full w-full object-cover"
                  />
                </div>
                <Avatar className="absolute bottom-0 left-5 translate-y-1/2 w-[75px] h-[75px] border-4 border-white">
                  <AvatarImage src={data.avatar || "/userprofile.jpeg"} alt={data.name} />
                  <AvatarFallback>{data.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </div>
              {/* User Info */}
              <div className="pt-10 pb-6">
                <div className="flex flex-wrap items-center justify-between mb-8">
                  <div className="mr-2 mb-1 flex flex-col">
                    <h2 className="text-xl font-semibold">{data.name}</h2>
                    <span className="text-sm font-semibold text-muted-foreground">
                      Steam ID: {data.steamID}
                    </span>
                  </div>
                  <div className="mb-3.5">
                    <div className="flex items-center">
                      <CalendarIcon className="text-primary mr-2.75 h-4 w-4" />
                      <span className="text-xl font-semibold mx-2">TMP Join Date</span>
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">
                      {data.joinDate
                        ? new Date(data.joinDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex flex-wrap justify-between items-center gap-2 my-4">
                  <span className="text-sm font-semibold whitespace-nowrap">Other Info</span>
                </div>
                {/* VTC and Ban History */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                  {/* VTC History */}
                  <div className="sm:col-span-5">
                    <div className="flex items-center justify-center text-center bg-muted p-6 bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                      <div>
                        <div className="mb-3.5 flex items-end justify-center">
                          <h3 className="text-xl font-semibold">VTC</h3>
                        </div>
                        {data.vtcHistory && data.vtcHistory.length > 0 ? (
                          data.vtcHistory.map((vtc: any, index: number) => (
                            <div key={index} className="mb-2">
                              <h4 className="text-base font-semibold">
                                {vtc.name} {vtc.verified && <span className="text-blue-400 ml-1">✔️</span>}
                              </h4>
                              <p className="text-sm">
                                Join Date:{" "}
                                {vtc.joinDate
                                  ? new Date(vtc.joinDate).toLocaleDateString()
                                  : "N/A"}
                              </p>
                              <p className="text-sm">
                                Left Date:{" "}
                                {vtc.leftDate
                                  ? new Date(vtc.leftDate).toLocaleDateString()
                                  : "N/A"}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm">No VTC History.</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Ban History */}
                  <div className="sm:col-span-7 px-6 pb-6">
                    <h3 className="text-xl font-semibold mb-3.5">Ban History</h3>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                      <div className="sm:col-span-5">
                        <div>
                          <div className="mb-6.75 flex items-center my-2">
                            <LockOpen className="text-primary mr-2.75 h-4 w-4 mx-2" />
                            <p className="text-sm">
                              Active Ban: {data.banned ? "Yes" : "No"}
                            </p>
                          </div>
                          <div className="flex items-center my-2">
                            <CalendarIcon className="text-primary mr-2.75 h-4 w-4 mx-2" />
                            <p className="text-sm">Ban Count: {data.bansCount}</p>
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-7">
                        <div className="mb-6.75 flex items-center my-2">
                          <Star className="text-primary mr-2.75 h-4 w-4 mx-2" />
                          <p className="text-sm">
                            Patreon Member: {data.patreon?.isPatron ? "Yes" : "No"}
                          </p>
                        </div>
                        <div className="flex items-center my-2">
                          <Truck className="text-primary mr-2.75 h-4 w-4 mx-2" />
                          <p className="text-sm">
                            VTC Member: {data.vtc?.inVTC ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Achievements */}
                <Separator className="my-6" />
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <h3 className="text-xl font-semibold mb-3.5">Achievements</h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {data.achievements && data.achievements.length > 0 ? (
                        data.achievements.map((ach: any) => (
                          <div key={ach.id} className="flex space-x-3 p-2 rounded-md bg-slate-800/50 border border-slate-700/50">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={ach.image_url}
                                alt={ach.title} />
                              <AvatarFallback className="bg-slate-700 text-cyan-500"></AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-medium text-slate-200">{ach.title}</div>
                                <div className="text-xs text-slate-500">{ach.achieved_at ? new Date(ach.achieved_at).toLocaleDateString() : ""}</div>
                              </div>
                              <div className="text-xs text-slate-400 mt-1">{ach.description}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm">No Achievements.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}