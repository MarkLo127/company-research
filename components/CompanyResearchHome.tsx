// CompanyResearchHome.tsx

"use client";
import { useState, FormEvent } from "react";
import LinkedInDisplay from "./linkedin/LinkedinDisplay";
import CompetitorsDisplay from "./competitors/CompetitorsDisplay";
import NewsDisplay from "./news/NewsDisplay";
import CompanySummary from "./companycontent/CompanySummar";
import FundingDisplay from "./companycontent/FundingDisplay";
import ProfileDisplay from "./twitter/TwitterProfileDisplay";
import RecentTweetsDisplay from "./twitter/RecentTweetsDisplay";
import YoutubeVideosDisplay from "./youtube/YoutubeVideosDisplay";
import RedditDisplay from "./reddit/RedditDisplay";
import GitHubDisplay from "./github/GitHubDisplay";
import FinancialReportDisplay from './financial/FinancialReportDisplay';
import TikTokDisplay from './tiktok/TikTokDisplay';
import WikipediaDisplay from './wikipedia/WikipediaDisplay';
import CrunchbaseDisplay from './crunchbase/CrunchbaseDisplay';
import PitchBookDisplay from './pitchbook/PitchBookDisplay';
import TracxnDisplay from "./tracxn/TracxnDisplay";
import FoundersDisplay from "./founders/FoundersDisplay";
import {
  LinkedInSkeleton,
  YouTubeSkeleton,
  TikTokSkeleton,
  GitHubSkeleton,
  RedditSkeleton,
  TwitterSkeleton,
  CompetitorsSkeleton,
  NewsSkeleton,
  FoundersSkeleton,
  WikipediaSkeleton,
  FinancialSkeleton,
  FundingSkeleton,
  CompanySummarySkeleton,
} from "./skeletons/ResearchSkeletons";
import CompanyMindMap from './mindmap/CompanyMindMap';
import Link from "next/link";

interface LinkedInData {
  text: string;
  url: string;
  image: string;
  title: string;
  [key: string]: any;
}

interface Video {
  id: string;
  url: string;
  title: string;
  author: string;
  [key: string]: any;
}

interface RedditPost {
  url: string;
  title: string;
  [key: string]: any;
}

interface Tweet {
  id: string;
  url: string;
  title: string;
  author: string;
  [key: string]: any;
}

interface Competitor {
  title: string;
  url: string;
  summary: string;
  [key: string]: any;
}

interface NewsItem {
  url: string;
  title: string;
  image: string;
  [key: string]: any;
}

interface Founder {
  url: string;
  title: string;
  [key: string]: any;
}

// Add new interface for company map data
interface CompanyMapData {
  companyName: string;
  rootNode: {
    title: string;
    children: Array<{
      title: string;
      description: string;
      children: Array<{
        title: string;
        description: string;
      }>;
    }>;
  };
}

