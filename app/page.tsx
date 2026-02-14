"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "./Lib/supabaseClient"
import { motion } from "framer-motion"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.replace("/dashboard")
      }
    }

    checkSession()
  }, [router])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    })
  }

  return (
      <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 overflow-hidden">

        {/* Background glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-md p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          <h1 className="text-3xl font-semibold text-white mb-3 tracking-tight">
            Welcome To Bookmark
          </h1>

          <p className="text-gray-400 mb-8 text-sm">
            Secure. Store. Access your bookmarks anywhere.
          </p>

          <button
              onClick={handleLogin}
              className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 active:scale-[0.98]"
          >
            Continue with Google
          </button>

          <p className="text-xs text-gray-500 mt-6 text-center">
            Protected by Supabase Authentication
          </p>
        </motion.div>
      </div>
  )
}
