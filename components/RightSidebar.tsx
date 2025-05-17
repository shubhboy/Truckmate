import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, RefreshCw, Download, Terminal, LucideIcon } from "lucide-react"



export default function RightSidebar({
  supportedVersions,
  fetchError,
  currentTime,
  formatDate,
  gameTime,
}: {
  supportedVersions: any,
  fetchError: string | null,
  currentTime: Date,
  formatDate: (date: Date) => string,
  gameTime?: string | null,
}) {

    // Action button component
function ActionButton({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <Button
      variant="outline"
      className="h-auto py-3 px-3 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full"
    >
      <Icon className="h-5 w-5 text-cyan-500" />
      <span className="text-xs">{label}</span>
    </Button>
  )
}
  return (
    <div className="grid gap-6">
      {/* System time */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-slate-700/50">
            <div className="text-center">
              <div className="text-base text-slate-100 mb-1 font-mono">IN GAME TIME</div>
              <div className="text-3xl font-mono text-cyan-400 mb-1">
                {gameTime ? gameTime : "Loading..."}
              </div>
            </div>
          </div>
          <div className="p-4">
            {fetchError && (
              <div className="mb-2 text-xs text-red-400 font-mono">{fetchError}</div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                <div className="text-xs text-slate-500 mb-1">ETS Version</div>
                <div className="text-sm font-mono text-slate-200">{supportedVersions?.supported_game_version}</div>
              </div>
              <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                <div className="text-xs text-slate-500 mb-1">ATS Version</div>
                <div className="text-sm font-mono text-slate-200">{supportedVersions?.supported_ats_game_version}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-100 text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <ActionButton icon={Shield} label="Security Scan" />
            <ActionButton icon={RefreshCw} label="Sync Data" />
            <ActionButton icon={Download} label="Backup" />
            <ActionButton icon={Terminal} label="Console" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}