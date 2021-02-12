import React, { useState, useEffect } from "react";
import { Table } from "antd";
import ColorMoney from "@/components/colorMoney";
import moment from "moment";
import { getPerfGroupSummaries } from "@/api";
import "./index.less";


function PerformanceYearlysum(props) {
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getPerfGroupSummaries({
        group_id: props.currentGroupId,
      });
      setListData(result.content);
      setLoading(false);
    };
    fetchData();
  }, [props.currentGroupId]);

  const columns = [
    {
      title: "开始日期",
      dataIndex: "start_time",
      key: "start_time",
      sorter: (a, b) => b.start_time - a.start_time,
      render: (time) => <span>{moment(time, "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: "结束日期",
      dataIndex: "end_time",
      key: "end_time",
      sorter: (a, b) => b.end_time - a.end_time,
      render: (time) => <span>{moment(time, "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: "初始金额",
      dataIndex: "start_amount",
      key: "start_amount",
    },
    {
      title: "结束金额",
      dataIndex: "end_amount",
      key: "end_amount",

    },
    {
      title: "净转入",
      dataIndex: "transfer_in",
      key: "transfer_in",
    },
    {
      title: "总收益",
      dataIndex: "profit",
      key: "profit",
      render: (text) => <ColorMoney value={text} type="num" />,
    },
    {
      title: "年化收益率",
      dataIndex: "year_return_rate",
      key: "year_return_rate",
      render: (text) => <ColorMoney value={text} type="percent" />,
    },
  ];

  const data = listData.map((item, index) => {
    return {
      ...item,
      key: index + 1,
      start_amount: item.start_amount.toFixed(2),
      end_amount: item.end_amount.toFixed(2),
      transfer_in: item.transfer_in.toFixed(2),
    };
  });

  return (
    <div className="perf-yearlysum">
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

export default PerformanceYearlysum;
