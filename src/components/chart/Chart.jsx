import "./chart.scss";
import {
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "July", uv: 400, pv: 240, amt: 240 },
  { name: "August", uv: 300, pv: 139, amt: 221 },
  { name: "September", uv: 200, pv: 980, amt: 229 },
  { name: "October", uv: 278, pv: 390, amt: 200 },
  { name: "November", uv: 189, pv: 480, amt: 218 },
  { name: "December", uv: 239, pv: 380, amt: 250 },
];

const Chart = ({ aspect, title }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%"  aspect={aspect}>
        <ComposedChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="pv" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
