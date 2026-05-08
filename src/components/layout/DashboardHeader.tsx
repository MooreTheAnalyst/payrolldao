"use client";

import { Bell, Search } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export default function DashboardHeader({ title, description, actions }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-black/50 px-6 py-4 backdrop-blur-sm">
      <div>
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        {description && <p className="mt-0.5 text-sm text-gray-500">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        {actions}
        <button
          className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
        <button
          className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
