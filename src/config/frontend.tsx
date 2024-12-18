import ThirdPartyWebJs from 'supertokens-web-js/recipe/thirdparty'
import EmailPasswordWebJs from 'supertokens-web-js/recipe/emailpassword'
import SessionWebJs from 'supertokens-web-js/recipe/session'
import { appInfo } from './appInfo'
import { SuperTokensConfig } from "supertokens-web-js/types"

export const frontendConfig = (): SuperTokensConfig => {
    return {
        appInfo,
        recipeList: [
            ThirdPartyWebJs.init(),
            EmailPasswordWebJs.init(),
            SessionWebJs.init(),
        ],
    }
}
