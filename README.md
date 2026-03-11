📈 FX運用管理アプリ (FX Trading Management App)
MT5（MetaTrader5）の運用状況を簡単に記録・管理し、Lark Baseへ自動記帳するための社内用Webアプリケーションです。
🌟 主な機能
✅ 運用ルーティン管理: 朝・夜・週次・月次のタスクをチェックリスト化。
📸 AI画像解析 (OCR): MT5のスクリーンショットをドラッグ＆ドロップするだけで、Gemini APIが「残高」や「証拠金維持率」を自動抽出。
🚦 リスク可視化: 証拠金維持率に応じてリアルタイムに警告カラー（緑/黄/赤）を表示。
🚀 Lark Base連携: 記録したデータをボタン一つでLark Base（社内データベース）へ安全に送信・自動記帳。
🛡️ 高セキュリティ: Cloudflare Pages Functions を用いることで、APIキーの隠蔽およびCORS制約の回避を実現。
🛠️ 技術スタック
Frontend: HTML5, React 18 (CDN), Tailwind CSS, Babel
Backend: Cloudflare Pages Functions (Serverless)
AI / API: Google Gemini 2.5 Flash API
Database / Integration: Lark Base (Webhook連携)
Hosting & Security: Cloudflare Pages, Cloudflare Zero Trust
📂 ディレクトリ構成
.
├── index.html            # フロントエンド（UI・画面表示）
├── functions/
│   └── api/
│       ├── ocr.js        # [バックエンド] Gemini APIを利用したOCR処理
│       └── lark.js       # [バックエンド] Lark WebhookへのPOST送信処理
└── README.md             # 本ドキュメント



🚀 デプロイ手順 (Cloudflare Pages)
このアプリケーションは Cloudflare Pages を使用してホスティングします。
1. GitHubリポジトリの作成とプッシュ
上記のディレクトリ構成通りにファイルを作成し、GitHubリポジトリにプッシュしてください。
2. Cloudflare Pages への連携
Cloudflare ダッシュボードにログインし、「Workers & Pages」>「作成」>「Pages」タブを開きます。
「Gitに接続」をクリックし、対象のGitHubリポジトリを選択します。
ビルド設定はデフォルトのままで「保存してデプロイ」をクリックします。
3. 環境変数 (シークレット) の設定
デプロイ完了後、Cloudflareダッシュボードの「設定」>「環境変数」から以下の2つを追加します。
変数名
説明
取得元
GEMINI_API_KEY
OCR処理に使用するGeminiのAPIキー
Google AI Studio
LARK_WEBHOOK_URL
Larkへデータを送信するためのURL
Lark 自動化 (Webhook)

※ 環境変数を設定した後は、変更を反映させるために**再度デプロイ（再試行）**を行ってください。
4. セキュリティ設定 (Zero Trust Access)
誰でもアクセスできる状態を防ぐため、アクセス制限をかけます。
Cloudflare ダッシュボードの左メニュー「Zero Trust」>「Access」>「Applications」を開きます。
作成したPagesのURL（例: https://xxxx.pages.dev）を保護対象として登録します。
Policy（ポリシー）を作成し、自身のメールアドレス（または指定のメールドメイン）のみが認証を通過できるように設定します。
📝 Lark側の設定 (データ受け入れ準備)
Lark Base側で以下のフィールド（列）を持つテーブルを作成し、自動化（Webhook）を設定してください。
日付 (日付)
1号機残高 (数字)
1号機維持率 (数字)
2号機残高 (数字)
2号機維持率 (数字)
本日損益 (数字)
特記事項 (テキスト)
アプリ側から「Larkへ送信」を実行し、Larkの自動化フロー上で「レコードを追加」アクションに各パラメータをマッピングして完了です