export default function CompanyResearcher() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [companyUrl, setCompanyUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [linkedinData, setLinkedinData] = useState<LinkedInData | null>(null);
  const [competitors, setCompetitors] = useState<Competitor[] | null>(null);
  const [news, setNews] = useState<NewsItem[] | null>(null);
  const [companySummary, setCompanySummary] = useState<any>(null);
  const [twitterProfileText, setTwitterProfileText] = useState<any>(null);
  const [recentTweets, setRecentTweets] = useState<Tweet[] | null>(null);
  const [youtubeVideos, setYoutubeVideos] = useState<Video[] | null>(null);
  const [redditPosts, setRedditPosts] = useState<RedditPost[] | null>(null);
  const [githubUrl, setGithubUrl] = useState<string | null>(null);
  const [fundingData, setFundingData] = useState<any>(null);
  const [financialReport, setFinancialReport] = useState<any>(null);
  const [tiktokData, setTiktokData] = useState<any>(null);
  const [wikipediaData, setWikipediaData] = useState<any>(null);
  const [crunchbaseData, setCrunchbaseData] = useState<any>(null);
  const [pitchbookData, setPitchbookData] = useState<any>(null);
  const [tracxnData, setTracxnData] = useState<any>(null);
  const [founders, setFounders] = useState<Founder[] | null>(null);
  const [companyMap, setCompanyMap] = useState<CompanyMapData | null>(null);

  // Function to check if a string is a valid URL
  const isValidUrl = (url: string): boolean => {
    try {
      // Remove any whitespace
      url = url.trim();
      
      // Check if it's just a single word without dots
      if (!url.includes('.')) {
        return false;
      }

      // Add protocol if missing
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      const urlObj = new URL(url);
      // Check if hostname has at least one dot and no spaces
      return urlObj.hostname.includes('.') && !urlObj.hostname.includes(' ');
    } catch {
      return false;
    }
  };

  // Function to validate and extract domain name from URL
  const extractDomain = (url: string): string | null => {
    try {
      if (!isValidUrl(url)) {
        return null;
      }

      let cleanUrl = url.trim().toLowerCase();
      
      // Add protocol if missing
      if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
        cleanUrl = 'https://' + cleanUrl;
      }

      // Parse URL
      const parsedUrl = new URL(cleanUrl);
      
      // Get domain without www.
      const domain = parsedUrl.hostname.replace(/^www\./, '');
      
      // Additional validation: domain should have at least one dot and no spaces
      if (!domain.includes('.') || domain.includes(' ')) {
        return null;
      }

      return domain;
    } catch (error) {
      return null;
    }
  };

  // LinkedIn API fetch function
  const fetchLinkedInData = async (url: string) => {
    try {
      const response = await fetch('/api/scrapelinkedin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error('LinkedIn 研究失敗');
      }

      const data = await response.json();
      return data.results[0];
    } catch (error) {
      console.error('Error fetching LinkedIn data:', error);
      throw error;
    }
  };

  // Function to scrape main page
  const scrapeMainPage = async (url: string) => {
    try {
      const response = await fetch('/api/scrapewebsiteurl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error('無法獲取主網站資料');
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error scraping main page:', error);
      throw error;
    }
  };

  // Function to fetch company details (summary and map)
  const fetchCompanyDetails = async (mainPageData: any, url: string) => {
    try {
      // First fetch subpages
      const subpagesResponse = await fetch('/api/scrapewebsitesubpages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!subpagesResponse.ok) {
        throw new Error('無法獲取子頁面資料');
      }

      const subpagesData = await subpagesResponse.json();

      // Then use both main page and subpages data
      await Promise.all([
        fetchCompanySummary(subpagesData.results, mainPageData, url),
        fetchCompanyMap(mainPageData, url)
      ]);
    } catch (error) {
      console.error('Error fetching company details:', error);
      throw error;
    }
  };

  // Update fetchCompetitors to only use main page data
  const fetchCompetitors = async (summary: string, url: string) => {
    try {
      const response = await fetch('/api/findcompetitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          websiteurl: url, 
          summaryText: summary 
        }),
      });

      if (!response.ok) {
        throw new Error('無法獲取競爭對手資料');
      }

      const data = await response.json();
      return data.results.map((result: any) => ({
        title: result.title,
        url: result.url,
        summary: result.summary,
      }));
    } catch (error) {
      console.error('Error fetching competitors:', error);
      throw error;
    }
  };

  // New function to fetch news
  const fetchNews = async (url: string) => {
    try {
      const response = await fetch('/api/findnews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error('新聞研究失敗');
      }

      const data = await response.json();
      return data.results.filter((item: any) => item.title).slice(0, 6);
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  };

  // Separate function for fetching company summary
  const fetchCompanySummary = async (subpages: any, mainpage: any, websiteurl: string) => {
    try {
      const response = await fetch('/api/companysummary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subpages,
          mainpage,
          websiteurl
        }),
      });

      if (!response.ok) {
        throw new Error('無法獲取Company摘要');
      }

      const data = await response.json();
      setCompanySummary(data.result);
    } catch (error) {
      console.error('Error fetching company summary:', error);
      setErrors(prev => ({ ...prev, summary: error instanceof Error ? error.message : 'Company摘要發生錯誤' }));
    }
  };

  // New function for fetching company map
  const fetchCompanyMap = async (mainpage: any, websiteurl: string) => {
    try {
      const response = await fetch('/api/companymap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mainpage,
          websiteurl
        }),
      });

      if (!response.ok) {
        throw new Error('無法獲取Company地圖');
      }

      const data = await response.json();
      setCompanyMap(data.result);
    } catch (error) {
      console.error('Error fetching company map:', error);
      setErrors(prev => ({ ...prev, map: error instanceof Error ? error.message : 'Company地圖發生錯誤' }));
    }
  };

  // Recent tweets fetch function
  const fetchRecentTweets = async (username: string) => {
    try {
      const response = await fetch('/api/scraperecenttweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error('無法獲取最近推文');
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching recent tweets:', error);
      throw error;
    }
  };

  // Twitter profile fetch function
  const fetchTwitterProfile = async (url: string) => {
    try {
      const response = await fetch('/api/scrapetwitterprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error('無法獲取 Twitter 個人資料');
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        // Fetch tweets separately without waiting
        if (result.author) {
          fetchRecentTweets(result.author)
            .then(tweets => setRecentTweets(tweets))
            .catch(error => console.error('Error fetching recent tweets:', error));
        }
        return {
          text: result.text,
          username: result.author
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching Twitter profile:', error);
      throw error;
    }
  };
  // Youtube videos fetch function
  const fetchYoutubeVideos = async (url: string) => {
    try {
      const response = await fetch('/api/fetchyoutubevideos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteurl: url }),
      });
  
      if (!response.ok) {
        throw new Error('無法獲取 YouTube 影片');
      }
  
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      throw error;
    }
  };

  // Reddit posts fetch function
  const fetchRedditPosts = async (url: string) => {
    try {
      const response = await fetch('/api/scrapereddit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error('無法獲取 Reddit 貼文');
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching Reddit posts:', error);
      throw error;
    }
  };

  // GitHub URL fetch function
  const fetchGitHubUrl = async (url: string) => {
    try {
      const response = await fetch('/api/fetchgithuburl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error('無法獲取 GitHub 網址');
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].url;
      }
      return null;
    } catch (error) {
      console.error('Error fetching GitHub URL:', error);
      throw error;
    }
  };

  // Funding API fetch function
  const fetchFunding = async (url: string) => {
    try {
      const response = await fetch('/api/fetchfunding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error('無法獲取募資資料');
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0];
      }
      return null;
    } catch (error) {
      console.error('Error fetching funding data:', error);
      throw error;
    }
  };

  // Financial report fetch function
  const fetchFinancialReport = async (url: string) => {
    try {
      const response = await fetch('/api/fetchfinancialreport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error('無法獲取財務報告');
      }

      const data = await response.json();
      return data.results || null;
    } catch (error) {
      console.error('Error fetching financial report:', error);
      throw error;
    }
  };

  // TikTok fetch function
  const fetchTikTokProfile = async (url: string) => {
    try {
      const response = await fetch('/api/fetchtiktok', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error('無法獲取 TikTok 個人資料');
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0];
      }
      return null;
    } catch (error) {
      console.error('Error fetching TikTok profile:', error);
      throw error;
    }
  };

  // Wikipedia fetch function
  const fetchWikipedia = async (url: string) => {
    try {
      const response = await fetch('/api/fetchwikipedia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error('無法獲取維基百科資料');
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return {
          text: data.results[0].text,
          url: data.results[0].url
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching Wikipedia data:', error);
      throw error;
    }
  };

  // Crunchbase fetch function
  const fetchCrunchbase = async (url: string) => {
    try {
      const response = await fetch('/api/fetchcrunchbase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error('無法獲取 Crunchbase 資料');
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0];
      }
      return null;
    } catch (error) {
      console.error('Error fetching Crunchbase data:', error);
      throw error;
    }
  };

  // PitchBook fetch function
  const fetchPitchbook = async (url: string) => {
    try {
      const response = await fetch('/api/fetchpitchbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error('無法獲取 PitchBook 資料');
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0];
      }
      return null;
    } catch (error) {
      console.error('Error fetching PitchBook data:', error);
      throw error;
    }
  };

  // Tracxn fetch function
  const fetchTracxn = async (url: string) => {
    try {
      const response = await fetch('/api/fetchtracxn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error('無法獲取創辦人資料');
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0];
      }
      return null;
    } catch (error) {
      console.error('Error fetching Tracxn data:', error);
      throw error;
    }
  };

  // Founders fetch function
  const fetchFounders = async (url: string) => {
    try {
      const response = await fetch('/api/fetchfounders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error('無法獲取 founders');
      }

      const data = await response.json();
      // Filter out company and post URLs, only keep individual profiles
      return data.results.filter((result: any) => 
        !result.url.includes('/company/') && 
        !result.url.includes('/post/') &&
        result.url.includes('/in/')
      );
    } catch (error) {
      console.error('Error fetching founders:', error);
      throw error;
    }
  };

  // Add helper function to process LinkedIn text
  const processLinkedInText = (data: LinkedInData) => {
    const extract = (marker: string): string => {
      const index = data.text.indexOf(marker);
      if (index === -1) return '';
      
      const start = index + marker.length;
      const possibleEndMarkers = ['Industry', 'Company size', 'Headquarters', '\n\n'];
      let end = data.text.length;
      
      for (const endMarker of possibleEndMarkers) {
        const nextIndex = data.text.indexOf(endMarker, start);
        if (nextIndex !== -1 && nextIndex < end && nextIndex > start) {
          end = nextIndex;
        }
      }
      
      return data.text.substring(start, end).trim();
    };

    return {
      companySize: extract('Company size')
    };
  };

  // Add helper function to parse company size
  const parseCompanySize = (size: string): number => {
    if (!size) return 0;
    // Extract first number from string (e.g. "1,001-5,000" -> 1001)
    const match = size.match(/(\d+(?:,\d+)*)/);
    if (!match) return 0;
    return parseInt(match[1].replace(/,/g, ''));
  };

  // Main Research Function
  const handleResearch = async (e: FormEvent) => {
    e.preventDefault();

    if (!companyUrl) {
      setErrors({ form: "請輸入Company網址" });
      return;
    }

    const domainName = extractDomain(companyUrl);
    
    if (!domainName) {
      setErrors({ form: "請輸入有效的Company網址（'example.com'）" });
      return;
    }

    setIsGenerating(true);
    setErrors({});

    // Reset all states to null
    setLinkedinData(null);
    setCompetitors(null);
    setNews(null);
    setCompanySummary(null);
    setTwitterProfileText(null);
    setRecentTweets(null);
    setYoutubeVideos(null);
    setRedditPosts(null);
    setGithubUrl(null);
    setFundingData(null);
    setFinancialReport(null);
    setTiktokData(null);
    setWikipediaData(null);
    setCrunchbaseData(null);
    setPitchbookData(null);
    setTracxnData(null);
    setFounders(null);
    setCompanyMap(null);

    try {
      // Run all API calls in parallel
      const promises = [
        // Main page scraping and dependent calls
        (async () => {
          const mainPageData = await scrapeMainPage(domainName);
          if (mainPageData && mainPageData[0]?.summary) {
            await Promise.all([
              fetchCompanyDetails(mainPageData, domainName)
                .catch((error) => setErrors(prev => ({ ...prev, companyDetails: error instanceof Error ? error.message : 'Company詳細資料發生錯誤' }))),
              fetchCompetitors(mainPageData[0].summary, domainName)
                .then((data) => setCompetitors(data))
                .catch((error) => setErrors(prev => ({ ...prev, competitors: error instanceof Error ? error.message : '競爭對手資料發生錯誤' })))
            ]);
          }
        })().catch((error) => setErrors(prev => ({ ...prev, websiteData: error instanceof Error ? error.message : '網站資料發生錯誤' }))),

        // Independent API calls that don't need main page data
        fetchLinkedInData(domainName)
          .then((data) => setLinkedinData(data))
          .catch((error) => setErrors(prev => ({ ...prev, linkedin: error instanceof Error ? error.message : 'LinkedIn 發生錯誤' }))),

        fetchNews(domainName)
          .then((data) => setNews(data))
          .catch((error) => setErrors(prev => ({ ...prev, news: error instanceof Error ? error.message : '新聞發生錯誤' }))),

        fetchTwitterProfile(domainName)
          .then((data) => setTwitterProfileText(data))
          .catch((error) => setErrors(prev => ({ ...prev, twitter: error instanceof Error ? error.message : 'Twitter 個人資料發生錯誤' }))),

        fetchYoutubeVideos(domainName)
          .then((data) => setYoutubeVideos(data))
          .catch((error) => setErrors(prev => ({ ...prev, youtube: error instanceof Error ? error.message : 'YouTube 影片發生錯誤' }))),

        fetchRedditPosts(domainName)
          .then((data) => setRedditPosts(data))
          .catch((error) => setErrors(prev => ({ ...prev, reddit: error instanceof Error ? error.message : 'Reddit 貼文發生錯誤' }))),

        fetchGitHubUrl(domainName)
          .then((url) => setGithubUrl(url))
          .catch((error) => setErrors(prev => ({ ...prev, github: error instanceof Error ? error.message : 'GitHub 發生錯誤' }))),

        fetchFunding(domainName)
          .then((data) => setFundingData(data))
          .catch((error) => setErrors(prev => ({ ...prev, funding: error instanceof Error ? error.message : '募資資料發生錯誤' }))),

        fetchFinancialReport(domainName)
          .then((data) => setFinancialReport(data))
          .catch((error) => setErrors(prev => ({ ...prev, financial: error instanceof Error ? error.message : '財務報告發生錯誤' }))),

        fetchTikTokProfile(domainName)
          .then((data) => setTiktokData(data))
          .catch((error) => setErrors(prev => ({ ...prev, tiktok: error instanceof Error ? error.message : 'TikTok 個人資料發生錯誤' }))),

        fetchWikipedia(domainName)
          .then((data) => setWikipediaData(data))
          .catch((error) => setErrors(prev => ({ ...prev, wikipedia: error instanceof Error ? error.message : '維基百科資料發生錯誤' }))),

        fetchCrunchbase(domainName)
          .then((data) => setCrunchbaseData(data))
          .catch((error) => setErrors(prev => ({ ...prev, crunchbase: error instanceof Error ? error.message : 'Crunchbase 資料發生錯誤' }))),

        fetchPitchbook(domainName)
          .then((data) => setPitchbookData(data))
          .catch((error) => setErrors(prev => ({ ...prev, pitchbook: error instanceof Error ? error.message : 'PitchBook 資料發生錯誤' }))),

        fetchTracxn(domainName)
          .then((data) => setTracxnData(data))
          .catch((error) => setErrors(prev => ({ ...prev, tracxn: error instanceof Error ? error.message : 'Tracxn 資料發生錯誤' }))),

        fetchFounders(domainName)
          .then((data) => setFounders(data))
          .catch((error) => setErrors(prev => ({ ...prev, founders: error instanceof Error ? error.message : '創辦人資料發生錯誤' })))
      ];

      await Promise.allSettled(promises);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-5xl p-6 z-10 mb-20 mt-6">
      <h1 className="md:text-6xl text-4xl pb-5 font-medium opacity-0 animate-fade-up [animation-delay:200ms]">
        <span className="text-brand-default">Company</span>
        Researcher
      </h1>

      <p className="text-black mb-12 opacity-0 animate-fade-up [animation-delay:400ms]">
        輸入網址以獲取詳細的研究資訊
      </p>

      <form onSubmit={handleResearch} className="space-y-6 mb-20">
        <input
          value={companyUrl}
          onChange={(e) => setCompanyUrl(e.target.value)}
          placeholder="輸入網址（例如：example.com）"
          className="w-full bg-white p-3 border box-border outline-none rounded-sm ring-2 ring-brand-default resize-none opacity-0 animate-fade-up [animation-delay:600ms]"
        />
        <button
          type="submit"
          className={`w-full text-white font-semibold px-2 py-2 rounded-sm transition-opacity opacity-0 animate-fade-up [animation-delay:800ms] min-h-[50px] ${
            isGenerating ? 'bg-gray-400' : 'bg-brand-default ring-2 ring-brand-default'
          } transition-colors`}
          disabled={isGenerating}
        >
          {isGenerating ? '研究中...' : '開始研究'}
        </button>

        <div className="flex items-center justify-end gap-2 sm:gap-3 pt-4 opacity-0 animate-fade-up [animation-delay:1000ms]">
          <span className="text-gray-800">Powered by</span>
          <a
          href="https://exa.ai" 
          target="_blank" 
          rel="noopener origin"
          className="hover:opacity-80 transition-opacity"
          >
            <img src="/exa_logo.png" alt="Exa Logo" className="h-6 sm:h-7 object-contain" />
          </a>
        </div>
      </form>

      {Object.entries(errors).map(([key, message]) => (
        <div key={key} className="mt-4 mb-4 p-3 bg-red-100 border border-red-400 text-red-700">
          {message}
        </div>
      ))}

      <div className="space-y-12">
        {/* Company Overview Section */}
        
          <div className="space-y-16">
          {(linkedinData || companySummary || founders || financialReport || 
          fundingData || crunchbaseData || pitchbookData || tracxnData || 
          wikipediaData) && (
            <div className="flex items-center">
              <h2 className="text-4xl font-medium">Company概覽</h2>
            </div>
            )}

            {/* {isGenerating && linkedinData === null ? (
              <LinkedInSkeleton />
            ) : linkedinData && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <LinkedInDisplay data={linkedinData} />
              </div>
            )} */}

            {isGenerating && founders === null ? (
              <FoundersSkeleton />
            ) : founders && founders.length > 0 && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <FoundersDisplay founders={founders} />
              </div>
            )}

            {linkedinData && parseCompanySize(processLinkedInText(linkedinData).companySize) >= 1000 && (
              isGenerating && financialReport === null ? (
                <FinancialSkeleton />
              ) : financialReport && (
                <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                  <FinancialReportDisplay report={financialReport} />
                </div>
              )
            )}

            <div className="space-y-6">
              {isGenerating && fundingData === null ? (
                <FundingSkeleton />
              ) : fundingData && (
                <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                  <FundingDisplay fundingData={fundingData} />
                </div>
              )}

              {isGenerating && crunchbaseData === null ? (
                <FundingSkeleton />
              ) : crunchbaseData && (
                <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                  <CrunchbaseDisplay data={crunchbaseData} />
                </div>
              )}

              {isGenerating && pitchbookData === null ? (
                <FundingSkeleton />
              ) : pitchbookData && (
                <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                  <PitchBookDisplay data={pitchbookData} />
                </div>
              )}

              {isGenerating && tracxnData === null ? (
                <FundingSkeleton />
              ) : tracxnData && (
                <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                  <TracxnDisplay data={tracxnData} />
                </div>
              )}
            </div>

            {isGenerating && wikipediaData === null ? (
              <WikipediaSkeleton />
            ) : wikipediaData && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <WikipediaDisplay data={wikipediaData} websiteUrl={companyUrl} />
              </div>
            )}

            {isGenerating && competitors === null ? (
              <CompetitorsSkeleton />
            ) : competitors && competitors.length > 0 && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <CompetitorsDisplay competitors={competitors} />
              </div>
            )}

            {isGenerating && news === null ? (
              <NewsSkeleton />
            ) : news && news.length > 0 && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <NewsDisplay news={news} />
              </div>
            )}
          </div>
      

        {/* Company Socials Section */}
          <div className="space-y-16 pt-12">

          {(twitterProfileText || youtubeVideos || tiktokData || 
          redditPosts || githubUrl) && (
            <div className="flex items-center">
              <h2 className="text-4xl font-medium">Company社群</h2>
            </div>
            )}

            {isGenerating && twitterProfileText === null ? (
              <TwitterSkeleton />
            ) : twitterProfileText && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <ProfileDisplay rawText={twitterProfileText.text} username={twitterProfileText.username} />
                {recentTweets && <RecentTweetsDisplay tweets={recentTweets} />}
              </div>
            )}

            {isGenerating && youtubeVideos === null ? (
              <YouTubeSkeleton />
            ) : youtubeVideos && youtubeVideos.length > 0 && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <YoutubeVideosDisplay videos={youtubeVideos} />
              </div>
            )}

            {isGenerating && redditPosts === null ? (
              <RedditSkeleton />
            ) : redditPosts && redditPosts.length > 0 && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <RedditDisplay posts={redditPosts} />
              </div>
            )}

            {isGenerating && tiktokData === null ? (
              <TikTokSkeleton />
            ) : tiktokData && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <TikTokDisplay data={tiktokData} />
              </div>
            )}

            {isGenerating && githubUrl === null ? (
              <GitHubSkeleton />
            ) : githubUrl && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <GitHubDisplay githubUrl={githubUrl} />
              </div>
            )}
          </div>
        

        {/* Summary and Mind Map Section */}
        {(isGenerating || companySummary) && (
              <div className="space-y-8">
                <div className="flex items-center">
                  <h2 className="text-3xl font-medium mt-6">摘要與思維導圖</h2>
                </div>

                {isGenerating && companySummary === null ? (
                  <CompanySummarySkeleton />
                ) : companySummary && (
                  <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                    <CompanySummary summary={companySummary} />
                  </div>
                )}

                {isGenerating && companyMap === null ? (
                  <div className="hidden sm:block animate-pulse">
                    <div className="h-64 bg-secondary-darkest rounded-lg flex items-center justify-center">
                      <p className="text-gray-400 text-md">載入中...</p>
                    </div>
                  </div>
                ) : companyMap && (
                  <div className="hidden sm:block opacity-0 animate-fade-up [animation-delay:200ms]">
                    <CompanyMindMap data={companyMap} />
                  </div>
                )}
              </div>
            )}

      </div>
      <div className="flex-grow"></div>
        <footer className="fixed bottom-0 left-0 right-0 w-full py-4 bg-secondary-default border-t opacity-0 animate-fade-up [animation-delay:1200ms]">
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:gap-6 px-4">
            <Link 
              href="https://github.com/exa-labs/company-researcher"
              target="_blank"
              rel="origin"
              className="text-gray-600 hover:underline cursor-pointer text-center"
            >
              在此複製此開源專案
            </Link>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <Link 
                href="https://exa.ai" 
                target="_blank" 
                rel="origin"
                className="hover:opacity-80 transition-opacity hidden sm:inline"
              >
            <div className="flex items-center gap-2">
              <span className="text-gray-600 hover:text-gray-600 hover:underline">技術支援</span>
                <img src="/exa_logo.png" alt="Exa Logo" className="h-5 object-contain" />
            </div>
            </Link>
          </div>
        </footer>
    </div>  
  );
}