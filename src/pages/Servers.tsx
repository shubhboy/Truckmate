"use client";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, CalendarCheck2 } from "lucide-react"
import { useEffect, useState } from "react"

function MetricCard({
  title,
  value,
  trend,
  detail,
}: {
  title: string
  value: string
  trend: "no" | "event"
  detail: string
}) {
  // Determine the icon based on the event
  const getEventIcon = () => {
    switch (trend) {
      case "event":
        return (
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <CalendarCheck2 className="h-4 w-4 text-amber-500" />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            Event Server
          </TooltipContent>
        </Tooltip>
        </TooltipProvider>
      )
      case "no":
        return undefined
      default:
        return null
    }
  }

  return (
    <div
      className={`rounded-lg border bg-slate-800/50 from-cyan-500 to-blue-500 border-cyan-500/30 p-4 relative overflow-hidden`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-400">{title}</span>
        {getEventIcon()}
      </div>
      <div className="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300">{value}</div>
      <div className="text-xs text-slate-500">{detail}</div>
    </div>
  )
}

// MainDashboard component
type Server = {
  id: string | number
  name: string
  players: number
  maxplayers: number
  event?: boolean
  queue: number
}

export default function Servers() {
  const [servers, setServers] = useState<Server[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/serverapi')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then(data => {
        setServers(data)
        setServerError(null)
      })
      .catch(err => {
        setServerError('Error fetching server details: ' + err.message)
        setServers([])
      })
  }, []);
  return (
    <div className="grid gap-6">
      {/* System overview */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="border-b border-slate-700/50 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-100 flex items-center">
              <Activity className="mr-2 h-5 w-5 text-cyan-500" />
              Server Overview
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
                LIVE
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servers.map((server: Server) => (
              <MetricCard
                key={server.id}
                title={server.name}
                value={`${server.players} / ${server.maxplayers}`}
                trend={server.event ? "event" : "no"}
                detail={`Queue: ${server.queue}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}