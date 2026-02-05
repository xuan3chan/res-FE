import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { type SidebarData } from "../types";

export const sidebarData: SidebarData = {
  user: {
    name: "Administrator",
    email: "admin@resapp.com",
    avatar: "",
  },
  teams: [
    {
      name: "ResApp Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Profile",
          icon: GalleryVerticalEnd,
          items: [
            { title: "Profile", url: "/profile" },
          ],
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Settings",  
          url: "/settings",
          icon: Settings,
        },
      ],
    },
  ],
};
