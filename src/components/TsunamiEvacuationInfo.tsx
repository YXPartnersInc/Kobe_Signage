"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TsunamiEvacuationInfoProps {
  shelterName: string
  shelterNameEn: string
  shelterAddress: string
  shelterAddressEn: string
  distance: number
  estimatedTimeToShelter: number
  estimatedHeight: number
  estimatedTimeToArrival: number
  imageSrc: string // 画像のパスを指定する引数を追加
}

export default function TsunamiEvacuationInfo({
  shelterName,
  shelterNameEn,
  shelterAddress,
  shelterAddressEn,
  distance,
  estimatedTimeToShelter,
  estimatedHeight,
  estimatedTimeToArrival,
  imageSrc
}: TsunamiEvacuationInfoProps) {
  const [tsunamiTime, setTsunamiTime] = useState(estimatedTimeToArrival)

  useEffect(() => {
    const timer = setInterval(() => {
      setTsunamiTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full h-screen bg-gray-100 p-2">
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
              <img
                src={imageSrc}
                alt="Tsunami map"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 右側: 避難所カード & 下部情報 */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-between">
              {/* 避難所カード */}
              <div className="p-4 w-full flex-1">
                <Card className="bg-gray-800 text-white h-full shadow-lg flex flex-col">
                  <CardHeader className="border-b border-gray-600 p-6">
                    <CardTitle className="text-3xl md:text-4xl font-semibold text-center">
                      避難所 / Evacuation Center
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 text-left flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">{shelterName}</h3>
                      <p className="text-lg md:text-xl mb-4">{shelterNameEn}</p>
                      <div className="flex items-start mb-4">
                        <MapPin className="mr-2 mt-1 flex-shrink-0" size={24} />
                        <p className="text-lg md:text-xl">
                          {shelterAddress}
                          <br />
                          {shelterAddressEn}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-xl md:text-2xl font-medium text-center">
                        From here <span className="text-yellow-300">{distance}m</span> /{" "}
                        <span className="text-yellow-300">{estimatedTimeToShelter} minutes</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Information Area */}
              <div className="p-4 mt-2 flex flex-col md:flex-row justify-between items-center gap-4 bg-yellow-300 text-black rounded-lg">
                <p className="text-xl md:text-2xl font-bold text-center">
                  Estimated Height<br />: {estimatedHeight}m
                </p>
                <p className="text-xl md:text-2xl font-bold text-center">
                  Estimated Time to Arrival<br />: {tsunamiTime} {tsunamiTime === 1 ? 'minute' : 'minutes'}
                </p>
                <p className="text-sm md:text-base text-center">
                  Route calculated based on human flow data
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}