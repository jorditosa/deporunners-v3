interface AvatarUrls {
  "24": string;
  "48": string;
  "96": string;
}

interface Capabilities {
  armember: boolean;
  read: boolean;
  level_0: boolean;
  armember_access_plan_3: boolean;
}

interface ExtraCapabilities {
  armember: boolean;
  armember_access_plan_3: boolean;
}

interface Meta {
  persisted_preferences: unknown[];
}

interface WooCommerceMeta {
  variable_product_tour_shown: string;
  activity_panel_inbox_last_read: string;
  activity_panel_reviews_last_read: string;
  categories_report_columns: string;
  coupons_report_columns: string;
  customers_report_columns: string;
  orders_report_columns: string;
  products_report_columns: string;
  revenue_report_columns: string;
  taxes_report_columns: string;
  variations_report_columns: string;
  dashboard_sections: string;
  dashboard_chart_type: string;
  dashboard_chart_interval: string;
  dashboard_leaderboard_rows: string;
  order_attribution_install_banner_dismissed: string;
  homepage_layout: string;
  homepage_stats: string;
  task_list_tracked_started_tasks: string;
  android_app_banner_dismissed: string;
  launch_your_store_tour_hidden: string;
  coming_soon_banner_dismissed: string;
}

interface LinkItem {
  href: string;
  targetHints?: {
    allow: string[];
  };
}

interface Links {
  self: LinkItem[];
  collection: LinkItem[];
}

export interface WordPressUser {
  id: number;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  url: string;
  description: string;
  link: string;
  locale: string;
  nickname: string;
  slug: string;
  roles: string[];
  registered_date: string;
  capabilities: Capabilities;
  extra_capabilities: ExtraCapabilities;
  avatar_urls: AvatarUrls;
  meta: Meta;
  is_super_admin: boolean;
  woocommerce_meta: WooCommerceMeta;
  _links: Links;
}

interface Headers {
  "cache-control": string;
  "content-type": string;
  expires: string;
  link: string;
  "x-wp-total": string;
  "x-wp-totalpages": string;
}

interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

interface RequestHeaders {
  Accept: string;
  "Content-Type": string;
  Authorization: string;
}

interface Config {
  transitional: Transitional;
  adapter: string[];
  transformRequest: (null)[];
  transformResponse: (null)[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Record<string, unknown>;
  headers: RequestHeaders;
  baseURL: string;
  method: string;
  url: string;
  allowAbsoluteUrls: boolean;
}

export interface WordPressUserApiResponse {
  data: WordPressUser[];
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: Record<string, unknown>;
}