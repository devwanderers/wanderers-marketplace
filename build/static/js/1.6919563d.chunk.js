(this.webpackJsonplandingpage=this.webpackJsonplandingpage||[]).push([[1],{1351:function(e,t,n){"use strict";n.d(t,"d",(function(){return j})),n.d(t,"b",(function(){return v})),n.d(t,"a",(function(){return h})),n.d(t,"c",(function(){return w}));var a=n(41),i=n(115),s=n(116),r=n(5),u=n.n(r),l=n(1),p=n(130),o=n(166),c=Object(o.a)((function(e){return e.nfts}),(function(e){return e})),d=Object(o.a)(c,(function(e){return e.nftIds})),y=Object(o.a)(c,(function(e){return e.nfts})),b=n(185),m=n(1361),f=n(220),j=(n(618),function(){return Object(p.d)(c)}),v=function(){return Object(p.d)(y)},h=function(){var e=function(){var e=Object(f.a)(),t=e.account,n=e.library,a=Object(p.c)(),i=Object(p.d)(d),r=Object(l.useCallback)(Object(s.a)(u.a.mark((function e(){var i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=new n.eth.Contract(m,"0x304b80F5b301C4725bb33Aa60Da9b65b774df321"),a(b.b.pending()),i.methods.walletOfOwner(t).call().then((function(e){return a(b.b.fulfilled(e))})).catch((function(e){throw console.log("Failed to get nft ids",e),a(b.b.rejected(e)),e}));case 3:case"end":return e.stop()}}),e)}))),[n,a]);return Object(l.useEffect)((function(){t&&r()}),[t]),i}(),t=Object(f.a)(),n=t.account,a=t.library,r=Object(p.c)(),o=v(),c=Object(l.useCallback)(Object(s.a)(u.a.mark((function t(){var n,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=new a.eth.Contract(m,"0x304b80F5b301C4725bb33Aa60Da9b65b774df321"),s=e.reduce((function(e,t){return[].concat(Object(i.a)(e),[n.methods.tokenURI(t).call()])}),[]),r(b.a.pending()),Promise.all(s).then((function(e){var t=e.reduce((function(e,t){var n=t.replace(/^ipfs?:\/\//,"https://nomadzland.mypinata.cloud/ipfs/");return[].concat(Object(i.a)(e),[fetch(n).then((function(e){return e.json()}))])}),[]);Promise.all(t).then((function(e){r(b.a.fulfilled(e))})).catch((function(e){throw console.log("Failed to get nfts",e),r(b.a.rejected(e)),e}))})).catch((function(e){throw console.log("Failed to get nfts",e),r(b.a.rejected(e)),e}));case 4:case"end":return t.stop()}}),t)}))),[e,a,r]);return Object(l.useEffect)((function(){n&&e.length>0&&c()}),[n,e]),o},w=function(e){var t=h(),n=Object(l.useState)(void 0),i=Object(a.a)(n,2),s=i[0],r=i[1];return Object(l.useEffect)((function(){if(t.length>0){var n=t.findIndex((function(t){return t.attributes[0].value===e}));if(-1!==n){var a=t[n];r(a)}}}),[t,e]),s}},1361:function(e){e.exports=JSON.parse('[{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"string","name":"_initBaseURI","type":"string"},{"internalType":"string","name":"_initNotRevealedUri","type":"string"},{"internalType":"uint8","name":"_devMint","type":"uint8"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"removeWhitelistUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reveal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseExtension","type":"string"}],"name":"setBaseExtension","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newCost","type":"uint256"}],"name":"setCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newmaxMintAmount","type":"uint256"}],"name":"setmaxMintAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_notRevealedURI","type":"string"}],"name":"setNotRevealedURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint8","name":"_tickets","type":"uint8"}],"name":"whitelistUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseExtension","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintAmountWhitelisted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"notRevealedUri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"onlyWhitelisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"revealed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenMintTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"walletOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelisted","outputs":[{"internalType":"uint256","name":"places","type":"uint256"},{"internalType":"bool","name":"pswl","type":"bool"}],"stateMutability":"view","type":"function"}]')},1379:function(e,t,n){"use strict";var a=n(13),i=n(1),s=n(10),r=function(e,t){return Object(s.jsx)("svg",Object(a.a)(Object(a.a)({"data-name":"Capa 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 68.64 3.51",ref:t},e),{},{children:Object(s.jsx)("path",{style:{fill:"#00ace0"},d:"M64.61 0H3.02L0 3.51h68.64L64.61 0z"})}))},u=Object(i.forwardRef)(r);t.a=u},1380:function(e,t,n){"use strict";var a=n(13),i=n(1),s=n(10),r=function(e,t){return Object(s.jsx)("svg",Object(a.a)(Object(a.a)({"data-name":"Capa 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 68.64 3.51",ref:t},e),{},{children:Object(s.jsx)("path",{style:{fill:"#00ace0"},d:"M4.03 3.51h61.59L68.64 0H0l4.03 3.51z"})}))},u=Object(i.forwardRef)(r);t.a=u},1381:function(e,t,n){"use strict";var a=n(13),i=n(76),s=n(1),r=n(10),u=["size"],l=function(e,t){var n=e.size,s=void 0===n?"1em":n,l=Object(i.a)(e,u);return Object(r.jsxs)("svg",Object(a.a)(Object(a.a)({"data-name":"Capa 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 8.4 14.3",width:s,height:s,ref:t},l),{},{children:[Object(r.jsx)("path",{d:"M9.1 7.3c-.1.1-.2.3-.3.4-1.2.8-2.4 1.5-3.6 2.3a.63.63 0 0 1-.6 0C3.4 9.2 2.2 8.5 1 7.7.7 7.5.7 7.3.9 7c1.2-2 2.4-3.9 3.6-5.8.3-.4.5-.4.8 0C6.5 3.1 7.7 5 8.9 7c.1.1.1.2.2.3Z",transform:"translate(-.7 -.9)",style:{fill:"#09a2d2"}}),Object(r.jsx)("path",{d:"M1.1 8.9a1.38 1.38 0 0 1 .4.3c1 .6 2 1.2 2.9 1.8a.75.75 0 0 0 .9 0c1-.6 1.9-1.2 2.9-1.8.2-.1.4 0 .6-.1 0 .2 0 .5-.1.6-1.1 1.7-2.3 3.5-3.4 5.2-.3.4-.5.4-.9 0-1.3-1.7-2.5-3.5-3.7-5.2.1-.1.1-.4.1-.5s.2-.2.3-.3Z",transform:"translate(-.7 -.9)",style:{fill:"#09a2d2"}})]}))},p=Object(s.forwardRef)(l);t.a=p},1414:function(e,t,n){"use strict";n.d(t,"a",(function(){return y}));var a=n(1);n.p;n.p;n.p;n.p;n.p;n.p;n.p;n.p;n.p;n.p;n.p;var i,s,r,u,l=["title","titleId"];function p(){return p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},p.apply(this,arguments)}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function c(e,t){var n=e.title,c=e.titleId,d=o(e,l);return a.createElement("svg",p({id:"Layer_1","data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 327.09 322.3",ref:t,"aria-labelledby":c},d),i||(i=a.createElement("defs",null,a.createElement("style",null,".cls-1{fill:#00acc1;}"))),void 0===n?a.createElement("title",{id:c},"marco"):n?a.createElement("title",{id:c},n):null,s||(s=a.createElement("path",{className:"cls-1",d:"M14.59,307.88H312.3V14.52H14.59ZM197.15,17.41l6.09,6.35H309.41V286.43L291.61,305H131.34l-6.89-7.18H32.67l-6.62-6.9h-.24V199.73l-8.32-8V17.41Z"})),r||(r=a.createElement("polygon",{className:"cls-1",points:"326.84 315.73 327.08 315.48 326.84 315.48 326.84 34 320.87 30.64 320.87 15.84 319.18 15.84 319.18 314.64 7.72 314.64 7.72 275.38 6.03 275.38 6.03 316.33 280.51 316.33 283.46 322.3 320.27 322.3 325.61 316.96 326.84 315.86 326.84 315.73"})),u||(u=a.createElement("polygon",{className:"cls-1",points:"6.03 52.88 7.72 52.88 7.72 7.76 99.73 7.76 99.73 6.07 81.11 6.07 75.15 0 4.7 0 0.12 6.94 0.14 6.94 0 7.06 0 31.46 6.03 37.49 6.03 52.88"})))}var d=a.forwardRef(c);n.p;n.p;var y=d},1418:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(1),i=n(1480),s=n.n(i);function r(e,t){var n=Object(a.useRef)();s()(n.current,t)||(n.current=t),Object(a.useEffect)(e,[n.current])}},1460:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var a=n(41),i=n(13),s=n(76),r=n(1),u=n.n(r),l=n(1418),p=n(10),o=["children"],c=["children","tab","className"],d=function(e){var t=e.children,n=Object(s.a)(e,o);return Object(p.jsx)("div",Object(i.a)(Object(i.a)({},n),{},{children:t}))};t.b=function(e){var t=e.children,n=e.onChange,o=e.className,y=e.tabContainerClassName,b=void 0===y?"":y,m=e.panelContainerClassName,f=void 0===m?"":m,j=Object(r.useState)(0),v=Object(a.a)(j,2),h=v[0],w=v[1],O=u.a.Children.toArray(t);return Object(l.a)((function(){if("function"===typeof n&&n(h),0===h&&O.length>0){var e=O[0].props.tab;w(e)}}),[h,O]),0===O.length?null:Object(p.jsxs)("div",{className:"w-full ".concat(o," "),children:[Object(p.jsx)("div",{id:"tabs",className:"w-full bg-blue-3 border-b border-aqua-3",children:Object(p.jsx)("div",{className:b,children:Object(p.jsx)("div",{className:"",children:Object(p.jsx)("div",{className:"flex flex-row justify-start text-2xl font-saira-condensed space-x-5",children:O.map((function(e,t){var n=e.props;e.key;return Object(p.jsx)("a",{className:"px-3 pb-2   border-green-0 ".concat(h===n.tab?"border-b-4":""),onClick:function(){h!==n.tab&&w(n.tab)},children:Object(p.jsx)("div",{className:"pt-4 text-white",children:n.tab})},"tab-".concat(n.tab))}))})})})}),Object(p.jsx)("div",{id:"tabs-pane",className:"relative ".concat(f),children:O.map((function(e,t){var n=e.props,a=n.children,r=n.tab,u=n.className,l=void 0===u?"":u,o=Object(s.a)(n,c);return Object(p.jsx)(d,Object(i.a)(Object(i.a)({role:"tabpanel",hidden:h!==r,className:"relative mx-auto  ".concat(l)},o),{},{children:a}),"pane-".concat(r))}))})]})}},1469:function(e,t,n){"use strict";var a=n(41),i=n(1),s=(n(1414),n(484)),r=n(1418),u=function(e){for(var t=0;t<e.length;t++)if("undefined"!==typeof e[t])return e[t]},l=function(e){var t=e.xxl,n=e.xl,l=e.lg,p=e.md,o=e.sm,c=e.base,d=Object(i.useState)(u([t,n,l,p,o,c])),y=Object(a.a)(d,2),b=y[0],m=y[1],f=Object(s.a)().width;return Object(r.a)((function(){m(f>=1536?u([t,n,l,p,o,c]):f>=1280?u([n,l,p,o,c]):f>=1024?u([l,p,o,c]):f>=768?u([p,o,c]):f>=640?u([o,c]):c)}),[f]),[b]},p=function e(t){return" "===t.substring(t.length-1,t.length)?e(t.substring(0,t.length-1)):t},o=n(1380),c=n(1379),d=n(13),y=n(10),b=function(e,t){return Object(y.jsxs)("svg",Object(d.a)(Object(d.a)({"data-name":"Capa 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 133.86 24.11",ref:t},e),{},{children:[Object(y.jsx)("g",{style:{opacity:.36000001430511475},children:Object(y.jsx)("path",{style:{fill:"#3cb396"},d:"M3.81 1.68h126.23v20.74H3.81z"})}),Object(y.jsx)("path",{style:{fill:"#3cb396"},d:"M129.66 0h1.96v24.11h-1.96zM2.24 0H4.2v24.11H2.24zM0 0h1.12v24.11H0zM132.74 0h1.12v24.11h-1.12z"})]}))},m=Object(i.forwardRef)(b),f=n(1381),j=n(58),v=n(101);t.a=function(e){var t,n,i=e.nft,s=e.title,r=e.id,u=(e.isProfile,l({base:"-2%",lg:"-1%"})),d=(Object(a.a)(u,1)[0],Object(j.g)()),b=function(){d.push("".concat(v.b,"/").concat(r))};return Object(y.jsxs)("div",{className:"w-full",children:[Object(y.jsx)("div",{className:"w-full flex justify-center",children:Object(y.jsx)(c.a,{width:"50%"})}),Object(y.jsxs)("div",{className:"w-full border-t border-b border-blue-6 relative",children:[Object(y.jsxs)("div",{onClick:b,className:"relative cursor-pointer",children:[Object(y.jsx)("div",{className:"w-full h-60 relative flex justify-center items-center overflow-hidden",children:Object(y.jsx)("img",{src:i,alt:i,className:"w-full h-full object-cover"})}),Object(y.jsxs)("div",{className:"w-full flex justify-center my-3 relative",children:[Object(y.jsx)(m,{width:"80%"}),Object(y.jsx)("div",{className:"absolute inset-0 flex justify-center items-center",children:Object(y.jsx)("span",{className:" font-semibold text-lg lg:text-xl text-light-0",children:(t=12,n=s,n.length<t?n:p(n.substring(0,t))+"...")})})]}),Object(y.jsxs)("div",{className:"w-full flex flex-row py-2 px-2 items-center",style:{backgroundImage:"linear-gradient(to top, rgba(0,162,210,0.13), transparent)"},children:[Object(y.jsxs)("div",{className:"flex flex-row items-center text-light-0",children:[Object(y.jsx)("div",{className:"mr-1 relative ",style:{top:"-1.5px"},children:Object(y.jsx)(f.a,{})}),Object(y.jsx)("div",{className:"",children:"0.3"})]}),Object(y.jsx)("div",{className:"ml-auto",children:Object(y.jsx)("button",{onClick:b,className:"bg-blue-6 rounded-md px-2 text-lg font-medium text-blue-5",children:"DETAIL"})})]})]}),Object(y.jsx)("div",{className:"absolute top-0 left-0 border-l border-blue-6",style:{height:"15%"}}),Object(y.jsx)("div",{className:"absolute top-0 right-0 border-r border-blue-6",style:{height:"15%"}})]}),Object(y.jsx)("div",{className:"w-full flex justify-center",children:Object(y.jsx)(o.a,{width:"50%"})})]})}}}]);
//# sourceMappingURL=1.6919563d.chunk.js.map