export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { images } = await request.json();
    
    // Cloudflareに設定した環境変数を読み込む
    const apiKey = env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Cloudflare環境変数に GEMINI_API_KEY が設定されていません" }), { status: 500 });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const imageParts = images.map(img => ({
      inlineData: { mimeType: img.mimeType, data: img.data }
    }));

    const payload = {
      contents: [{
        role: "user",
        parts: [
          { text: "これはMT5（MetaTrader5）のスクリーンショットです。左右に並んでいる場合や、複数の画像がある場合があります。左側（XMTradingなど）を1号機、右側（SwiftTraderなど）を2号機としてください。\n以下の情報を抽出してJSON形式で返してください。\n\n抽出項目（すべて数値のみで、単位の「円」や「%」、カンマは含めない）：\n- machine1_balance: 1号機の残高（数値のみ、例: 147434）\n- machine1_margin: 1号機の証拠金維持率（数値のみ、例: 1069.80）\n- machine2_balance: 2号機の残高（数値のみ）\n- machine2_margin: 2号機の証拠金維持率（数値のみ）\n- daily_pnl: 当日の損益合計（推測できなければ空文字でOK）\n- notes: 特記すべき異常や注意点\n\n必ずJSONのみを出力してください。" },
          ...imageParts
        ]
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    const geminiResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!geminiResponse.ok) {
        throw new Error(`Gemini API Error: ${geminiResponse.status}`);
    }

    const data = await geminiResponse.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const clean = text.replace(/```json|```/g, "").trim();
    
    return new Response(clean, {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
