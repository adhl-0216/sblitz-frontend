import { AppInfoUserInput } from "supertokens-web-js/types";

export const appInfo: AppInfoUserInput = {
    appName: process.env.NEXT_PUBLIC_APP_NAME!,
    // websiteDomain: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN!,
    apiDomain: process.env.NEXT_PUBLIC_API_DOMAIN!,
    apiBasePath: process.env.NEXT_PUBLIC_API_BASE_PATH!,
};
