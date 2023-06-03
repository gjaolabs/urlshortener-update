mugren
last week (edited)
Upgrade the url shortener service to handle the following scenario:

1. User adds link and gets and a new short link
2. When new short links is opened, it redirects to the original link

Implementation idea:

1. get url endpoint, it will generate random 8 char string for it, and save it to mongo. The response will be the new url 'http://service-domain/{publicId}'
2. mongo schema can be 'objectId, string url, string publicId, date issuedDate'
3. add /api/get-link endpoint to read 'http://service-domain/{publicId}', find mongo entry by checking the id, and then respond the real link
4. add another endpoint that instead od responding string, will execute 302 redirect. Map it to 'service-domain/l/publicId'
