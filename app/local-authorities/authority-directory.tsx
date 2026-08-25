"use client";

import { useMemo, useState } from "react";
import styles from "../public-resources.module.css";

type Authority = { name: string; type: string };

const groups: Record<string, string> = {
  "County council": "Cambridgeshire|Derbyshire|Devon|East Sussex|Essex|Gloucestershire|Hampshire|Hertfordshire|Kent|Lancashire|Leicestershire|Lincolnshire|Norfolk|Nottinghamshire|Oxfordshire|Staffordshire|Suffolk|Surrey|Warwickshire|West Sussex|Worcestershire",
  "London borough": "Barking and Dagenham|Barnet|Bexley|Brent|Bromley|Camden|Croydon|Ealing|Enfield|Greenwich|Hackney|Hammersmith and Fulham|Haringey|Harrow|Havering|Hillingdon|Hounslow|Islington|Kensington and Chelsea|Kingston upon Thames|Lambeth|Lewisham|Merton|Newham|Redbridge|Richmond upon Thames|Southwark|Sutton|Tower Hamlets|Waltham Forest|Wandsworth|Westminster",
  "Metropolitan district": "Bolton|Bradford|Bury|Dudley|Gateshead|Kirklees|Knowsley|Leeds|Manchester|Newcastle Upon Tyne|North Tyneside|Oldham|Rochdale|Salford|Sandwell|Sefton|Sheffield|Solihull|South Tyneside|Stockport|Sunderland|Tameside|Trafford|Wakefield|Walsall|Wigan|Wolverhampton|Liverpool|Wirral|Calderdale|Coventry|Barnsley|Birmingham|St Helens|Doncaster|Rotherham",
  "District council": "Amber Valley|Arun|Ashfield|Ashford|Babergh|Bassetlaw|Blaby|Bolsover|Boston|Braintree|Breckland|Broadland|Bromsgrove|Broxtowe|Canterbury City|Charnwood|Chelmsford|Chesterfield|Chichester|Cotswold|Dacorum|Dartford|Derbyshire Dales|Dover|East Cambridgeshire|East Devon|East Hampshire|East Hertfordshire|East Lindsey|East Staffordshire|East Suffolk|Eastbourne|Epsom and Ewell|Erewash|Fenland|Folkestone and Hythe|Forest of Dean|Fylde|Gedling|Gravesham|Great Yarmouth|Guildford|Harborough|Hertsmere|High Peak|Hinckley and Bosworth|Horsham|King’s Lynn and West Norfolk|Lancaster City|Lewes|Lichfield|Maldon|Malvern Hills|Mansfield|Melton|Mid Devon|Mid Suffolk|Mid Sussex|New Forest|Newark and Sherwood|North Devon|North East Derbyshire|North Kesteven|North Norfolk|North Warwickshire|North West Leicestershire|Oadby and Wigston|Ribble Valley|Rother|Rushcliffe|Sevenoaks|South Derbyshire|South Hams|South Holland|South Kesteven|South Norfolk|South Oxfordshire|South Ribble|South Staffordshire|Spelthorne|Stafford|Staffordshire Moorlands|Stratford upon Avon|Surrey Heath|Swale|Teignbridge|Tendring|Test Valley|Tewkesbury|Thanet|Tonbridge and Malling|Torridge|Uttlesford|Vale of White Horse|Warwick|Waverley|Wealden|West Devon|West Lindsey|West Suffolk|Wychavon|Wyre|Wyre Forest|Basildon|Basingstoke and Deane|Brentwood|Broxbourne|Burnley|Cambridge|Cannock Chase|Cherwell|Chorley|Colchester|Crawley|Eastleigh|Elmbridge|Epping Forest|Exeter|Harlow|Hart|Havant|Hyndburn|Ipswich|Lincoln|Mole Valley|Norwich|Pendle|Preston|Redditch|Reigate and Banstead|Rochford|Rugby|Runnymede|Rushmoor|St Albans|Stevenage|Tamworth|Tandridge|Three Rivers|Tunbridge Wells|Watford|Welwyn Hatfield|West Lancashire|West Oxfordshire|Winchester|Woking|Worthing|Castle Point|Gloucester|Maidstone|North Hertfordshire|Rossendale|Stroud|Worcester|Huntingdonshire|Newcastle-under-Lyme|South Cambridgeshire|Adur|Cheltenham|Fareham|Gosport|Hastings|Nuneaton and Bedworth|Oxford",
  "Unitary authority": "Bath and North East Somerset|Bedford|Blackpool|Bournemouth, Christchurch and Poole|Bracknell Forest|Brighton and Hove|Central Bedfordshire|Cheshire East|Cheshire West and Chester|Darlington|Derby|East Riding of Yorkshire|Herefordshire|Leicester|Luton|Medway|Middlesbrough|North Lincolnshire|North Somerset|Nottingham|Redcar and Cleveland|Rutland|Slough|South Gloucestershire|Stockton-on-Tees|Stoke-on-Trent|Telford and The Wrekin|Torbay|West Berkshire|Windsor and Maidenhead|York|Cumberland|North Yorkshire|Somerset|Westmorland and Furness|Buckinghamshire|Cornwall|County Durham|Isle of Wight|North Northamptonshire|Northumberland|Shropshire|Thurrock|West Northamptonshire|Wiltshire|Bristol|Warrington|Blackburn with Darwen|Halton|Hartlepool|Hull|Milton Keynes|North East Lincolnshire|Peterborough|Plymouth|Portsmouth|Reading|Southampton|Southend|Swindon|Wokingham|Dorset",
  "Special authority": "City of London|Isles of Scilly"
};

