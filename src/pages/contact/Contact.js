'use client'

import React, { useState, useEffect } from 'react'
import { Mail, Twitter, Hash, Github, Check, Copy } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from 'next/link'

export default function Component() {
  const [copied, setCopied] = useState(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'contact@tomasps.com.com', href: 'mailto:contact@tomasps.com.com' },
    { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', value: '@toomas_ps', href: 'https://twitter.com/toomas_ps' },
    { icon: <Hash className="w-5 h-5" />, label: 'Matrix', value: '@tomas:tomasps.com', href: 'https://matrix.to/#/@tomas:tomasps.com' },
    { icon: <Github className="w-5 h-5" />, label: 'GitHub', value: 'github.com/tresillo2017', href: 'https://github.com/tresillo2017' },
  ]

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 2000)
  }

  useEffect(() => {
    const gradient = document.getElementById('gradient')
    if (gradient) {
      let angle = 0
      const intervalId = setInterval(() => {
        angle = (angle + 1) % 360
        gradient.style.background = `linear-gradient(${angle}deg, #000000, #1a1a1a)`
      }, 50)
      return () => clearInterval(intervalId)
    }
  }, [])

  return (
    <div id="gradient" className="min-h-screen flex flex-col items-center justify-between p-8 bg-black text-[#e0e0e0] overflow-hidden">
      <motion.div className="w-full max-w-2xl" style={{ y }}>
        <header>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-6 mt-16 text-center text-white"
          >
            John Doe
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center text-lg mb-12 text-[#b0b0b0]"
          >
            Full-stack Developer | Open Source Enthusiast
          </motion.p>
        </header>
        <main className="w-full max-w-md mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-[#111] transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-[#808080]">
                    {item.icon}
                  </div>
                  <Link 
                    href={item.href}
                    className="font-medium hover:text-white transition-colors duration-200"
                    aria-label={`${item.label}: ${item.value}`}
                  >
                    {item.value}
                  </Link>
                </div>
                <button
                  onClick={() => copyToClipboard(item.value)}
                  className="text-[#808080] hover:text-white transition-colors duration-200"
                  aria-label={`Copy ${item.label} to clipboard`}
                >
                  {copied === item.value ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </motion.div>
    </div>
  )
}