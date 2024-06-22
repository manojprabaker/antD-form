import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;




// const getConfig = (url, method, contentType, data, sendHeader = true) => {
//   if (sendHeader) {
//     return {
//       url: url,
//       method: method,
//       headers: {
//         "Content-Type": contentType,
//       },
//       data: data,
//     };
//   } else {
//     return {
//       url: url,
//       method: method,
//       data: data,
//     };
//   }
// };
// export const Authentication = async (payload) => {
//   const response = await axios(
//     getConfig(
//       baseUrl + "/collection_authentication" + addOnURL, //api
//       "post",
//       "application/json",
//       JSON.stringify(payload),
//       shouldISendHeader
//     )
//   )
//     .then((response) => {
//       return response;
//     })
//     .catch((error) => {
//       return error;
//     });

//   return response;
// };



// function getPostFormDataMethodHeaders(payLoadData) {
//   const jToken = getJwtAccesToken();
//   const requestOptions = {
//     method: "POST",
//     headers: {
//       Authorization: "Bearer " + jToken,
//     },
//     body: payLoadData,
//   };
//   return requestOptions;
// }


// const requestOptions =
// commonConstants.getPostFormDataMethodHeaders(payload);
// const response: any = await fetch(URL, requestOptions).catch((error) => {
// console.log(error);
// });