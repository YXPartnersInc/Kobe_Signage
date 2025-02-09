import { useState, useEffect } from "react"
import { AlertTriangle, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
      <header className="bg-red-600 dark:bg-red-800 py-4 px-6 flex items-center justify-center space-x-4">
        <AlertTriangle className="h-10 w-10 text-yellow-300" />
        <h1 className="text-3xl md:text-4xl font-bold text-white">緊急地震速報</h1>
      </header>
      <main className="flex-grow p-4 md:p-8 space-y-6">
        <Card className="border-red-500 dark:border-red-700">
          <CardHeader className="bg-red-500 dark:bg-red-700 text-white">
            <CardTitle className="text-2xl md:text-3xl font-bold">強い揺れに警戒</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200">
              頭を守り、建物から離れてください
            </p>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">予想到達時間まで</p>
              <p className="text-4xl md:text-5xl font-bold text-red-600 dark:text-red-400">{quakeTime.toFixed(1)}秒</p>
            </div>
            <Progress value={(10 - quakeTime) * 10} className="h-2 bg-gray-300 dark:bg-gray-700" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">避難指示</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              以下の地域にお住まいの方は、直ちに安全な場所へ避難してください：
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>〇〇市全域</li>
              <li>△△町沿岸部</li>
              <li>□□村山間部</li>
            </ul>
            <Button className="w-full">
              避難所マップを確認 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </main>
      <footer className="bg-gray-200 dark:bg-gray-800 py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">
        最新の情報は気象庁公式サイトでご確認ください
      </footer>
    </div>
  )
}