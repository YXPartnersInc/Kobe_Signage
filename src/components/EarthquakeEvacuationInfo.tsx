import { useState, useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function EarthquakeEvacuationInfo() {
  const [quakeTime, setQuakeTime] = useState(10)

  useEffect(() => {
    const interval = setInterval(() => {
      setQuakeTime((prevTime) => {
        const newTime = prevTime - 0.1
        return newTime > 0 ? Number(newTime.toFixed(1)) : 0
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-red-600 dark:bg-red-800 py-10 px-18 flex items-center justify-center space-x-4">
        <AlertTriangle className="h-16 w-16 text-yellow-300 animate-fast-blink" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center">
          Earthquake, Evacuate Immediately!
        </h1>
        <AlertTriangle className="h-16 w-16 text-yellow-300 animate-fast-blink" />

        {/* Blink Animation Definition */}
        <style jsx global>{`
          @keyframes fast-blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-fast-blink {
            animation: fast-blink 0.8s infinite alternate;
          }
        `}</style>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 space-y-6">
        
        {/* Strong Shake Warning Card (Title Centered) */}
        <Card className="border-red-500 dark:border-red-700">
          <CardHeader className="bg-white dark:bg-gray-800 border-b border-red-500 dark:border-red-700">
            <CardTitle className="text-4xl md:text-5xl font-extrabold text-red-600 text-center">
              Warning: Strong Shaking
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4 text-center">
          <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 bg-red-100 dark:bg-red-900 px-4 py-2 rounded inline-flex items-center justify-center">
            Seismic Intensity
            <span className="text-5xl md:text-6xl font-extrabold text-red-600 mx-2">
              6
            </span>
            Strong
          </p>
          <p className="text-2xl md:text-3xl font-medium text-gray-800 dark:text-gray-200">
            Protect your head and stay away from buildings
          </p>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Time to Arrival</p>
            <p className="text-4xl md:text-5xl font-bold text-red-600 dark:text-red-400">
              {quakeTime.toFixed(1)} seconds
            </p>
          </div>
          <Progress value={(10 - quakeTime) * 10} className="h-2 bg-gray-300 dark:bg-gray-700 mx-auto" />
        </CardContent>  
        </Card>

        {/* Estimated Epicenter Card (Title Centered) */}
        <Card className="border-red-500 dark:border-red-700">
          <CardHeader className="bg-red-500 dark:bg-red-700 text-white">
            <CardTitle className="text-2xl md:text-3xl font-bold text-center">
              Estimated Epicenter
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <p className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400 text-center">
              Off the coast of XX Prefecture
            </p>
          </CardContent>
        </Card>

        {/* Evacuation Order Card (Title Centered) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 text-center">
              Evacuation Order
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Residents in the following areas should evacuate to a safe place immediately:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>All areas of XX City</li>
              <li>Coastal areas of YY Town</li>
              <li>Mountainous areas of ZZ Village</li>
            </ul>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Please check the official website of the Japan Meteorological Agency for the latest information
      </footer>
    </div>
  )
}