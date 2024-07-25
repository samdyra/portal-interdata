import s from './index.module.scss';
import SatteliteIcon from '../../../shared/assets/svg/sattelite';
import HelpIcon from '../../../shared/assets/svg/help';
import SearchIcon from '../../../shared/assets/svg/search';
import useQueryBaseMap from '../../hooks/useQueryBaseMap';
import StreetIcon from '../../../shared/assets/svg/street';
import React, { useState, useEffect, ChangeEvent } from 'react';

const Dropdown = () => {
  return (
    <div className={s.dropdown}>
      <button className={s.dropbtn}>
        Download Data
        <i className="fa fa-caret-down"></i>
      </button>
      <div className={s.dropdowncontent}>
        <a href="#">Polygon</a>
        <a href="#">Contour Lines</a>
        <a href="#">Map Layout</a>
      </div>
    </div>
  );
};

const BasemapSwitch = () => {
  const { switchBaseMap } = useQueryBaseMap();

  return (
    <div className={s.container}>
      <p>Basemap Mode</p>
      <StreetIcon />
      <label className={`${s.formswitch} ml-2`}>
        <input onClick={switchBaseMap} type="checkbox" />
        <i></i>
      </label>
      <SatteliteIcon />
    </div>
  );
};

interface ResultModalProps {
  result: any;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ result, onClose }) => {
  if (!result) return null;

  const source = result._source;

  console.log(source);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-[500]" onClick={onClose}>
      <div className="relative top-20 mx-auto p-5 border w-3/4 max-w-3xl shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">{source.resourceTitleObject.default}</h3>
          
          <div className="mt-2 text-sm text-gray-500">
            <p className="font-semibold">Abstract:</p>
            <p className="mb-2">{source.resourceAbstractObject?.default}</p>

            <p className="font-semibold">Resource Type:</p>
            <p className="mb-2">{source.resourceType.join(', ')}</p>

            <p className="font-semibold">Topics:</p>
            <p className="mb-2">{source.cl_topic?.map((topic: any) => topic.default).join(', ')}</p>

            <p className="font-semibold">Keywords:</p>
            <p className="mb-2">{source.tag?.map((tag: any) => tag.default).join(', ')}</p>

            <p className="font-semibold">Temporal Extent:</p>
            <p className="mb-2">
              {source.resourceTemporalExtentDetails?.[0]?.start?.date} to {source.resourceTemporalExtentDetails?.[0]?.end?.date}
            </p>

            <p className="font-semibold">Spatial Resolution:</p>
            <p className="mb-2">{source.resolutionDistance?.[0]}</p>

            <p className="font-semibold">License:</p>
            <p className="mb-2">{source.licenseObject?.[0]?.default}</p>

            <p className="font-semibold">Organizations:</p>
            <ul className="list-disc pl-5 mb-2">
              {source.OrgForResourceObject?.map((org: any, index: number) => (
                <li key={index}>{org.default}</li>
              ))}
            </ul>

            <p className="font-semibold">Contacts:</p>
            <ul className="list-disc pl-5 mb-2">
              {source.contactForResource?.map((contact: any, index: number) => (
                <li key={index}>
                  {contact.individual} ({contact.role}) - {contact.organisationObject.default}
                </li>
              ))}
            </ul>

            <p className="font-semibold">Downloads:</p>
            <ul className="list-disc pl-5 mb-2">
              {source.link?.filter((link: any) => link.function === 'download').map((link: any, index: number) => (
                <li key={index}>
                  <a href={link.urlObject.default} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {link.nameObject.default}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
interface SearchResult {
  _source: {
    resourceTitleObject: {
      default: string;
      [key: string]: string;
    };
    resourceType: string[];
    resourceAbstractObject?: {
      default: string;
      [key: string]: string;
    };
    cl_topic?: Array<{ key: string }>;
    resourceDate?: string;
  };
}

interface SearchResponse {
  hits: {
    hits: SearchResult[];
  };
}

const Searchbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        performSearch(searchTerm);
      } else {
        setSearchResults([]);
      }
    }, 500); // 500ms delay after the user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const performSearch = async (query: string): Promise<void> => {
    const url = 'http://103.6.53.254:20280/geonetwork/srv/api/search/records/_search?bucket=s101';
    const headers: HeadersInit = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    const body = {
      query: {
        function_score: {
          boost: "5",
          functions: [
            { filter: { match: { resourceType: "series" } }, weight: 1.5 },
            { filter: { exists: { field: "parentUuid" } }, weight: 0.3 },
            { filter: { match: { "cl_status.key": "obsolete" } }, weight: 0.2 },
            { filter: { match: { "cl_status.key": "superseded" } }, weight: 0.3 },
            { gauss: { changeDate: { scale: "365d", offset: "90d", decay: 0.5 } } }
          ],
          score_mode: "multiply",
          query: {
            bool: {
              must: [
                {
                  multi_match: {
                    query: query,
                    type: "bool_prefix",
                    fields: ["resourceTitleObject.*^6", "resourceAbstractObject.*^.5", "tag", "uuid", "resourceIdentifier"]
                  }
                },
                { terms: { isTemplate: ["n"] } }
              ]
            }
          }
        }
      },
      sort: ["_score"],
      _source: ["resourceTitle*", "resourceType", "resourceAbstract*", "cl_topic", "resourceDate", "resourceIdentifier", "resourceTemporalExtentDetails", "resolutionDistance", "licenseObject", "OrgForResourceObject", "contactForResource", "link", "cl_status", "changeDate"],
      size: 20
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SearchResponse = await response.json();
      setSearchResults(data.hits.hits || []);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

   const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleResultClick = (result: SearchResult) => {
    setSelectedResult(result);
  };

  const closeModal = () => {
    setSelectedResult(null);
  };

  return (
    <div className={s.searchcontainer}>
      <div className="relative flex mr-2 ">
        <input
          type="text"
          placeholder="Search.."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
              <SearchIcon />

      {searchResults.length > 0 && (
        <ul className={s.resultsList}>
          {searchResults.map((result, index) => (
            <li 
              key={index} 
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleResultClick(result)}
            >
              {result._source.resourceTitleObject.default}
            </li>
          ))}
        </ul>
      )}
      {selectedResult && (
        <ResultModal result={selectedResult} onClose={closeModal} />
      )}
    </div>
  );
};

const SettingBar = () => {
  return (
    <div className={`${s.settingWrapper} border-b-2 `}>
      {/* <img src={help} className={s.help}></img> */}
      <HelpIcon />
      <div className={s.pembatas}></div>
      <Searchbar></Searchbar>
      <div className={s.pembatas}></div>
      <BasemapSwitch></BasemapSwitch>
      <div className={s.pembatas}></div>
      <Dropdown></Dropdown>
      <div className={s.pembatas}></div>
    </div>
  );
};

export default SettingBar;
