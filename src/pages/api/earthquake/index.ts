import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const default_quake_time = 10.03;
  const MILLISECOND = 0.001;
  const intervalMs = 10; // 10ミリ秒ごとに更新
  const decrement = 10 * MILLISECOND; // 0.01ずつ減少
  let countdown = default_quake_time;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const intervalId = setInterval(() => {
        // JSON 形式で現在の残り時間を出力（改行区切り）
        const data = { remainingTime: countdown.toFixed(2) };
        controller.enqueue(encoder.encode(JSON.stringify(data) + "\n"));
        countdown -= decrement;
        if (countdown < 0) {
          clearInterval(intervalId);
          // 最後の値 0.00 を出力してストリームを終了
          controller.enqueue(encoder.encode(JSON.stringify({ remainingTime: "0.00" }) + "\n"));
          controller.close();
        }
      }, intervalMs);
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain", // または "application/json" など用途に合わせて変更
      "Cache-Control": "no-cache"
    }
  });
};