import React from "react";
import { Table } from "antd";
import ColorMoney from '@/components/colorMoney';
import "./index.less";

function PerformanceSummary(props) {
  const columns = [
    {
      title: "总资产",
      dataIndex: "total_asset",
      key: "total_asset",
    },
    {
      title: "年化收益率",
      dataIndex: "year_return_rate",
      key: "year_return_rate",
      render: text => <ColorMoney value={text} type='percent' />
    },
    {
      title: "累计盈亏",
      dataIndex: "total_profit",
      key: "total_profit",
      render: text => <ColorMoney value={text} type='num' />
    },
    {
      title: "累计收益率",
      dataIndex: "total_profit_rate",
      key: "total_profit_rate",
      render: text => <ColorMoney value={text} type='percent' />
    },
    {
      title: "市值",
      key: "total_value",
      dataIndex: "total_value",
    },
    {
      title: "现金",
      key: "cash",
      dataIndex: "cash",
    },
    {
      title: "本金",
      key: "total_principle",
      dataIndex: "total_principle",
    },
    {
      title: "总结息",
      key: "total_interest",
      dataIndex: "total_interest",
    },
  ];
  const summaryData = props.summaryData;
  const data = [
    {
      ...summaryData,
      total_asset: summaryData.total_asset.toFixed(2),
      total_value: summaryData.total_value.toFixed(2),
      cash: summaryData.cash.toFixed(2),
      total_principle: summaryData.total_principle.toFixed(2),
      total_interest: summaryData.total_interest.toFixed(2),
      key: 1,
    },
  ];

  return (
    <div className="perf-summary">
      <Table columns={columns} dataSource={data} pagination={false} bordered={true}/>
    </div>
  );
}

export default PerformanceSummary;
