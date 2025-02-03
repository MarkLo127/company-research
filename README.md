# 🔎 CompanyResearcher
### 由 [Exa.ai](https://exa.ai) 驅動 - AI 應用程式專用的搜尋引擎

![截圖](https://github.com/MarkLo127/company-research/blob/main/demo.jpg)

<br>

## 🎯 什麼是CompanyResearcher？

CompanyResearcher是一個免費的開源工具，可以幫助您快速深入了解任何公司。只需輸入公司的網址，該工具就會從網路上收集全面的資訊，為您提供有關組織、產品、資金、社交媒體影響力等詳細見解。

<br>

## 📊 數據來源與 API 端點
> 所有數據都是使用 Exa 強大的搜尋 API 獲取。以下每個部分都包含了在 Exa 的測試平台中直接嘗試 API 呼叫的連結。

1. **網站資訊**
   - Company網站內容 ([try API](https://dashboard.exa.ai/playground/get-contents?filters=%7B%22ids%22%3A%5B%22https%3A%2F%2Fexa.ai%22%5D%2C%22text%22%3A%22true%22%2C%22summary%22%3Atrue%7D))
   - 子頁面（關於我們、常見問題、價格、部落格）([try API](https://dashboard.exa.ai/playground/search?q=exa.ai&c=company&filters=%7B%22type%22%3A%22neural%22%2C%22text%22%3A%22true%22%2C%22numResults%22%3A1%2C%22livecrawl%22%3A%22always%22%2C%22subpages%22%3A10%2C%22subpageTarget%22%3A%5B%22about%22%2C%22pricing%22%2C%22faq%22%2C%22blog%22%5D%2C%22includeDomains%22%3A%5B%22exa.ai%22%5D%7D))

2. **LinkedIn 資料**
   - Company檔案 ([try API](https://dashboard.exa.ai/playground/search?q=https%3A%2F%2Fexa.ai%20Linkedin%20profile%3A&filters=%7B%22type%22%3A%22keyword%22%2C%22text%22%3A%22true%22%2C%22numResults%22%3A1%2C%22livecrawl%22%3A%22always%22%7D))
   - 創辦人檔案 ([try API](https://dashboard.exa.ai/playground/search?q=exa.ai%20founder%27s%20Linkedin%20page%3A&filters=%7B%22type%22%3A%22keyword%22%2C%22numResults%22%3A5%2C%22includeDomains%22%3A%5B%22linkedin.com%22%5D%7D))

3. **財務資訊**
   - 融資詳情 ([try API](https://dashboard.exa.ai/playground/search?q=exa.ai%20Funding%3A&filters=%7B%22type%22%3A%22keyword%22%2C%22text%22%3A%22true%22%2C%22numResults%22%3A1%2C%22livecrawl%22%3A%22always%22%2C%22summary%22%3A%7B%22query%22%3A%22Tell%20me%20all%20about%20the%20funding%20(and%20if%20available%2C%20the%20valuation)%20of%20this%20company%20in%20detail.%20Do%20not%20tell%20me%20about%20the%20company%2C%20just%20give%20all%20the%20funding%20information%20in%20detail.%20If%20funding%20or%20valuation%20info%20is%20not%20preset%2C%20just%20reply%20with%20one%20word%20%5C%22NO%5C%22.%22%7D%2C%22includeText%22%3A%5B%22exa.ai%22%5D%7D)))
   - Crunchbase 檔案 ([try API](https://dashboard.exa.ai/playground/search?q=exa.ai%20crunchbase%20profile%3A&filters=%7B%22type%22%3A%22keyword%22%2C%22numResults%22%3A1%2C%22includeText%22%3A%5B%22exa.ai%22%5D%2C%22includeDomains%22%3A%5B%22crunchbase.com%22%5D%7D))
   - PitchBook 檔案 ([try API](https://dashboard.exa.ai/playground/search?q=exa.ai%20pitchbook%20profile%3A&filters=%7B%22type%22%3A%22keyword%22%2C%22numResults%22%3A1%2C%22includeText%22%3A%5B%22exa.ai%22%5D%2C%22includeDomains%22%3A%5B%22pitchbook.com%22%5D%7D))
   - Tracxn 檔案 ([try API](https://dashboard.exa.ai/playground/search?q=exa.ai%20tracxn%20profile%3A&filters=%7B%22type%22%3A%22keyword%22%2C%22numResults%22%3A1%2C%22includeDomains%22%3A%5B%22tracxn.com%22%5D%2C%22includeText%22%3A%5B%22exa.ai%22%5D%7D))
   - 10K 財務報告 ([try API](https://dashboard.exa.ai/playground/search?q=airbnb.com%2010k%20financial%20report%3A&c=financial%20report&filters=%7B%22type%22%3A%22keyword%22%2C%22livecrawl%22%3A%22always%22%2C%22text%22%3A%22true%22%2C%22includeText%22%3A%5B%22airbnb.com%22%5D%7D))

4. **市場情報**
   - 新聞報導 ([try API](https://dashboard.exa.ai/playground/search?q=https%3A%2F%2Fexa.ai%20News%3A&c=news&filters=%7B%22type%22%3A%22keyword%22%2C%22text%22%3A%22true%22%2C%22livecrawl%22%3A%22always%22%2C%22includeText%22%3A%5B%22exa.ai%22%5D%7D))
   - 競爭對手分析 ([try API](https://dashboard.exa.ai/playground/search?q=web%20search%20API&filters=%7B%22type%22%3A%22neural%22%2C%22useAutoprompt%22%3Atrue%2C%22text%22%3A%22true%22%2C%22summary%22%3A%7B%22query%22%3A%22Explain%20in%20one%2Ftwo%20lines%20what%20does%20this%20company%20do%20in%20simple%20english.%20Don%27t%20use%20any%20diffcult%20words.%22%7D%2C%22livecrawl%22%3A%22always%22%2C%22excludeDomains%22%3A%5B%22exa.ai%22%5D%7D)))
   - 維基百科資訊 ([try API](https://dashboard.exa.ai/playground/search?q=openai.com%20company%20wikipedia%20page%3A&filters=%7B%22type%22%3A%22keyword%22%2C%22numResults%22%3A1%2C%22includeDomains%22%3A%5B%22wikipedia.org%22%5D%2C%22includeText%22%3A%5B%22openai.com%22%5D%2C%22text%22%3A%22true%22%7D))

5. **社群媒體影響力**
   - Twitter/X 檔案 ([try API](https://dashboard.exa.ai/playground/search?q=exa.ai%20Twitter%20(X)%20profile%3A&filters=%7B%22type%22%3A%22keyword%22%2C%22numResults%22%3A1%2C%22text%22%3A%22true%22%2C%22livecrawl%22%3A%22always%22%2C%22includeDomains%22%3A%5B%22x.com%22%2C%22twitter.com%22%5D%2C%22includeText%22%3A%5B%22exa.ai%22%5D%7D))
   - 最新推文 ([try API](https://dashboard.exa.ai/playground/search?q=from%3Aexaailabs&c=tweet&filters=%7B%22type%22%3A%22keyword%22%2C%22text%22%3A%22true%22%2C%22livecrawl%22%3A%22always%22%2C%22numResults%22%3A100%2C%22includeDomains%22%3A%5B%22twitter.com%22%2C%22x.com%22%5D%2C%22includeText%22%3A%5B%22exaailabs%22%5D%7D))
   - YouTube 影片 ([try API](https://dashboard.exa.ai/playground/search?q=exa.ai&filters=%7B%22type%22%3A%22keyword%22%2C%22includeDomains%22%3A%5B%22youtube.com%22%5D%2C%22numResults%22%3A10%2C%22includeText%22%3A%5B%22exa.ai%22%5D%7D))
   - TikTok 動態 ([try API](https://dashboard.exa.ai/playground/search?q=exa.ai%20Tiktok%3A&filters=%7B%22type%22%3A%22keyword%22%2C%22numResults%22%3A1%2C%22includeDomains%22%3A%5B%22tiktok.com%22%5D%2C%22includeText%22%3A%5B%22exa.ai%22%5D%7D))
   - Reddit 討論 ([try API](https://dashboard.exa.ai/playground/search?q=exa.ai&filters=%7B%22type%22%3A%22keyword%22%2C%22includeDomains%22%3A%5B%22reddit.com%22%5D%2C%22includeText%22%3A%5B%22exa.ai%22%5D%7D))
   - GitHub 檔案 ([try API](https://dashboard.exa.ai/playground/search?q=exa.ai%20Github%3A&filters=%7B%22type%22%3A%22keyword%22%2C%22numResults%22%3A1%2C%22includeDomains%22%3A%5B%22github.com%22%5D%7D))

<br>

## 💻 技術架構
- **搜尋引擎**: [Exa.ai](https://exa.ai) - 為 AI 應用程式最佳化的網路搜尋 API
- **前端**: [Next.js](https://nextjs.org/docs) 搭配 App Router、[TailwindCSS](https://tailwindcss.com)、TypeScript
- **AI 整合**: [Vercel AI SDK](https://sdk.vercel.ai/docs/ai-sdk-core)
- **主機託管**: [Vercel](https://vercel.com/)

<br>

## 🚀 開始使用

### 前置需求
- Node.js
- Exa.ai API 金鑰
- Anthropic API 金鑰
- （選用）YouTube API 金鑰
- （選用）GitHub 權杖

### 安裝步驟

1. 複製專案
```bash
git clone https://github.com/MarkLo127/company-research.git
cd company-research
```

2. 安裝相依套件
```bash
npm install
# 或
yarn install
```

3. 按照下方說明設定環境變數

4. 啟動開發伺服器
```bash
npm run dev
# 或
yarn dev
```

5. 在瀏覽器中開啟 http://localhost:3000

<br>

## 🔑 API 金鑰與環境設定

### 必要的 API 金鑰
* **Exa API 金鑰**: 從 [Exa 控制台](https://dashboard.exa.ai/api-keys) 取得
* **Anthropic API 金鑰**: 從 [Anthropic 控制台](https://console.anthropic.com/) 取得

### 選用的 API 金鑰（用於額外功能）
* **YouTube API 金鑰**: 從 [Google Cloud 控制台](https://console.cloud.google.com/apis/credentials) 取得（用於擷取 YouTube 影片）
* **GitHub 權杖**: 從 [GitHub 設定](https://github.com/settings/tokens) 取得（用於 GitHub 儲存庫資料）

> 注意：應用程式可以在沒有選用 API 金鑰的情況下運行。YouTube 和 GitHub 功能可以透過註解相關程式碼段落來停用。

### 環境設定

在專案根目錄建立 `.env.local` 檔案，內容如下：

```env
# 必要
EXA_API_KEY=exa_api_key
ANTHROPIC_API_KEY=anthropic_api_key
# company-research
