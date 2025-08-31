export interface DateDetails {
  year: string;
  month: string;
  day: string;
  hour: string;
  minutes: string;
  seconds?: string;
}

export interface Image {
  url: string;
  id: number;
  extension: string;
  width: number;
  height: number;
  filesize?: number;
  alt?: string;
  title?: string;
  description?: string;
  caption?: string;
}

export interface CostDetails {
  currency_symbol: string;
  currency_code: string;
  currency_position: string;
  values: unknown[];
}

export interface Category {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter: string;
  urls?: {
    self: string;
    collection: string;
  };
}

export interface Venue {
  id: number;
  author: string;
  status: string;
  date: string;
  date_utc: string;
  modified?: string;
  modified_utc?: string;
  url?: string;
  venue: string;
  slug: string;
  address?: string;
  city?: string;
  country?: string;
  province?: string;
  state?: string;
  stateprovince?: string;
  zip?: string;
  phone?: string;
  website?: string;
  show_map?: boolean;
  show_map_link?: boolean;
  global_id?: string;
  global_id_lineage?: string[];
}

export interface Event {
  id: number;
  global_id: string;
  global_id_lineage: string[];
  author: string;
  status: string;
  date: string;
  date_utc: string;
  modified: string;
  modified_utc: string;
  url: string;
  rest_url: string;
  title: string;
  description: string;
  excerpt: string;
  slug: string;
  image: Image;
  all_day: boolean;
  start_date: string;
  start_date_details: DateDetails;
  end_date: string;
  end_date_details: DateDetails;
  utc_start_date: string;
  utc_start_date_details: DateDetails;
  utc_end_date: string;
  utc_end_date_details: DateDetails;
  timezone: string;
  timezone_abbr: string;
  cost: string;
  cost_details: CostDetails;
  website: string;
  show_map: boolean;
  show_map_link: boolean;
  hide_from_listings: boolean;
  sticky: boolean;
  featured: boolean;
  categories: Category[];
  tags: unknown[];
  venue: Venue;
  organizer: unknown[];
  custom_fields: unknown[];
}