const authorities: Authority[] = Object.entries(groups)
  .flatMap(([type, names]) => names.split("|").map((name) => ({ name, type })))
  .sort((a, b) => a.name.localeCompare(b.name));

const filters = ["All", ...Object.keys(groups)];

const slugOverrides: Record<string, string> = {
  "Canterbury City": "canterbury",
  "Lancaster City": "lancaster",
  "Hull": "kingston-upon-hull",
  "City of London": "city-of-london"
};

function govCouncilSlug(name: string) {
  if (slugOverrides[name]) return slugOverrides[name];
  return name
    .normalize("NFKD")
    .replace(/[’']/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function officialCouncilRoute(authority: Authority) {
  return `https://www.gov.uk/find-local-council/${govCouncilSlug(authority.name)}`;
}

export function AuthorityDirectory() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return authorities.filter((authority) =>
      (type === "All" || authority.type === type) &&
      (!q || authority.name.toLowerCase().includes(q) || authority.type.toLowerCase().includes(q))
    );
  }, [query, type]);

  return (
    <section aria-labelledby="directory-heading">
      <div className={styles.directoryHead}>
        <div>
          <p className={styles.eyebrow}>Complete England directory</p>
          <h2 id="directory-heading">All 317 councils and local authorities</h2>
          <p>Search by council name or filter by authority type. In two-tier areas, adult social care and carer’s assessments are normally handled by the county council rather than the district council.</p>
        </div>
        <div className={styles.countBadge}>{authorities.length}<span>authorities</span></div>
      </div>

      <div className={styles.notice} style={{ marginBottom: "1.5rem" }}>
        <strong>Requesting a carer’s assessment:</strong> NHS guidance says to contact adult social services at the local council. If you select a district council below, the official GOV.UK result identifies the county council responsible for social care.{' '}
        <a href="https://www.nhs.uk/social-care-and-support/support-and-benefits-for-carers/carer-assessments/" target="_blank" rel="noreferrer">Read the NHS carer’s assessment guide ↗</a>
      </div>

      <div className={styles.searchPanel}>
        <label className={styles.searchLabel} htmlFor="authority-search">Search the directory</label>
        <input id="authority-search" className={styles.searchInput} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. Surrey, Birmingham, Woking..." />
        <div className={styles.filters} aria-label="Filter by authority type">
          {filters.map((filter) => <button key={filter} type="button" className={`${styles.filterButton} ${type === filter ? styles.filterActive : ""}`} onClick={() => setType(filter)}>{filter}</button>)}
        </div>
        <p className={styles.resultCount}>{visible.length} result{visible.length === 1 ? "" : "s"}</p>
      </div>

      <div className={styles.authorityGrid}>
        {visible.map((authority) => (
          <article className={styles.authorityCard} key={`${authority.type}-${authority.name}`}>
            <span className={styles.authorityType}>{authority.type}</span>
            <h3>{authority.name}</h3>
            {authority.type === "District council" ? <p>Adult social care is normally provided by the county council in this area.</p> : <p>Use the official council route to reach local services and adult social care.</p>}
            <a href={officialCouncilRoute(authority)} target="_blank" rel="noreferrer">Open official council route ↗</a>
          </article>
        ))}
      </div>
      {visible.length === 0 ? <div className={styles.emptyState}>No authority matches that search. Try a shorter council or place name.</div> : null}
    </section>
  );
}
