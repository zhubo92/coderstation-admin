import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, message } from 'antd';
import { useState, useRef } from 'react';
import { formatDate } from '@/utils/tool';
import { useNavigate } from 'react-router-dom';

// 请求方法
import NavController from '@/services/nav';

function NavSubTag() {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const actionRef = useRef();
  const navigate = useNavigate();

  const columns = [
    {
      title: '序号',
      align: 'center',
      search: false,
      render: (text, record, index) => {
        return [(pagination.current - 1) * pagination.pageSize + index + 1];
      },
    },
    {
      title: '名称',
      dataIndex: 'navTitle',
      key: 'navTitle',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center',
      search: false,
      ellipsis: true,
      render: (_, row) => {
        return [formatDate(row.createTime)];
      },
    },
    {
      title: '备注',
      dataIndex: 'navRemark',
      key: 'navRemark',
      align: 'center',
      search: false,
      ellipsis: true,
    },
    {
      title: '操作',
      width: 150,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      align: 'center',
      render: (_, row, index, action) => {
        return [
          <div key={row._id}>
            <Button
              type="link"
              size="small"
              onClick={() => navigate(`/nav/editNav/${row._id}`)}
            >
              编辑
            </Button>
            <Popconfirm
              title="是否要删除该网址导航？"
              onConfirm={() => deleteHandle(row)}
              okText="删除"
              cancelText="取消"
            >
              <Button type="link" size="small">
                删除
              </Button>
            </Popconfirm>
          </div>,
        ];
      },
    },
  ];

  /**
   *
   * @param {*} current 当前页
   * @param {*} pageSize 每页条数
   */
  function handlePageChange(current, pageSize) {
    setPagination({
      current,
      pageSize,
    });
  }

  function deleteHandle(navInfo) {
    NavController.deleteNav(navInfo._id);
    actionRef.current.reload(); // 再次刷新请求
    message.success('删除网址导航成功');
  }

  return (
    <>
      {/* 网址导航二级标签列表 */}
      <PageContainer>
        <ProTable
          headerTitle="网址导航二级标签列表"
          actionRef={actionRef}
          ellipsis={true}
          columns={columns}
          search={{labelWidth: "auto"}}
          rowKey={(row) => row._id}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 50, 100],
            ...pagination,
            onChange: handlePageChange,
          }}
          request={async (params) => {
            const result = await NavController.getNavSubTagByPage(params);
            return {
              data: result.data.data,
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: !result.code,
              // 不传会使用 data 的长度，如果是分页一定要传
              total: result.data.count,
            };
          }}
        />
      </PageContainer>
    </>
  );
}

export default NavSubTag;
