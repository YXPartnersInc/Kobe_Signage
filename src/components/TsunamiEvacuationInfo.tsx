"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const GOOGLE_MAPS_API_KEY = import.meta.env.GOOGLE_MAPS_API_KEY;

declare global {
  interface Window {
    initMap?: () => void
  }
}

export default function TsunamiAlert() {
  const [tsunamiTime, setTsunamiTime] = useState(91)

  // 1分ごとにカウントダウン
  useEffect(() => {
    const timer = setInterval(() => {
      setTsunamiTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Google Maps 読み込み
  useEffect(() => {
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`
    script.async = true
    document.body.appendChild(script)

    window.initMap = () => {
      const map = new (window as any).google.maps.Map(document.getElementById("tsunami_map") as HTMLElement, {
        center: { lat: 34.68987999295323, lng: 135.19044936216036 },
        zoom: 15.3,
      })

      const imageBounds = {
        north: 34.6984965737,
        south: 34.68126341222471,
        east: 135.2019762759,
        west: 135.17892244845066,
      }

      const groundOverlay = new (window as any).google.maps.GroundOverlay(
        "http://yxpartners.co.jp/wp-content/uploads/2025/01/area_map_2_2.png",
        imageBounds,
      )
      groundOverlay.setOpacity(0.5)
      groundOverlay.setMap(map)
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="w-full h-screen bg-gray-100 p-2">
      {/* 全画面カード */}
      <Card className="w-full h-full overflow-hidden">
        <CardContent className="p-0 h-full flex flex-col">
          {/* 上部の警告帯 */}
          <div className="bg-red-600 text-white p-4 flex items-center justify-between animate-pulse">
            <AlertTriangle size={48} />
            <div className="text-center">
              <h1 className="text-4xl font-bold">津波　すぐにげて！</h1>
              <p className="text-xl">TSUNAMI EVACUATE!</p>
            </div>
            <AlertTriangle size={48} />
          </div>

          {/* メインボディ */}
          <div className="bg-blue-800 text-white p-2 flex-grow flex flex-col md:flex-row gap-2">
            {/* 左側: マップ */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full">
              <div id="tsunami_map" className="w-full h-full rounded-lg overflow-hidden"></div>
            </div>

            {/* 右側: 避難所カード & 下部情報 */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-between">
              {/* 避難所カード */}
              <div className="p-4 w-full flex-1">
                <Card className="bg-gray-800 text-white h-full shadow-lg flex flex-col">
                  <CardHeader className="border-b border-gray-600 p-6">
                    <CardTitle className="text-3xl md:text-4xl font-semibold">避難所 / Evacuation Center</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 text-left flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">こうべ市民福祉交流センター</h3>
                      <p className="text-lg md:text-xl mb-4">Kobe Citizen Welfare Exchange Center</p>
                      <div className="flex items-start mb-4">
                        <MapPin className="mr-2 mt-1 flex-shrink-0" size={24} />
                        <p className="text-lg md:text-xl">神戸市中央区磯上通3丁目1-32</p>
                      </div>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-xl md:text-2xl font-medium text-center">
                        ここから <span className="text-yellow-300">870m</span> /{" "}
                        <span className="text-yellow-300">30分</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 下部情報エリア */}
              <div className="p-4 mt-2 flex flex-col md:flex-row justify-between items-center gap-4 bg-yellow-300 text-black rounded-lg">
                <p className="text-xl md:text-2xl font-bold">予想高さ: 5m</p>
                <p className="text-xl md:text-2xl font-bold">予想到達まで: {tsunamiTime}分</p>
                <p className="text-sm md:text-base">人流データに基づいてルートを計算しています</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

