"use client";
import { createContext, useContext } from "react"

export type ServerInfo = {
  id: number
  name: string
  online: boolean
  players: number
  maxplayers: number
  event: boolean
  queue: number
  game: string
}

export const ServersContext = createContext<ServerInfo[]>([])

export function useServers() {
  return useContext(ServersContext)
}