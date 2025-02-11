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
      {/* ヘッダー */}
      <header className="bg-red-600 dark:bg-red-800 py-10 px-18 flex items-center justify-center space-x-4">
        <AlertTriangle className="h-16 w-16 text-yellow-300 animate-fast-blink" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center">
          地震 すぐにげて！
        </h1>
        <AlertTriangle className="h-16 w-16 text-yellow-300 animate-fast-blink" />

        {/* 点滅アニメーション定義 */}
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

      {/* メインコンテンツ */}
      <main className="flex-grow p-4 md:p-8 space-y-6">
        
        {/* 強い揺れに警戒カード（タイトルを中央揃え） */}
        <Card className="border-red-500 dark:border-red-700">
          <CardHeader className="bg-white dark:bg-gray-800 border-b border-red-500 dark:border-red-700">
            <CardTitle className="text-4xl md:text-5xl font-extrabold text-red-600 text-center">
              強い揺れに警戒
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4 text-center"> {/* text-center を追加 */}
          <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 bg-red-100 dark:bg-red-900 px-4 py-2 rounded inline-flex items-center justify-center">
            震度
            <span className="text-5xl md:text-6xl font-extrabold text-red-600 mx-2">
              6
            </span>
            強
          </p>
          <p className="text-2xl md:text-3xl font-medium text-gray-800 dark:text-gray-200">
            頭を守り、建物から離れてください
          </p>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">予想到達時間まで</p>
            <p className="text-4xl md:text-5xl font-bold text-red-600 dark:text-red-400">
              {quakeTime.toFixed(1)}秒
            </p>
          </div>
          <Progress value={(10 - quakeTime) * 10} className="h-2 bg-gray-300 dark:bg-gray-700 mx-auto" /> {/* 進捗バーも中央揃え */}
        </CardContent>  
        </Card>

        {/* 推定震源カード（タイトルを中央揃え） */}
        <Card className="border-red-500 dark:border-red-700">
          <CardHeader className="bg-red-500 dark:bg-red-700 text-white">
            <CardTitle className="text-2xl md:text-3xl font-bold text-center">
              推定震源
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <p className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400 text-center">
              〇〇県沖
            </p>
          </CardContent>
        </Card>

        {/* 避難指示カード（タイトルを中央揃え） */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 text-center">
              避難指示
            </CardTitle>
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
          </CardContent>
        </Card>
      </main>

      {/* フッター */}
      <footer className="bg-gray-200 dark:bg-gray-800 py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">
        最新の情報は気象庁公式サイトでご確認ください
      </footer>
    </div>
  )
}