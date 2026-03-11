export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const payload = await request.json();
    
    // Cloudflareに設定した環境変数を読み込む
    const webhookUrl = env.LARK_WEBHOOK_URL;
    
    if (!webhookUrl) {
      return new Response(JSON.stringify({ error: "Cloudflare環境変数に LARK_WEBHOOK_URL が設定されていません" }), { status: 500 });
    }

    // Lark (AnyCross) のWebhookへサーバー側からPOST通信を行う（CORSエラーを回避）
    const larkResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!larkResponse.ok) {
        throw new Error(`Lark API error: ${larkResponse.status}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
