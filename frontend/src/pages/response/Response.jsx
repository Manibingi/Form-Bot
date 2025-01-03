// import React from "react";
// import style from "./response.module.css";

// import { Chart } from "react-google-charts";

// export const data = [
//   ["Task", "Hours per Day"],
//   ["Work", 11],
//   ["Eat", 2],
//   ["Commute", 2],
//   ["Watch TV", 2],
//   ["Sleep", 7], // CSS-style declaration
// ];

// export const options = {
//   title: "My Daily Activities",
//   pieHole: 0.4,
//   is3D: false,
// };

// const Response = ({ forms }) => {
//   console.log(forms);
//   return (
//     <div>
//       <div className={style.container}>
//         {forms.map((item) => (
//           <div className="div" key={item._id}>
//             <div className={style.response}>
//               <h3>views</h3>
//               <p>{item.viewCount}</p>
//             </div>
//             <div className={style.response}>
//               <h3>started</h3>
//               <p>{item.startedCount}</p>
//             </div>
//             <div className={style.response}>
//               <h3>submitted</h3>
//               <p>{item.submittedCount}</p>
//             </div>
//             <table>
//               {item.fields.map((field) => {
//                 return <tr key={field._id}>{/* <th>{field.label}</th> */}</tr>;
//               })}
//             </table>
//           </div>
//         ))}
//       </div>

//       <div className="table"></div>
//       <Chart
//         chartType="PieChart"
//         width="100%"
//         height="400px"
//         data={data}
//         options={options}
//       />
//       <div className={style.responsesData}></div>
//     </div>
//   );
// };

// export default Response;

import React from "react";
import style from "./response.module.css";
import { Chart } from "react-google-charts";

const Response = ({ forms }) => {
  // Calculate submission rate
  const calculateCompletionRate = (submitted, started) => {
    if (started === 0) return 0;
    return ((submitted / started) * 100).toFixed(2);
  };

  // Prepare data for pie chart
  const pieData = forms.map((item) => [
    item.name || "Unnamed Form",
    item.submittedCount,
  ]);

  const chartData = [["Form", "Submissions"], ...pieData];

  const chartOptions = {
    title: "Form Submission Breakdown",
    pieHole: 0.4,
    is3D: false,
  };

  return (
    <div className={style.container}>
      {forms.map((item) => (
        <div className={style.formContainer} key={item._id}>
          <div className={style.responseSummary}>
            <div className={style.response}>
              <h3>Views</h3>
              <p>{item.viewCount}</p>
            </div>
            <div className={style.response}>
              <h3>Started</h3>
              <p>{item.startedCount}</p>
            </div>
            <div className={style.response}>
              <h3>Submitted</h3>
              <p>{item.submittedCount}</p>
            </div>
            <div className={style.response}>
              <h3>Completion Rate</h3>
              <p>
                {calculateCompletionRate(
                  item.submittedCount,
                  item.startedCount
                )}
                %
              </p>
            </div>
          </div>

          <table className={style.responseTable}>
            <thead>
              <tr>
                <th>Submitted At</th>
                {item.fields.map((field) => (
                  <th key={field._id}>{field.label}</th>
                ))}
              </tr>
            </thead>
            {/* <tbody>
              {item.map((fields, index) => (
                <tr key={index}>
                  <td>{new Date(fields.submittedAt).toLocaleString()}</td>
                  {item.fields.map((field) => (
                    <td key={field._id}>{response[field.name]}</td>
                  ))}
                </tr>
              ))}
            </tbody> */}
          </table>
        </div>
      ))}

      <div className={style.chartContainer}>
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={chartData}
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default Response;
