import React, { useState, useRef } from "react";
import { Table, Switch, Button } from "antd";
import ColorMoney from "@/components/colorMoney";
import PureTrades from "../pureTrades";
import "./index.less";

const numSorter = (dataIndex) => {
  return (a, b) => parseFloat(a[dataIndex]) - parseFloat(b[dataIndex]);
};

function PerformancePosition(props) {
  const [onlyShowHold, setOnlyShowHold] = useState(true);
  const pureTradesRef = useRef();

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
      sorter: numSorter("current_price"),
    },
    {
      title: "涨跌",
      dataIndex: "change",
      key: "change",
      render: (text) => <ColorMoney value={text} type="num" />,
      sorter: numSorter("change"),
    },
    {
      title: "涨跌幅",
      dataIndex: "change_rate",
      key: "change_rate",
      render: (text) => <ColorMoney value={text} type="percent" />,
      sorter: numSorter("change_rate"),
    },
    {
      title: "当日收益",
      dataIndex: "daily_profit",
      key: "daily_profit",
      render: (text) => <ColorMoney value={text} type="num" />,
      sorter: numSorter("daily_profit"),
    },
    {
      title: "市值",
      dataIndex: "current_value",
      key: "current_value",
      sorter: numSorter("current_value"),
    },
    {
      title: "持仓",
      dataIndex: "current_num",
      key: "current_num",
      sorter: numSorter("current_num"),
    },
    {
      title: "成本",
      dataIndex: "average_cost",
      key: "average_cost",
      sorter: numSorter("average_cost"),
    },
    {
      title: "总成本",
      dataIndex: "total_cost",
      key: "total_cost",
      sorter: numSorter("total_cost"),
    },
    {
      title: "融成本",
      dataIndex: "average_finance_cost",
      key: "average_finance_cost",
      sorter: numSorter("average_finance_cost"),
    },
    {
      title: "总收益",
      dataIndex: "profit",
      key: "profit",
      render: (text) => <ColorMoney value={text} type="num" />,
      sorter: numSorter("profit"),
    },
    {
      title: "交易收益",
      dataIndex: "profit_trade",
      key: "profit_trade",
      render: (text) => <ColorMoney value={text} type="num" />,
      sorter: numSorter("profit_trade"),
    },
    {
      title: "分红收益",
      dataIndex: "profit_dividend",
      key: "profit_dividend",
      render: (text) => <ColorMoney value={text} type="num" />,
      sorter: numSorter("profit_dividend"),
    },
    {
      title: "融资收益",
      dataIndex: "profit_finance",
      key: "profit_finance",
      render: (text) => <ColorMoney value={text} type="num" />,
      sorter: numSorter("profit_finance"),
    },
    {
      title: "收益率",
      dataIndex: "profit_rate",
      key: "profit_rate",
      render: (text) => <ColorMoney value={text} type="percent" />,
      sorter: numSorter("profit_rate"),
    },
    {
      title: "年化",
      dataIndex: "year_return_rate",
      key: "year_return_rate",
      render: (text) => <ColorMoney value={text} type="percent" />,
      sorter: numSorter("year_return_rate"),
    },
    {
      title: "占比",
      dataIndex: "percentage",
      key: "percentage",
      sorter: numSorter("percentage"),
    },
  ];
  const positionData = props.positionData || [];
  const sortedPositionData = positionData.sort((a, b) => {
    return b.percentage - a.percentage;
  });
  const allData = sortedPositionData.map((item, index) => {
    return {
      ...item,
      key: index + 1,
      average_cost: item.average_cost ? item.average_cost.toFixed(2) : "--",
      average_finance_cost: item.average_finance_cost ? item.average_finance_cost.toFixed(2) : "--",
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
        <div className="perf-position-action-label">仅显示持仓</div>
        <Button style={{marginLeft: '20px'}} type="primary" shape="round" size="small" onClick={() => pureTradesRef.current.clearHighlight()}>清除高亮</Button>
        <Button style={{marginLeft: '20px'}} type="primary" shape="round" size="small" onClick={() => pureTradesRef.current.highlightSale()}>高亮卖出</Button>
      </div>
      <Table
        size="small"
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered={true}
        loading={props.loading}
        expandable={{
          expandedRowRender: record => (
            <div className="nested-table-wrapper">
              <PureTrades listData={record.history_trades} loading={false} bordered={false} onRef={pureTradesRef} />
            </div>
          )
        }}
      />
    </div>
  );
}

export default PerformancePosition;
