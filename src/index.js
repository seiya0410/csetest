/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {

  const countryMap = {
  SG: 'https://1.1.1.1'
};

const CLIENT_IP = request.headers.get('CF-Connecting-IP');


let COUNTRY = request.cf.country;
let ASN = request.cf.asn;


if (COUNTRY != null && COUNTRY in countryMap) {
    const url = countryMap[COUNTRY];
    return Response.redirect(url);
  } 
    
const html = `<!DOCTYPE html>
<body>
  <h1>IP and Country</h1>
  <p>This is your ${CLIENT_IP}.</p>
  And you are accessing this site from ${COUNTRY} | ${ASN}
</body>`

return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  })
}
