// LinkedInDisplay.tsx
import { Building2, Globe, MapPin, Users, Link as LinkIcon, UserCircle2, Users2 } from 'lucide-react';
import Image from 'next/image';

interface LinkedInData {
  text: string;
  url: string;
  image: string;
  title: string;
}

interface ProcessedData {
  name: string;
  description: string;
  industry: string;
  companySize: string;
  headquarters: string;
  type: string;
  website?: string | undefined;
  linkedinUrl: string;
  logo: string;
  specialties: string[];
  followers?: string;
}

function processLinkedInText(data: LinkedInData): ProcessedData {
  const extract = (marker: string): string => {
    const index = data.text.indexOf(marker);
    if (index === -1) return '';
    
    // Find the start of the actual content after the marker
    const start = index + marker.length;
    
    // Look for the next marker or section
    const possibleEndMarkers = ['Industry', 'Company size', 'Headquarters', 'Type', 'Locations', 'Employees at', 'Updates', '\n\n'];
    let end = data.text.length;
    
    for (const endMarker of possibleEndMarkers) {
      const nextIndex = data.text.indexOf(endMarker, start);
      if (nextIndex !== -1 && nextIndex < end && nextIndex > start) {
        end = nextIndex;
      }
    }
    
    return data.text.substring(start, end).trim();
  };

  // Extract followers using regex
  const followersMatch = data.text.match(/(\d+(?:,\d+)*)\s+followers/);
  const followers = followersMatch ? followersMatch[1] : undefined;

  // Extract description from "About us" section
  const aboutIndex = data.text.indexOf('About us');
  const description = aboutIndex !== -1
    ? extract('About us').split('\n')[0].trim()
    : '';

  // Extract other fields
  const industry = extract('Industry');
  const companySize = extract('Company size');
  const headquarters = extract('Headquarters');
  const type = extract('Type');
  
  // Get company name from title or the beginning of the text
  const name = data.title.replace(/\s*(-|\|)\s*LinkedIn\s*$/, '').trim();

  // For now, we'll skip specialties as they're not clearly marked in the new format
  const specialties: string[] = [];

  return {
    name,
    description,
    industry,
    companySize,
    headquarters,
    type,
    linkedinUrl: data.url,
    specialties,
    logo: data.image,
    website: undefined,
    followers
  };
}

export default function LinkedInDisplay({ data }: { data: LinkedInData }) {
  const processedData = processLinkedInText(data);

  return (
    <div className="bg-white p-6 md:p-8 w-full mx-auto border shadow-sm">
      <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
        {processedData.logo && (
          <div className="w-20 h-20 md:w-24 md:h-24 relative flex-shrink-0 mx-0">
            <Image
              src={processedData.logo}
              alt={`${processedData.name} 標誌`}
              fill
              className="object-contain"
            />
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-2xl font-medium mb-2">{processedData.name}</h1>
          <p className="text-gray-600 mb-4 line-clamp-3">{processedData.description}</p>

          <div className="flex flex-wrap gap-4">
            {processedData.followers && (
              <div className="flex items-center gap-2">
                <Users2 className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{processedData.followers} 位追蹤者</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {processedData.industry && (
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-gray-900">產業</div>
              <div className="text-gray-600">{processedData.industry}</div>
            </div>
          </div>
        )}

        {processedData.companySize && (
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-gray-900">公司規模</div>
              <div className="text-gray-600">{processedData.companySize}</div>
            </div>
          </div>
        )}

        {processedData.headquarters && (
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-gray-900">總部</div>
              <div className="text-gray-600">{processedData.headquarters}</div>
            </div>
          </div>
        )}

        {processedData.type && (
          <div className="flex items-start gap-3">
            <UserCircle2 className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-gray-900">公司類型</div>
              <div className="text-gray-600">{processedData.type}</div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t">
        <a
          href={processedData.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <LinkIcon className="w-4 h-4" />
          <span>在 LinkedIn 上查看完整資料</span>
        </a>
      </div>
    </div>
  );
}

const InfoItem = ({
  icon,
  label,
  value,
  isLink = false,
  maxLines
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isLink?: boolean;
  maxLines?: number;
}) => (
  <div className="flex items-start gap-3">
    <div className="text-blue-600 mt-1">{icon}</div>
    <div>
      <h3 className="font-medium text-gray-700">{label}</h3>

      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all"
        >
          {value}
        </a>
      ) : (
        <p className={`text-gray-600 break-words ${maxLines ? 'line-clamp-' + maxLines : ''}`}>{value}</p>
      )}

    </div>
  </div>
);