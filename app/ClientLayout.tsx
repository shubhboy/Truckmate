"use client";
import "./globals.css"
import { useEffect, useState, useRef } from "react"
import Sidebar from "@/components/Sidebar"
import RightSidebar from "@/components/RightSidebar"
import { Truck, Menu } from "lucide-react"
import { ServersContext } from "../src/context/ServersContext"

export default function ClientLayout({ children }: { children: React.ReactNode }) {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  type SupportedVersions = {
    supported_game_version: string;
    supported_ats_game_version: string;
    time?: string;
  };
  type ServerInfo = {
    id: number
    name: string
    online: boolean
    players: number
    maxplayers: number
    event: boolean
    queue: number
    game: string
  }
  const [servers, setServers] = useState<ServerInfo[]>([])
  const [supportedVersions, setSupportedVersions] = useState<SupportedVersions | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameTime, setGameTime] = useState<string | null>(null);
  useEffect(() => {
    fetch('/api/gametimeapi')
      .then(res => res.json())
      .then(data => {
        if (data && (typeof data.game_time === "number" || typeof data.game_time === "string")) {
          const gameTimeNum = Number(data.game_time);
          const hours24 = Math.floor((gameTimeNum % 1440) / 60);
          const minutes = gameTimeNum % 60;
          // Convert to 12-hour format
          const hours12 = ((hours24 + 11) % 12) + 1;
          const ampm = hours24 >= 12 ? "PM" : "AM";
          setGameTime(
            `${hours12.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")} ${ampm}`
          );
        } else {
          setGameTime("Unavailable");
        }
      })
      .catch(() => setGameTime(null));
  }, []);

  useEffect(() => {
    fetch('/api/ginfoapi')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSupportedVersions({
          supported_game_version: data.supported_game_version,
          supported_ats_game_version: data.supported_ats_game_version,
          time: data.time,
        });
        setFetchError(null); // Clear error if successful
      })
      .catch(error => {
        setFetchError('Error fetching supported game versions: ' + error.message); // Set error message
        console.error('Error fetching supported game versions:', error);
      });
  }, []);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])



  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 55) + 200}, ${Math.random() * 0.5 + 0.2})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])



  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative ">
        <div
          className={`${theme} min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative`}
        >
          {/* Background particle effect */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
                  <div className="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-4 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
                  <div className="absolute inset-8 border-4 border-l-green-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
                </div>
                <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">Hello Truckers</div>
              </div>
            </div>
          )}
          <div className="container mx-auto p-4 relative z-10">
            {/* Header */}
            <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
              <div className="flex items-center space-x-2">
                <Truck className="h-8 w-8 text-cyan-500" />
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Truck Mate
                </span>
              </div>
              {/* Hamburger for mobile */}
              <button
                className="md:hidden p-2 rounded text-cyan-400 hover:bg-slate-800"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
              >
                <Menu className="h-6 w-6" />
              </button>
            </header>
            <div className="grid grid-cols-12 gap-6">
              <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              <ServersContext.Provider value={servers}>
                <main className="col-span-12 md:col-span-9 lg:col-span-7">{children}</main>
              </ServersContext.Provider>
              <div className="col-span-12 lg:col-span-3">
                <RightSidebar
                  supportedVersions={supportedVersions}
                  fetchError={null}
                  currentTime={currentTime}
                  formatDate={formatDate}
                  gameTime={gameTime}
                />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}