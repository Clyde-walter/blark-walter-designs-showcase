import React from "react";
import { Search, Bell } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AdminTopbar() {
  return (
    <div className="sticky top-0 z-30 bg-background/60 backdrop-blur-sm border-b border-border/50">
      <div className="container-x flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center rounded-md bg-surface px-3 py-1 text-sm text-muted-foreground">
            <Search className="h-4 w-4 mr-2 text-muted-foreground" />
            <input placeholder="Search anything..." className="bg-transparent outline-none" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-full p-2 hover:bg-muted"><Bell className="h-4 w-4" /></button>
          <Link to="/auth" className="flex items-center gap-2">
            <img src="/logo.png" alt="avatar" className="h-8 w-8 rounded-full object-cover" />
            <div className="hidden sm:block text-sm">
              <div className="font-semibold">Clyde Walter</div>
              <div className="text-xs text-muted-foreground">Administrator</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminTopbar;
