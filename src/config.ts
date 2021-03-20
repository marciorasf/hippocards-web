import "dotenv";

export const __node_env__ = process.env.NODE_ENV;

export const __is_dev_env__ = __node_env__ === "development";

export const __api_url__ = process.env.REACT_APP_API_URL;
