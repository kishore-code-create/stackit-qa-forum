"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Menu, X, Plus, User, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationBell } from "@/components/notifications/notification-bell"
import { useAuth } from "@/hooks/use-auth"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { user, logout } = useAuth()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-stack-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-inter font-bold text-xl text-gray-900">StackIt</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/ask">
              <Button className="bg-stack-blue hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Ask Question
              </Button>
            </Link>

            {user ? (
              <>
                <NotificationBell />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-stack-blue hover:bg-blue-700 text-white">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {user && <NotificationBell />}
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>

              {/* Mobile Actions */}
              <div className="space-y-2">
                <Link href="/ask" className="block">
                  <Button className="w-full bg-stack-blue hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Ask Question
                  </Button>
                </Link>

                {user ? (
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login" className="block">
                      <Button variant="ghost" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup" className="block">
                      <Button className="w-full bg-stack-blue hover:bg-blue-700 text-white">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating Ask Button (Mobile) */}
      {!isMenuOpen && (
        <Link href="/ask" className="md:hidden">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="fixed bottom-4 right-4 z-50">
            <Button size="icon" className="h-14 w-14 rounded-full bg-stack-blue hover:bg-blue-700 text-white shadow-lg">
              <Plus className="w-6 h-6" />
            </Button>
          </motion.div>
        </Link>
      )}
    </motion.nav>
  )
}
