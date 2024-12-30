import { PageContainer } from '@ant-design/pro-components';
import NavForm from './components/navForm';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { message } from 'antd';

// 请求方法
import NavController from '@/services/nav';

function AddNav() {
  const navigate = useNavigate();

  const [newNavInfo, setNewNavInfo] = useState({
    navTitle: "", // 网址导航标题
    navLogo: "", // 网址导航 logo
    navLink: "", // 网址导航链接
    navDesc: "", // 网址导航介绍
    clickNumber: "", // 点击数
    createTime: "", // 创建时间
    navRemark: "", // 备注
    navType: "", // 类型
    lastModified: "", // 最后一次修改时间
    navTag: "", // 标签
  });

  /**
   * 用户点击新增网址导航
   */
  function submitHandle(navDesc) {
    // 因为没有使用状态机，所以直接调用控制器方法，进行新增
    NavController.addNav({
      navTitle: newNavInfo.navTitle,
      navTag: newNavInfo.navTag,
      navType: newNavInfo.navType,
      navDesc,
      navLink: newNavInfo.navLink,
      navLogo: newNavInfo.navLogo,
      navRemark: newNavInfo.navRemark,
    });

    // 跳转回首页
    navigate('/nav/navList');
    message.success('添加网址导航成功');
  }

  return (
    <PageContainer>
      <div className="container" style={{ width: 1000 }}>
        <NavForm
          type="add"
          submitHandle={submitHandle}
          navInfo={newNavInfo}
          setNavInfo={setNewNavInfo}
        />
      </div>
    </PageContainer>
  );
}

export default AddNav;
