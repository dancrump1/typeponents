"use client";

import { AnimatedPath } from "./component";


const RAW_SVG = `<svg width="515" height="515" viewBox="353 49.5 515 515" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g >
    <path d="M612.256 156.328C479.34 155.268 403.1 240.94 367.661 316.354C359.352 334.37 357.063 342.53 365.329 355.163C372.684 366.375 383.579 368.855 395.045 373.836C428.534 387.952 446.805 405.184 485.868 426.994C520.628 446.388 557.954 458.999 611.854 458.999C711.833 458.999 766.475 418.834 808.315 377.99C826.331 360.483 837.713 346.367 848.713 332.971C855.368 331.233 863.147 326.273 862.087 315.824C861.324 308.469 812.829 195.773 662.511 158.956C645.449 155.947 630.273 156.328 612.235 156.328H612.256Z" fill="white" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"/>
    <path d="M369.246 329.477C373.676 323.966 405.639 309.638 411.976 308.896C426.431 293.974 462.633 264.916 488.492 250.799C512.231 237.807 549.874 223.69 609.242 220.765C657.928 218.476 702.015 230.494 730.544 245.183C753.054 255.632 768.717 266.442 784.381 279.837C797.776 287.997 810.175 315 823.571 325.068C835.038 333.949 845.847 333.949 850.807 331.957" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"/>
    <path d="M610.98 156.711V457.687" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M560.113 162.039C560.113 179.674 559.71 201.102 567.51 222.531" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M513.02 177.891C513.02 193.003 514.164 207.713 526.373 226.131" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M471.559 199.32C471.559 211.932 473.551 226.387 487.328 243.216" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M433.387 230.516C433.387 243.657 439.343 251.308 450.131 262.775" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M403.945 262.711C403.945 272.991 411.724 280.897 420.245 287.022" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M381.688 296.414C384.718 304.935 389.424 310.085 395.253 313.646" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M661.853 160.039C661.853 176.889 660.708 195.775 653.629 222.778" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M709.758 173.898C709.758 189.032 708.762 205.119 696.574 227.353" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M752.569 195.773C752.569 209.169 746.443 224.832 734.977 240.496" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M789.66 227.227C789.66 241.11 782.559 251.559 770.562 260.694" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M817.424 252.203C817.424 264.221 808.904 278.083 793.961 285.183" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M842.226 287.086C842.226 295.903 836.228 306.204 822.832 308.917" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M559.051 181.617C581.052 175.661 596.969 174.898 611.679 174.898C629.293 174.898 648.686 176.255 661.319 179.265" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M514.922 195.776C533.214 187.213 551.866 181.617 560.132 181.617" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M472.914 217.502C491.185 207.201 510.07 199.316 514.923 198.32" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M438.961 247.797C457.231 231.222 463.908 226.517 471.008 223.719" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M411.98 273.951C424.592 261.34 434.872 250.764 438.962 248.898" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M706.789 193.5C723.618 199.562 740.681 208.358 748.947 213.53" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M750.023 215.062C766.153 224.579 777.323 233.1 786.84 241.112" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M781.82 245.797C795.216 256.077 806.555 267.331 812.872 274.644" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M814.461 300.656C824.762 312.42 831.544 323.399 836.631 332.026" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M706.789 195.773C721.965 201.687 738.222 209.042 747.993 215.061" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M696.617 223.719C711.072 227.979 724.129 233.363 735.172 240.506" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M656.98 207.203C666.243 208.793 680.698 211.93 696.446 217.504" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M560.109 207.194C574.819 204.609 588.342 203.718 610.873 204.609" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M520.074 221.613C531.414 216.462 545.742 212.181 566.28 209.68" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M485.887 240.499C497.226 233.357 510.579 227.846 526.37 224.836" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M450.133 260.165C460.434 252.005 473.045 243.315 487.331 238.312" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M420.246 287.085C429.636 277.949 441.696 268.687 450.132 262.773" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M395.066 313.583C401.595 306.737 407.805 300.379 411.98 296.352" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M371.52 346.644C371.52 336.83 374.063 330.154 382.329 325.109" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"/>
    <path d="M382.328 332.868C384.723 328.714 403.121 316.251 411.98 313.453C407.423 323.881 405.007 337.086 417.3 357.179C402.103 353.025 375.673 357.179 382.328 332.868Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"/>
    <path d="M382.328 346.648C383.473 351.926 389.301 355.19 395.067 356.25" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"/>
    <path d="M380.332 355.125C384.084 359.809 386.564 362.946 388.916 365.066" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M407.297 372.504C411.981 369.833 414.334 365.679 417.301 358.578" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M417.301 375.258C425.567 379.009 435.508 385.198 442.714 395.521" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M445.297 393.276C448.434 385.497 451.02 380.665 456.976 375.133" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M475.438 417.016C477.79 406.439 481.542 401.755 487.328 395.375" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M515.922 436.519C516.685 425.942 517.957 419.393 523.743 409.961" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M562.023 451.352C562.659 440.5 563.55 432.107 566.708 414.727" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M661.854 452.841C661.854 440.95 659.861 425.965 657.148 413.227" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M711.66 438.842C710.388 429.707 708.036 418.897 703.203 406.922" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M750.025 417.231C748.075 408.689 744.79 401.716 741.145 395.336" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M787.543 393.276C785.317 384.862 781.396 379.52 777.199 375.133" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M819.546 362.546C814.608 355.276 810.22 351.122 802.441 346.734" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M609.922 434.177C634.784 434.177 653.839 433.922 684.678 425.487C699.727 421.099 727.366 412.155 746.845 400.052C764.331 389.158 787.54 375.126 799.812 357.258C807.294 347.699 813.335 339.751 817.425 325.062" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M609.922 423.167C629.655 423.167 647.671 422.531 668.082 417.232C689.829 411.318 715.942 401.717 733.428 391.14C751.953 380.606 764.204 375.074 782.686 359.517C797.693 347.054 797.693 334.803 797.693 311.297" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M609.922 417.23C634.657 417.23 657.59 415.365 679.803 408.689C701.062 401.97 713.144 396.607 727.747 370.791C740.38 348.79 742.118 332.767 742.118 313.479C742.118 296.247 738.176 275.454 729.04 260.617" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M609.921 411.504C667.827 411.504 710.346 366.612 710.346 308.896C710.346 273.67 688.599 232.953 665.199 224.814C651.422 221.592 635.504 220.766 611.532 220.766C584.423 220.766 562.274 223.691 552.418 227.951C532.367 240.477 510.875 268.159 510.875 310.465C510.875 360.211 547.225 411.504 609.921 411.504Z" fill="#E5E5E5" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"/>
    <path d="M610.983 349.828C634.616 349.828 653.756 328.145 653.756 308.052C653.756 286.348 637.054 266.297 610.983 266.297C587.372 266.297 569.355 286.348 569.355 309.26C569.355 330.689 587.372 349.828 610.983 349.828Z" fill="currentColor"/>
    <path d="M644.683 299.585C658.291 299.585 661.746 285.448 661.746 281.844C661.746 270.59 653.268 263.977 645.192 263.977C632.56 263.977 625.332 273.197 625.332 282.226C625.332 292.675 632.814 299.585 644.683 299.585Z" fill="white" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M696.614 257.406L660.539 280.933" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M705.094 283.273L660.117 298.937" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M705.939 330.962L655.176 313.539" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M696.612 355.13L668.125 337.156" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M680.719 375.258L644.645 337.297" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M660.583 392.222L635.551 345.57" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M635.57 403.026L626.922 349.805" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M609.289 404.722V349.656" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M586.398 403.026L596.827 349.805" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M561.387 393.278L586.419 343.469" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M542.773 378.225L575.966 334.859" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M528.195 357.243L572.345 326.234" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M517.766 332.02L568.529 316.398" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M518.527 284.117L569.269 298.784" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M529.613 258.898L575.968 285.16" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M544.664 238.336L582.562 276.551" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M565.199 224.836L589.044 270.152" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M592.117 222.781L603.584 267.207" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M630.057 223.719L619.629 267.212" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M659.312 224.836L629.871 268.181" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M678.598 234.336L653.523 262.78" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M461.531 275.43C479.208 262.797 497.606 255.337 509.56 251.797" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M433.766 296.409C442.074 289.182 448.306 284.498 455.512 279.305" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M421.133 320.371C431.561 317.488 442.074 314.924 450.128 313.588C468.017 310.515 478.17 310.027 480.523 309.455C495.105 307.59 510.959 306.742 517.763 306.742" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M429.637 351.094C442.078 355.248 459.438 357.876 468.022 358.724C484.469 360.314 498.925 360.95 510.964 360.95C518.276 360.95 523.745 360.314 528.196 359.678" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M458.078 364.445C471.558 371.101 488.875 380.787 503.754 391.194" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M485.887 395.398C500.935 402.817 513.78 409.26 523.742 411.507C539.384 416.403 552.504 420.261 566.79 422.592C581.372 424.712 592.182 424.987 610.007 424.987" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M741.121 265.047C757.569 272.91 768.739 278.951 777.302 286.094C786.819 292.643 792.944 298.43 801.189 308.9" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M742.184 310.398C755.791 312.285 767.618 313.472 777.262 314.934C788.39 316.651 799.878 318.813 810.157 322.501" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M730.527 357.244C744.347 355.124 755.538 353.895 764.271 352.072C774.826 349.698 784.873 346.582 791.952 343.445" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M452.125 279.25C447.589 291.882 446.699 303.392 446.699 314.795C446.699 329.102 449.073 343.515 455.517 358.669" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
    <path d="M487.327 262.711C481.159 276.742 479.336 292.3 479.336 309.108C479.336 329.901 484.041 353.067 497.225 379.222" stroke="currentColor" stroke-width="0.7" stroke-miterlimit="10"/>
  </g>
</svg>`;

