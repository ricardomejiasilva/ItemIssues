import merge from 'lodash/merge';

/**
 * Sets up a common fetch for communicating with Item Issues Web.
 * You must assign a Item Issues Web host value into a window variable 'itemIssuesUrl' to use this function!
 * @param {RequestInfo} url the url path, without the host
 * @param {RequestInit} options init object used in a fetch, credentials 'include' is set by default
 * @return {Promise<Response>} A fetch Promise or json response promise
 */
export default function itemIssuesFetch(url, options) {
    const defaultSettings = {
        headers: {
            'Authorization': 'Bearer ' + window.bearerToken
        }
    };
    const settings = merge(defaultSettings, options);

    //for now, we are going to assume the page using this function has set a global variable 'itemIssuesUrl'.
    //ideally, I would like to get this from webpack plugin variable
    return window.fetch(`${window.itemIssuesWebUrl}${url}`, settings);

}
