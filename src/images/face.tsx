// components/Face.js
import React from "react";

const Face = ({ className = "", style = {} }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    x="0px"
    y="0px"
    viewBox="-5.0 -10.0 110.0 135.0"
    height="40px"
    width="40px"
    style={style}
    xmlSpace="preserve"
    className={className}
  >
    <g>
      <path d="m77.219 22.781c-15.012-15.012-39.441-15.012-54.449 0-15.012 15.012-15.012 39.441 0 54.449 7.5117 7.5117 17.359 11.262 27.219 11.262s19.719-3.75 27.219-11.262c15.012-15.012 15.012-39.441 0-54.449zm-46.07 58.469v-11.398c0-6.8711 3.6914-13.121 9.6797-16.461 0.019531 0.011719 0.050781 0.03125 0.070313 0.039063v-0.019532c2.6602 1.6289 5.7695 2.5898 9.1016 2.5898 3.3281 0 6.5-0.96875 9.1719-2.6289v0.019531c5.9883 3.3398 9.6797 9.5898 9.6797 16.461v11.398c-11.551 6.9688-26.148 6.9688-37.711 0zm18.852-27.25c-8.5312 0-15.469-6.9414-15.469-15.469 0-8.5312 6.9414-15.469 15.469-15.469 8.5312 0 15.469 6.9414 15.469 15.469 0 8.5312-6.9414 15.469-15.469 15.469zm25.809 21.809c-1.5508 1.5508-3.2188 2.9219-4.9609 4.1406v-10.09c0-7.2891-3.7695-13.93-9.9219-17.719 3.9805-3.1992 6.5391-8.1094 6.5391-13.602 0-9.6289-7.8398-17.469-17.469-17.469s-17.469 7.8398-17.469 17.469c0 5.4883 2.5586 10.398 6.5312 13.602-6.1484 3.7891-9.9219 10.43-9.9219 17.719v10.09c-1.7383-1.2109-3.3984-2.5898-4.9609-4.1406-14.23-14.23-14.23-37.391 0-51.621 7.1211-7.1211 16.461-10.672 25.809-10.672 9.3516 0 18.691 3.5586 25.809 10.672 14.23 14.23 14.23 37.391 0 51.621z" />
      <path d="m26.309 26.309c-0.80859 0.80859-1.5781 1.6719-2.3008 2.5391-0.35156 0.42969-0.28906 1.0586 0.14063 1.4102 0.19141 0.14844 0.41016 0.23047 0.62891 0.23047 0.28906 0 0.57812-0.12891 0.78125-0.37109 0.67188-0.82813 1.3984-1.6289 2.1602-2.3906 0.39062-0.39062 0.39062-1.0195 0-1.4102s-1.0195-0.39062-1.4102 0z" />
      <path d="m23.16 31.641c-0.46875-0.30078-1.0781-0.16016-1.3789 0.30078-3.8906 6.0703-5.7305 13.398-5.1797 20.629 0.039063 0.51953 0.48047 0.92188 1 0.92188h0.078126c0.55078-0.039063 0.96094-0.51953 0.92187-1.0703-0.51953-6.8008 1.2109-13.691 4.8711-19.398 0.30078-0.46094 0.16016-1.0781-0.30078-1.3789z" />
    </g>
  </svg>
);

export default Face;
