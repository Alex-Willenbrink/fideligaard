import React from "react";
import SvgIcon from "material-ui/SvgIcon";

export const MoneyBag = ({ width, height }) =>
  <svg
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 481 481"
  >
    <g>
      <g>
        <path d="M256.7,301.9h-27.5c-10,0-18.1-8.1-18.1-18.1s8.1-18.1,18.1-18.1h48.4c6.6,0,12-5.4,12-12c0-6.6-5.4-12-12-12h-22.7V225
			c0-6.6-5.4-12-12-12s-12,5.4-12,12v16.7h-1.7c-23.2,0-42.1,18.9-42.1,42.1s18.9,42.1,42.1,42.1h27.5c10,0,18.1,8.1,18.1,18.1
			s-8.1,18.1-18.1,18.1h-49.3c-6.6,0-12,5.4-12,12c0,6.6,5.4,12,12,12H231v17.1c0,6.6,5.4,12,12,12c6.6,0,12-5.4,12-12v-17.1h2
			c0.1,0,0.2,0,0.3,0c23-0.3,41.5-19.1,41.5-42.1C298.8,320.8,279.9,301.9,256.7,301.9z" />
        <path d="M423.3,274.7c-12.6-29-30-57.1-52-83.4c-26.6-32-53.1-53.4-66.6-63.3l51-94.6c2.5-4.7,1.7-10.5-2.2-14.2
			C340.3,6.3,326.3,0,310.7,0c-14.3,0-27.4,5.4-38.8,10.2c-9,3.7-17.5,7.3-24.4,7.3c-2.1,0-3.9-0.3-5.7-1C218,7.8,199.7,2.4,182,2.4
			c-22.4,0-41.5,9-60.2,28.2c-3.9,4-4.5,10.3-1.4,15l55,83.1c-13.6,10.1-39.6,31.3-65.7,62.6c-21.9,26.3-39.4,54.4-52,83.4
			c-15.8,36.5-23.8,74.6-23.8,113.2c0,51.3,41.8,93.1,93.1,93.1h227c51.3,0,93.1-41.8,93.1-93.1
			C447.1,349.3,439.1,311.2,423.3,274.7z M146,40.6c11.6-10,22.7-14.4,36-14.4c14.2,0,30.2,4.8,51.5,12.7c4.4,1.6,9.1,2.4,13.9,2.4
			c11.7,0,22.9-4.6,33.6-9.1c10.3-4.3,20.1-8.4,29.6-8.4c4.6,0,11.1,0.8,19.3,6.6l-48,89.2h-83.6L146,40.6z M354,457H127
			c-38.1,0-69.1-31-69.1-69.1c0-64.1,23.5-124.9,69.7-180.7c29.2-35.3,58.9-57.2,67.9-63.6h89.8c9.1,6.3,38.7,28.3,67.9,63.6
			c46.3,55.8,69.7,116.5,69.7,180.7C423.1,426,392.1,457,354,457z" />
      </g>
    </g>
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
  </svg>;

export const UpArrow = props =>
  <SvgIcon {...props}>
    <path d="M7 14l5-5 5 5z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SvgIcon>;

export const DownArrow = props =>
  <SvgIcon {...props}>
    <path d="M7 10l5 5 5-5z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SvgIcon>;

export const UpWing = props =>
  <SvgIcon {...props}>
    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SvgIcon>;

export const DownWing = props =>
  <SvgIcon {...props}>
    <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
    <path d="M0-.75h24v24H0z" fill="none" />
  </SvgIcon>;

