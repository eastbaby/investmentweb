import React, { useState } from "react";
import { Table, Switch } from "antd";
import ColorMoney from "@/components/colorMoney";
import "./index.less";

function PerformancePosition(props) {
  const [onlyShowHold, setOnlyShowHold] = useState(true);

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "代码",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "现价",
      dataIndex: "current_price",
      key: "current_price",
      sorter: (a, b) => a.current_price - b.current_price,
    },
    {
      title: "市值",
      dataIndex: "current_value",
      key: "current_value",
      sorter: (a, b) => a.current_price - b.current_price,
    },
    {
      title: "持仓",
      dataIndex: "current_num",
      key: "current_num",
    },
    {
      title: "单位成本",
      dataIndex: "average_cost",
      key: "average_cost",
    },
    {
      title: "总成本",
      dataIndex: "total_cost",
      key: "total_cost",
    },
    {
      title: "盈亏",
      dataIndex: "profit",
      key: "profit",
      render: (text) => <ColorMoney value={text} type="num" />,
    },
    {
      title: "盈亏率",
      dataIndex: "profit_rate",
      key: "profit_rate",
      render: (text) => <ColorMoney value={text} type="percent" />,
    },
    {
      title: "年化收益率",
      dataIndex: "year_return_rate",
      key: "year_return_rate",
      render: (text) => <ColorMoney value={text} type="percent" />,
    },
  ];
  const positionData = props.positionData || [];
  const allData = positionData.map((item, index) => {
    return {
      ...item,
      key: index + 1,
      average_cost: item.average_cost ? item.average_cost.toFixed(2) : "--",
      current_price: item.current_price.toFixed(3),
      current_value: item.current_value.toFixed(2),
      percentage: `${(item.percentage * 100).toFixed(2)}%`,
      profit_rate: item.profit_rate ? item.profit_rate : "--",
      total_cost: item.total_cost.toFixed(2),
      year_return_rate: item.year_return_rate ? item.year_return_rate : "--",
    };
  });
  let data = allData;
  if (onlyShowHold) {
    data = allData.filter((item) => {
      return item.hold;
    });
  }

  function onChange(checked) {
    setOnlyShowHold(checked);
  }

  return (
    <div className="perf-position">
      <div className="perf-position-action">
        <Switch defaultChecked onClick={onChange} />
        <div>仅显示持仓</div>
      </div>
      <Table
        size="small"
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered={true}
        loading={props.loading}
      />
    </div>
  );
}

export default PerformancePosition;
