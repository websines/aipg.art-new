import { Home, Wand2, Heart, Image as ImageIcon, FolderOpen, User } from "lucide-react"

export const navItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Generate",
    href: "/generate",
    icon: Wand2,
  },
  {
    title: "Liked Images",
    href: "/liked",
    icon: Heart,
  },
  {
    title: "Generated Images",
    href: "/generated",
    icon: ImageIcon,
  },
  {
    title: "Collections",
    href: "/collections",
    icon: FolderOpen,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
]
