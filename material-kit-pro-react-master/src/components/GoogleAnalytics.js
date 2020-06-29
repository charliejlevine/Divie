import React from 'react';
import { Helmet } from 'react-helmet';

const GA_MEASUREMENT_ID = 'G-BJN2S8K7CP';

function GoogleAnalytics() {
  return (
    <Helmet>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            dataLayer.push(arguments);
          }

          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </script>
    </Helmet>
  );
}

export default GoogleAnalytics;
