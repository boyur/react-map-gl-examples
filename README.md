# Urbica React Mapbox GL JS server-side rendering example

To use any of Mapbox’s tools, APIs, or SDKs, you’ll need a Mapbox [access token](https://www.mapbox.com/help/define-access-token/). Mapbox uses access tokens to associate requests to API resources with your account. You can find all your access tokens, create new ones, or delete existing ones on your [API access tokens page](https://www.mapbox.com/studio/account/tokens/).

## Usage

Set Mapbox token as environment variable, install dependencies, build and run server:

```sh
export MAPBOX_ACCESS_TOKEN=<TOKEN>
npm install
npm run build
npm start
```

Open `http://localhost:3000`.

**P.S.** When building production bundle, you have to disable comparisons optimization, due to [this](https://github.com/mapbox/mapbox-gl-js/issues/4359#issuecomment-286277540) issue.