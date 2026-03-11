# 📈 FX運用管理アプリ (FX Trading Management App)

MT5（MetaTrader5）の運用状況を簡単に記録・管理し、Lark Baseへ自動記帳するための社内用Webアプリケーションです。

## 🌟 主な機能

- **✅ 運用ルーティン管理**: 朝・夜・週次・月次のタスクをチェックリスト化。
- **📸 AI画像解析 (OCR)**: MT5のスクリーンショットをドラッグ＆ドロップするだけで、Gemini APIが「残高」や「証拠金維持率」を自動抽出。
- **🚦 リスク可視化**: 証拠金維持率に応じてリアルタイムに警告カラー（緑/黄/赤）を表示。
- **🚀 Lark Base連携**: 記録したデータをボタン一つでLark Base（社内データベース）へ安全に送信・自動記帳。
- **🛡️ 高セキュリティ**: Cloudflare Pages Functions を用いることで、APIキーの隠蔽およびCORS制約の回避を実現。

## 🛠️ 技術スタック

- **Frontend**: HTML5, React 18 (CDN), Tailwind CSS, Babel
- **Backend**: Cloudflare Pages Functions (Serverless)
- **AI / API**: Google Gemini 2.5 Flash API
- **Database / Integration**: Lark Base (Webhook連携)
- **Hosting & Security**: Cloudflare Pages, Cloudflare Zero Trust Access

## 📂 ディレクトリ構成

```text
.
├── index.html            # フロントエンド（UI・画面表示）
├── functions/
│   └── api/
│       ├── ocr.js        # [バックエンド] Gemini APIを利用したOCR処理
│       └── lark.js       # [バックエンド] Lark WebhookへのPOST送信処理
└── README.md             # 本ドキュメント