import { useState } from "react";

const RotateCcwIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <polyline points="3 3 3 8 8 8" />
  </svg>
);

export default function AnimatedPathPreview() {

  const [replayKey, setReplayKey] = useState(0);

  const strokeColor =
    typeof props.strokeColor === "string" ? props.strokeColor : "#007F7E";
  const fillColor =
    typeof props.fillColor === "string" ? props.fillColor : "#007F7E";
  const strokeWidth =
    props.strokeWidth !== undefined ? Number(props.strokeWidth) : 3;
  const pathLengthDuration =
    props.pathLengthDuration !== undefined
      ? Number(props.pathLengthDuration)
      : 1.5;
  const fillDuration =
    props.fillDuration !== undefined ? Number(props.fillDuration) : 0.8;

  return (
    <div className="relative flex h-[400px] w-full items-center justify-center rounded-xl bg-transparent">
      <AnimatedPath
        key={replayKey}
        className="h-full w-full max-w-lg"
        rawSvg={RAW_SVG}
        strokeColor={strokeColor}
        fillColor={fillColor}
        strokeWidth={strokeWidth}
        pathLengthDuration={pathLengthDuration}
        fillDuration={fillDuration}
        pathDelay={0.02}
        fillDelay={1}
      />
      <button
        onClick={() => setReplayKey((prev) => prev + 1)}
        className="absolute right-4 bottom-4 flex items-center justify-center rounded-full bg-neutral-100 p-2 text-neutral-600 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
        title="Replay Animation"
      >
        <RotateCcwIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
