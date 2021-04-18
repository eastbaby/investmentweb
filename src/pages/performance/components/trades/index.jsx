import React, { useState, useEffect } from "react";
import { Table } from "antd";
import moment from "moment";
import { getPerfGroupTrades } from "@/api";
import "./index.less";


function PerformanceTrades(props) {
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getPerfGroupTrades({
        group_id: props.currentGroupId,
      });
      setListData(result.content);
      setLoading(false);
    };
    fetchData();
  }, [props.currentGroupId]);

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
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "时间",
      dataIndex: "time",
      key: "time",
      sorter: (a, b) => b.time - a.time,
      render: (time) => <span>{moment(time, "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: "成交价",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "数量",
      dataIndex: "num",
      key: "num",
    },
    {
      title: "金额",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "手续费",
      dataIndex: "fee",
      key: "fee",
    },
    {
      title: "利息",
      dataIndex: "interest",
      key: "interest",
    },
    {
      title: "备注",
      dataIndex: "comment",
      key: "comment",
    },
  ];
  const sortedData = listData.sort((a, b) => {
    return b.time - a.time;
  });
  const data = sortedData.map((item, index) => {
    return {
      ...item,
      key: index + 1,
      price: item.price.toFixed(3),
      amount: item.amount.toFixed(2),
      fee: item.fee.toFixed(2),
      interest: item.interest.toFixed(2)
    };
  });

  return (
    <div className="perf-trades">
      <Table
        size="small"
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered={true}
        loading={loading}
      />
    </div>
  );
}

export default PerformanceTrades;
