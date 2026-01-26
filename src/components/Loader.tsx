import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Loader2 className="h-20 w-20 animate-spin text-blue-600 rounded-full" />
      </motion.div>
    </div>
  )
}

export default Loader