export const MoneyIcon = ({ fill }) =>
  <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill={fill}>
    <path d="M44.863,10.771h-9.998c1.373,1.227,2.547,2.665,3.467,4.272h6.531c1.18,0,2.137-0.956,2.137-2.136
        C47,11.728,46.043,10.771,44.863,10.771z" />
    <path d="M44.863,16.158h-5.954c0.642,1.34,1.116,2.77,1.391,4.272h4.563c1.18,0,2.137-0.956,2.137-2.136
        S46.043,16.158,44.863,16.158z" />
    <path d="M44.863,5.386H29.048c-0.921,0-1.696,0.584-1.998,1.398c2.365,0.502,4.541,1.504,6.437,2.874h11.377
        c1.181,0,2.138-0.956,2.138-2.136S46.043,5.386,44.863,5.386z" />
    <path d="M29.048,4.272h15.815c1.18,0,2.137-0.956,2.137-2.136C47,0.957,46.043,0,44.863,0H29.048
        c-1.181,0-2.137,0.957-2.137,2.137C26.911,3.317,27.867,4.272,29.048,4.272z" />
    <path d="M44.863,21.542h-4.393c0.073,0.644,0.12,1.295,0.12,1.958c0,0.786-0.071,1.557-0.175,2.314h4.447
        c1.18,0,2.137-0.957,2.137-2.137S46.043,21.542,44.863,21.542z" />
    <path d="M44.863,26.928h-4.619c-0.309,1.51-0.829,2.938-1.508,4.272h6.127c1.18,0,2.137-0.956,2.137-2.136
        C47,27.884,46.043,26.928,44.863,26.928z" />
    <path d="M44.863,32.313h-6.748c-0.979,1.617-2.204,3.063-3.645,4.272h10.393c1.18,0,2.137-0.956,2.137-2.136
        S46.043,32.313,44.863,32.313z" />
    <path d="M2.137,25.458H6.53c-0.074-0.644-0.121-1.295-0.121-1.958c0-0.786,0.072-1.556,0.175-2.314H2.137
        C0.957,21.187,0,22.143,0,23.323C0,24.502,0.957,25.458,2.137,25.458z" />
    <path d="M2.137,30.844h5.954c-0.641-1.34-1.116-2.77-1.391-4.271H2.137C0.957,26.573,0,27.528,0,28.708
        S0.957,30.844,2.137,30.844z" />
    <path d="M2.137,20.073h4.619c0.308-1.509,0.829-2.938,1.507-4.272H2.137C0.957,15.8,0,16.756,0,17.937S0.957,20.073,2.137,20.073
        z" />
    <path d="M2.137,14.688h6.748c0.979-1.616,2.204-3.063,3.644-4.272H2.137C0.957,10.416,0,11.372,0,12.551
        C0,13.731,0.957,14.688,2.137,14.688z" />
    <path d="M2.137,36.229h9.998c-1.373-1.227-2.547-2.664-3.467-4.271H2.137C0.957,31.958,0,32.914,0,34.093
        C0,35.274,0.957,36.229,2.137,36.229z" />
    <path d="M2.137,41.615h15.815c0.921,0,1.697-0.584,1.998-1.398c-2.365-0.502-4.541-1.504-6.436-2.874H2.137
        C0.957,37.342,0,38.298,0,39.479C0,40.659,0.957,41.615,2.137,41.615z" />
    <path d="M17.952,42.729H2.137C0.957,42.729,0,43.684,0,44.865C0,46.044,0.957,47,2.137,47h15.815
        c1.181,0,2.137-0.957,2.137-2.137S19.133,42.729,17.952,42.729z" />
    <path d="M23.5,8.546c-8.246,0-14.954,6.708-14.954,14.954S15.254,38.455,23.5,38.455S38.454,31.747,38.454,23.5
        S31.746,8.546,23.5,8.546z M23.5,34.182c-5.89,0-10.682-4.791-10.682-10.682c0-5.89,4.792-10.682,10.682-10.682
        c5.891,0,10.682,4.792,10.682,10.682C34.182,29.391,29.391,34.182,23.5,34.182z" />
    <path d="M24.123,22.057v-3.692c2.15,0.04,2.134,2.118,3.396,2.118c0.66,0,1.227-0.445,1.227-1.203
        c0-1.904-3.109-2.855-4.623-2.895V15.35c0-0.331-0.254-0.661-0.586-0.661c-0.328,0-0.579,0.33-0.579,0.661v1.035
        c-2.428,0.075-4.624,1.438-4.624,4.078c0,2.157,1.744,3.42,4.624,3.943v4.061c-3.229-0.136-1.537-2.817-3.713-2.817
        c-0.734,0-1.203,0.449-1.203,1.224c0,1.536,1.633,3.498,4.916,3.578v1.202c0,0.33,0.251,0.66,0.579,0.66
        c0.332,0,0.586-0.33,0.586-0.66v-1.202c2.893-0.175,4.835-1.498,4.835-4.101C28.958,23.358,26.688,22.602,24.123,22.057z
         M22.958,21.844c-1.457-0.293-2.18-0.854-2.18-1.828c0-0.834,0.855-1.612,2.18-1.652V21.844z M24.123,28.466v-3.846
        c1.046,0.231,2.391,0.62,2.391,1.94C26.514,27.842,25.287,28.389,24.123,28.466z" />
  </svg>;